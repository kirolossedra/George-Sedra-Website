import { useContext } from 'react';
import { MediaContext } from './context';
import type { MediaAsset, MediaSlotId } from './types';

export function useMedia(slot: MediaSlotId): MediaAsset {
  return useContext(MediaContext)[slot];
}
