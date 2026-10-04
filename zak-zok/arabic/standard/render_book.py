#!/usr/bin/env python3
"""Render book.tex to a PDF with Edge/Chromium, without using the Codex compiler.

This lightweight renderer handles the page macros used by this manuscript and
prints the resulting RTL HTML to a PDF in the same directory as this script.
"""

from __future__ import annotations

import html
import os
import re
import subprocess
import tempfile
from pathlib import Path


HERE = Path(__file__).resolve().parent
SOURCE = HERE / "book.tex"
PDF = HERE / "book-rendered-v2.pdf"
MEDIA = HERE.parent / "shared-media"
PAGE_COMMANDS = {
    "TextOnlyPage": 1,
    "IllustratedTextPage": 2,
    "FullIllustrationPage": 1,
    "InsetIllustrationPage": 1,
    "InsetIllustrationTextPage": 2,
    "BlankPage": 0,
}


def remove_comments(source: str) -> str:
    lines = []
    for line in source.splitlines():
        cut = len(line)
        for i, char in enumerate(line):
            if char == "%":
                backslashes = 0
                j = i - 1
                while j >= 0 and line[j] == "\\":
                    backslashes += 1
                    j -= 1
                if backslashes % 2 == 0:
                    cut = i
                    break
        lines.append(line[:cut])
    return "\n".join(lines)


def read_group(source: str, pos: int) -> tuple[str, int]:
    while pos < len(source) and source[pos].isspace():
        pos += 1
    if pos >= len(source) or source[pos] != "{":
        raise ValueError(f"Expected a braced argument near: {source[pos:pos + 80]!r}")
    start = pos + 1
    depth = 1
    pos += 1
    while pos < len(source):
        if source[pos] == "\\":
            pos += 2
            continue
        if source[pos] == "{":
            depth += 1
        elif source[pos] == "}":
            depth -= 1
            if depth == 0:
                return source[start:pos], pos + 1
        pos += 1
    raise ValueError("Unclosed braced argument in book.tex")


def tex_to_html(text: str) -> str:
    text = re.sub(r"\\vspace\*?\s*\{[^{}]*\}", "", text)
    text = text.replace(r"\begin{center}", "__CENTER_OPEN__")
    text = text.replace(r"\end{center}", "__CENTER_CLOSE__")
    text = text.replace(r"\Large", "__LARGE_OPEN__")
    text = text.replace(r"\bfseries", "__BOLD_OPEN__")

    def footnote(match: re.Match[str]) -> str:
        return f'__FOOTNOTE_OPEN__{tex_to_html(match.group(1))}__FOOTNOTE_CLOSE__'

    # Footnotes in this source do not contain nested braces.
    text = re.sub(r"\\footnote\{([^{}]*)\}", footnote, text)
    text = re.sub(r"\\(?:Large|bfseries)\b", "", text)
    text = re.sub(r"\\([%_&#${}])", r"\1", text)
    text = re.sub(r"\\[A-Za-z]+\*?(?:\[[^]]*\])?", "", text)
    # TeX braces group styling and content; they are not printed glyphs.
    text = text.replace("{", "").replace("}", "")
    text = re.sub(r"\s+", " ", text).strip()
    escaped = html.escape(text, quote=False)
    replacements = {
        "__CENTER_OPEN__": '<div class="center">',
        "__CENTER_CLOSE__": "</strong></span></div>",
        "__LARGE_OPEN__": '<span class="large">',
        "__BOLD_OPEN__": "<strong>",
        "__FOOTNOTE_OPEN__": '<span class="footnote">',
        "__FOOTNOTE_CLOSE__": "</span>",
    }
    for marker, markup in replacements.items():
        escaped = escaped.replace(marker, markup)
    return escaped


def raw_blocks_to_html(raw: str) -> str:
    raw = raw.strip()
    if not raw:
        return ""
    centered = r"\begin{center}" in raw
    rendered = tex_to_html(raw)
    if centered:
        return f"<p>{rendered}</p>"
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", raw) if p.strip()]
    return "".join(f"<p>{tex_to_html(p)}</p>" for p in paragraphs)


def content_to_html(content: str) -> str:
    pieces: list[str] = []
    pos = 0
    command_re = re.compile(r"\\(Narration|DialogueLine)\b")
    while match := command_re.search(content, pos):
        pieces.append(raw_blocks_to_html(content[pos:match.start()]))
        if match.group(1) == "Narration":
            text, pos = read_group(content, match.end())
            pieces.append(f'<div class="narration">{tex_to_html(text)}</div>')
        else:
            speaker, after_speaker = read_group(content, match.end())
            text, pos = read_group(content, after_speaker)
            pieces.append(
                '<div class="dialogue">'
                f'<div class="speaker">{tex_to_html(speaker)}</div>'
                f'<div class="dialogue-text">{tex_to_html(text)}</div>'
                "</div>"
            )
    pieces.append(raw_blocks_to_html(content[pos:]))
    return "\n".join(piece for piece in pieces if piece)


def image_path(image_id: str) -> Path | None:
    for suffix in ("png", "jpg", "jpeg"):
        candidate = MEDIA / f"{image_id}.{suffix}"
        if candidate.exists():
            return candidate
        upper = MEDIA / f"{image_id}.{suffix.upper()}"
        if upper.exists():
            return upper
    return None


def image_uri(image_id: str) -> str:
    path = image_path(image_id)
    if path is None:
        raise FileNotFoundError(f"Missing shared illustration {image_id} in {MEDIA}")
    return path.resolve().as_uri()


def parse_pages(source: str) -> list[str]:
    body = remove_comments(source.split(r"\begin{document}", 1)[1].split(r"\end{document}", 1)[0])
    pages: list[str] = []
    command_re = re.compile(r"\\(" + "|".join(PAGE_COMMANDS) + r")\b")
    pos = 0
    while match := command_re.search(body, pos):
        name = match.group(1)
        pos = match.end()
        args = []
        for _ in range(PAGE_COMMANDS[name]):
            arg, pos = read_group(body, pos)
            args.append(arg.strip())
        if name == "TextOnlyPage":
            pages.append(f'<section class="page text-page"><div class="content">{content_to_html(args[0])}</div></section>')
        elif name == "IllustratedTextPage":
            uri = image_uri(args[0])
            pages.append(
                f'<section class="page illustrated-page"><img class="full-image" src="{uri}">'
                f'<div class="content">{content_to_html(args[1])}</div></section>'
            )
        elif name == "FullIllustrationPage":
            uri = image_uri(args[0])
            pages.append(f'<section class="page"><img class="full-image" src="{uri}"></section>')
        elif name == "InsetIllustrationPage":
            uri = image_uri(args[0])
            pages.append(f'<section class="page inset-page"><img class="inset-image" src="{uri}"></section>')
        elif name == "InsetIllustrationTextPage":
            uri = image_uri(args[0])
            pages.append(
                f'<section class="page text-page"><div class="content inset-text">{content_to_html(args[1])}'
                f'<img class="inset-image" src="{uri}"></div></section>'
            )
        elif name == "BlankPage":
            pages.append('<section class="page"></section>')
    return pages


CSS = r"""
@page { size: 170mm 232mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: Arial, "Segoe UI", sans-serif; color: #111; }
.page {
  position: relative; width: 170mm; height: 232mm; margin: 0;
  overflow: hidden; page-break-after: always; break-after: page;
  background: #fff;
}
.page:last-child { page-break-after: auto; break-after: auto; }
.content {
  position: relative; direction: rtl; text-align: right; unicode-bidi: plaintext;
  padding: 14mm; padding-bottom: 12mm; width: 100%; height: 100%;
  font-size: 14pt; line-height: 1.35; overflow: hidden;
}
.illustrated-page .content { padding-top: 22mm; }
.content p { margin: 0 0 0.4em; }
.content .center { text-align: center; }
.content .large { font-size: 1.35em; }
.content strong { font-weight: 700; }
.content .footnote { font-size: 0.72em; }
.narration { width: calc(100% - 33mm); margin: 0 0 0.4em auto; }
.dialogue {
  width: 100%; display: flex; flex-direction: row; direction: rtl;
  align-items: flex-start; gap: 5mm; margin: 0.38em 0;
}
.dialogue-text { flex: 1 1 auto; width: calc(100% - 33mm); text-align: right; }
.speaker { flex: 0 0 28mm; font-weight: 700; text-align: right; }
.full-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.inset-page { display: flex; align-items: center; justify-content: center; }
.inset-image { display: block; width: 90%; max-height: 58%; object-fit: contain; margin: 0 auto; }
.inset-text .inset-image { margin-top: 4mm; }
"""


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)
    pages = parse_pages(SOURCE.read_text(encoding="utf-8"))
    if not pages:
        raise RuntimeError("No page macros found in book.tex")
    document = (
        "<!doctype html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\">"
        f"<style>{CSS}</style></head><body>{''.join(pages)}</body></html>"
    )
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".html", delete=False) as tmp:
        tmp.write(document)
        html_path = Path(tmp.name)

    node_script = r"""
const { chromium } = require('playwright');
(async () => {
  const htmlPath = process.argv[1];
  const pdfPath = process.argv[2];
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage();
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/').replace(/^\//, ''), { waitUntil: 'load' });
    await page.emulateMedia({ media: 'print' });
    const remaining = await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, img => img.decode().catch(() => {})));
      for (const section of document.querySelectorAll('.page')) {
        const content = section.querySelector('.content');
        if (!content) continue;
        let leading = 1.35;
        while (content.scrollHeight > content.clientHeight && leading > 1.10) {
          leading -= 0.05;
          content.style.lineHeight = leading.toFixed(2);
        }
        let size = 18.67;
        while (content.scrollHeight > content.clientHeight && size > 15) {
          size -= 0.5;
          content.style.fontSize = size + 'px';
        }
      }
      const overflow = Array.from(document.querySelectorAll('.page .content'))
        .map((content, index) => ({ page: index + 1, overflow: content.scrollHeight - content.clientHeight,
          fontSize: getComputedStyle(content).fontSize, lineHeight: getComputedStyle(content).lineHeight }))
        .filter(item => item.overflow > 2);
      return overflow;
    });
    if (remaining.length) console.log('Pages still overfull after fitting:', JSON.stringify(remaining));
    await page.pdf({ path: pdfPath, printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
  } finally {
    await browser.close();
  }
})().catch(err => { console.error(err); process.exit(1); });
"""
    node = r"C:\Users\Ordinateur de Kiro\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
    node_modules = r"C:\Users\Ordinateur de Kiro\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules"
    env = os.environ.copy()
    env["NODE_PATH"] = node_modules
    try:
        subprocess.run([node, "-e", node_script, str(html_path), str(PDF)], check=True, env=env)
    finally:
        html_path.unlink(missing_ok=True)
    print(f"Rendered {len(pages)} pages to {PDF}")


if __name__ == "__main__":
    main()
