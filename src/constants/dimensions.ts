import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const W = (size: number) => (width * size) / 393;
export const H = (size: number) => (height * size) / 852;

export const inputHeight = 48;
export const appBarHeight = 50;

export { width, height };
