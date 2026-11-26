import type { MediaLibrary } from '../media/types';

/*
 * Default image for every image slot on the website.
 *
 * Several source files are screen captures that include map or Street View
 * interface controls. The crop rectangles below remove those controls without
 * editing the original files, and the credit lines keep the required source
 * attribution visible. Replace these entries (or override them through
 * MediaProvider) when original photography is available.
 */
export const mediaLibrary: MediaLibrary = {
  'home.hero': {
    src: '/assets/project-site.jpg',
    alt: 'Mixed-use commercial buildings and streetscape on a city main street',
    width: 1432,
    height: 931,
    crop: { x: 240, y: 128, width: 1192, height: 560 },
    mobileCrop: { x: 420, y: 128, width: 760, height: 560 },
    caption: 'Existing site and streetscape',
    credit: 'Street View imagery © 2025 Google',
  },
  'home.drawing': {
    src: '/assets/engineering-plan.jpg',
    alt: 'Site plan drawing with dimensions, parking layout and a revision cloud around the proposed work',
    width: 805,
    height: 461,
    caption: 'Site plan extract with revision markup',
  },
  'engineering.drawing': {
    src: '/assets/engineering-plan.jpg',
    alt: 'Detail of a site plan showing the proposed addition outlined by a red revision cloud',
    width: 805,
    height: 461,
    crop: { x: 150, y: 30, width: 600, height: 400 },
    caption: 'Drawing package detail',
  },
  'environmental.siteLocation': {
    src: '/assets/site-map-east.jpg',
    alt: 'Street map marking a site location near King Street East and Eby Street South',
    width: 905,
    height: 795,
    crop: { x: 24, y: 0, width: 848, height: 590 },
    caption: 'Site location and surrounding uses',
    credit: 'Map data © 2025 Google',
  },
  'realEstate.property': {
    src: '/assets/project-site.jpg',
    alt: 'Three-storey brick and glass commercial building with street-level shops',
    width: 1432,
    height: 931,
    crop: { x: 420, y: 150, width: 640, height: 540 },
    caption: 'Commercial property streetscape',
    credit: 'Street View imagery © 2025 Google',
  },
  'realEstate.context': {
    src: '/assets/site-map-west.jpg',
    alt: 'Street map showing a property parcel and the surrounding street network',
    width: 771,
    height: 765,
    crop: { x: 34, y: 100, width: 700, height: 590 },
    caption: 'Property location context',
    credit: 'Map data © 2025 Google',
  },
  'about.portrait': {
    src: '/assets/george-sedra.jpg',
    alt: 'Portrait of George Sedra',
    width: 1000,
    height: 1500,
    crop: { x: 0, y: 60, width: 1000, height: 1250 },
  },
};
