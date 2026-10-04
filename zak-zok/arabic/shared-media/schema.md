# Shared Arabic Media Schema

## Table of Contents

- [Purpose](#purpose)
- [Story Image Mapping](#story-image-mapping)
- [Media Catalog](#media-catalog)
- [Catalog Rules](#catalog-rules)

## Purpose

This directory contains media shared by both Arabic variants:

- `egyptian/`
- `standard/`

Every media asset stored in this directory must be documented in the catalog below.

The image IDs below define the canonical sequential mapping for the illustrated story pages. The mapping exists before the image files themselves are uploaded so the Standard Arabic and Egyptian Arabic editions can reference the same media consistently.

## Story Image Mapping

| Photo ID | Page | Type | Brief description |
| --- | ---: | --- | --- |
| Photo 01 | 13 | Type 2 — Full illustration + text | Blue-and-pink illustrated backdrop with clouds and Egyptian decorative motifs; Arabic text is overlaid on the colored page. |
| Photo 02 | 14 | Type 3 — Full illustration, no text | Stylized pharaonic/Sphinx figure with the magenta and orange birds against a blue background. |
| Photo 03 | 17 | Type 2 — Full illustration + text | Egyptian landscape scene with a man in striped head covering, green field, and stylized ancient architecture; text is integrated into the page. |
| Photo 04 | 18 | Type 3 — Full illustration, no text | Gray donkey carrying an orange bundle with the magenta bird perched on it in a rural landscape. |
| Photo 05 | 21 | Type 2 — Full illustration + text | Light-blue page with a large red floral sun motif above and flowers along green ground below; Arabic text occupies the center. |
| Photo 06 | 22 | Type 3 — Full illustration, no text | Man in a blue striped robe and pink-striped head wrap interacting closely with the magenta bird among branches and flowers. |
| Photo 07 | 27 | Type 4 — White page + inset illustration | White text page with a lower illustration showing the child and adult beside the crocodile/water scene. |
| Photo 08 | 28 | Type 3 — Full illustration, no text | Large green crocodile with open jaws and the magenta bird, with blue water and simple flowers around the scene. |
| Photo 09 | 29 | Type 4 — White page + inset illustration | White text page with a lower rectangular vignette of the orange and magenta birds facing one another before layered blue mountains and flowers. |
| Photo 10 | 33 | Type 2 — Full illustration + text | Egyptian-themed blue, yellow, and pink page with cattle along the top and hieroglyphic decoration below the Arabic text. |
| Photo 11 | 34 | Type 3 — Full illustration, no text | Magenta bird perched on a decorated Egyptian column with monumental stone forms and a hieroglyphic wall. |
| Photo 12 | 35 | Type 3 — Full illustration, no text | Whimsical white airplane character flying over a green hill, flowers, and a pale pink city/ruin skyline. |
| Photo 13 | 36 | Type 2 — Full illustration + text | Cyan-and-blue illustrated page with Arabic dialogue at the top and large magenta and orange birds below. |
| Photo 14 | 40 | Type 4 — White page + inset illustration | White page with a circular vignette of the orange and magenta birds facing each other, with layered blue mountains and two flowers. |

### Type Key

- **Type 1 — White page + text only:** no mapped illustration.
- **Type 2 — Full illustration + text:** restored/upscaled artwork forms the colored page; Arabic remains native LaTeX text.
- **Type 3 — Full illustration, no text:** restored/upscaled artwork fills the page without story text.
- **Type 4 — White page + inset illustration:** white page containing a positioned illustration/vignette, with or without surrounding text.

## Media Catalog

| Media | Type | Description |
| --- | --- | --- |
| _No media files uploaded yet._ | — | The photo IDs above are mappings only; image files will be added later. |

## Catalog Rules

For each new media file added to `shared-media/`, add one row to the catalog with:

- the exact file name;
- its corresponding sequential Photo ID when applicable;
- the media type, such as image, audio, video, or animation;
- a concise description of what the media contains and its intended meaning or use;
- the story page number it maps to.

The Photo ID sequence is stable. Do not renumber existing IDs when media files are later added.
