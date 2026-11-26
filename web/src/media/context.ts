import { createContext } from 'react';
import { mediaLibrary } from '../data/media';
import type { MediaLibrary } from './types';

export const MediaContext = createContext<MediaLibrary>(mediaLibrary);
