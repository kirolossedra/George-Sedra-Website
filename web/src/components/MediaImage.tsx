import type { CSSProperties } from 'react';
import { useMedia } from '../media/useMedia';
import type { MediaAsset, MediaCrop, MediaSlotId } from '../media/types';

type FrameVariables = Record<`--${string}`, string>;

function cropVariables(asset: MediaAsset, crop: MediaCrop | undefined, suffix = ''): FrameVariables {
  const area = crop ?? { x: 0, y: 0, width: asset.width, height: asset.height };
  const percent = (value: number) => `${+(value * 100).toFixed(4)}%`;
  return {
    [`--media-ratio${suffix}`]: `${area.width} / ${area.height}`,
    [`--media-width${suffix}`]: percent(asset.width / area.width),
    [`--media-left${suffix}`]: percent(-area.x / area.width),
    [`--media-top${suffix}`]: percent(-area.y / area.height),
  };
}

type MediaImageProps = {
  slot: MediaSlotId;
  /** Show the caption and credit stored with the asset. */
  showCaption?: boolean;
  /** Load immediately; use for the first image in the viewport. */
  priority?: boolean;
  className?: string;
};

/**
 * Renders the image assigned to a media slot inside a frame that applies the
 * slot's crop. Pages never reference image files directly, so any image can be
 * replaced by changing the slot data alone.
 */
export default function MediaImage({ slot, showCaption = true, priority = false, className }: MediaImageProps) {
  const asset = useMedia(slot);
  const style = {
    ...cropVariables(asset, asset.crop),
    ...(asset.mobileCrop ? cropVariables(asset, asset.mobileCrop, '-sm') : {}),
  } as CSSProperties;
  const hasCaption = showCaption && Boolean(asset.caption || asset.credit);

  return (
    <figure className={className ? `figure ${className}` : 'figure'}>
      <div className="media-frame" style={style} data-mobile-crop={asset.mobileCrop ? '' : undefined}>
        <img
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
      </div>
      {hasCaption && (
        <figcaption className="figure__caption">
          {asset.caption && <span className="figure__caption-text">{asset.caption}</span>}
          {asset.credit && <span>{asset.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
