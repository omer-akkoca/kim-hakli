import { width } from '@/src/constants';
import { SliderFive, SliderFour, SliderOne, SliderThree, SliderTwo } from './Sliders';

export const SLIDES = [
  { id: 'vote', component: SliderOne },
  { id: 'find-right-side', component: SliderTwo },
  { id: 'invite-friend', component: SliderThree },
  { id: 'win-with-friend', component: SliderFour },
  { id: 'ad', component: SliderFive },
];

export const HORIZONTAL_PADDING = 24;
export const VISIBLE_SIDE_WIDTH = 12;
export const MIN_SCALE = 0.86;

export const cardWidth = width - HORIZONTAL_PADDING * 2;
export const cardHeight = cardWidth * (9 / 16);

export const cardOverlap = ((1 - MIN_SCALE) * cardWidth) / 2 - VISIBLE_SIDE_WIDTH;

export const snapInterval = cardWidth - cardOverlap;
