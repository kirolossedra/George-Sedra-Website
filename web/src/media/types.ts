/** A rectangle in the source image's own pixel coordinates. */
export type MediaCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Everything needed to render one website image. The shape is deliberately
 * plain data so a future administrative interface can store and return it
 * (for example from D1) without any change to the components that render it.
 */
export type MediaAsset = {
  /** Public URL of the image file. */
  src: string;
  /** Text alternative. Use an empty string only for purely decorative images. */
  alt: string;
  /** Intrinsic pixel dimensions of the file at `src`. */
  width: number;
  height: number;
  /** Region of the file to display. Omit to show the whole image. */
  crop?: MediaCrop;
  /** Optional alternative region for viewports narrower than 40rem. */
  mobileCrop?: MediaCrop;
  /** Short descriptive caption shown beneath the image. */
  caption?: string;
  /** Source or copyright credit shown beneath the image. */
  credit?: string;
};

/** Named image positions on the website. Pages request images by slot, never by file path. */
export type MediaSlotId =
  | 'home.hero'
  | 'home.drawing'
  | 'engineering.drawing'
  | 'environmental.siteLocation'
  | 'realEstate.property'
  | 'realEstate.context'
  | 'about.portrait';

export type MediaLibrary = Record<MediaSlotId, MediaAsset>;
