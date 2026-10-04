# Standard Arabic LaTeX Backbone

## Table of Contents

- [Purpose](#purpose)
- [Current Status](#current-status)
- [Page Types](#page-types)
- [Dialogue Layout](#dialogue-layout)
- [Media](#media)
- [Build](#build)
- [Files](#files)

## Purpose

This directory is the Standard Arabic publishing layer for the Zak-Zok story.

The LaTeX file is intentionally a **backbone only**. It models the reusable page structures agreed for the rebuilt edition, but it does not yet contain the story text or final page-by-page image assignments.

## Current Status

- Structure only; story content is not populated.
- Arabic is intended to be typeset as real vector text with XeLaTeX.
- Restored/upscaled illustrations remain image assets and are placed by LaTeX.
- Final trim size, bleed, typography tuning, and page-specific positioning remain configurable.

## Page Types

The book uses four explicit page types:

1. **Type 1 — White page + text only**
   - White background.
   - Native Arabic LaTeX text.
   - No required illustration.

2. **Type 2 — Full illustration + text**
   - A restored/upscaled illustration fills the page.
   - Arabic remains native LaTeX text layered over the artwork.
   - Text is never baked into the illustration.

3. **Type 3 — Full illustration, no text**
   - A restored/upscaled illustration fills the page.
   - No story text is placed on the page.

4. **Type 4 — White page + inset illustration**
   - White page.
   - One positioned illustration or vignette.
   - Useful for compositions such as the circular closing illustration.

The comments in `book.tex` label each template and each skeleton call with its page type so page classification stays explicit during population.

## Dialogue Layout

Dialogue follows a drama-style layout:

- the **speaker name** occupies a dedicated right-hand gutter;
- the **dialogue content** starts at a separate shifted level to its left;
- wrapped dialogue cannot enter the speaker-name gutter;
- narration on dialogue-capable pages uses the same constrained body width, so prose cannot spill into the speaker-name area;
- additional vertical spacing separates dialogue turns instead of treating every line as equally spaced prose.

This geometry is encoded once in the backbone and reused across pages.

## Media

Shared Arabic media belongs in:

`../shared-media/`

Every shared asset must also be documented in `../shared-media/schema.md`.

The LaTeX layer should reference only approved/restored artwork. Image restoration or AI-assisted cleanup happens outside LaTeX; LaTeX controls placement, typography, layering, and final PDF composition.

## Build

Use XeLaTeX:

```bash
xelatex book.tex
```

The current dimensions in `book.tex` are provisional and should be updated when the final print trim and bleed specification is locked.

## Files

- `README.md` — publishing/layout contract for the Standard Arabic edition.
- `book.tex` — unpopulated reusable LaTeX page backbone.
