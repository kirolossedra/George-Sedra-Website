import { useMemo, type ReactNode } from 'react';
import { mediaLibrary } from '../data/media';
import { MediaContext } from './context';
import type { MediaAsset, MediaSlotId } from './types';

type MediaProviderProps = {
  /**
   * Slot overrides, typically loaded from a future content API. Any slot not
   * supplied falls back to the default library in src/data/media.ts.
   */
  overrides?: Partial<Record<MediaSlotId, MediaAsset>>;
  children: ReactNode;
};

export default function MediaProvider({ overrides, children }: MediaProviderProps) {
  const library = useMemo(() => ({ ...mediaLibrary, ...overrides }), [overrides]);
  return <MediaContext.Provider value={library}>{children}</MediaContext.Provider>;
}
