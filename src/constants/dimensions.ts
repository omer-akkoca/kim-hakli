import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const W = (size: number) => (width * size) / 393;
export const H = (size: number) => (height * size) / 852;

export const appBarHeight = 56;
export const bottomBarHeight = 48;
export const storyReadActionBarHeight = 56;
export const storyReadProgressBarHeight = 2;

export { width, height };
