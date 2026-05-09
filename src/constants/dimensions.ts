import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const W = (size: number) => (width * size) / 393;
export const H = (size: number) => (height * size) / 852;

export const appBarHeight = 56;
export const bottomBarHeight = 72;

export { width, height };
