import { StyleSheet } from 'react-native';
import { ThemeMode } from '@/src/types';

const commonStyles = {
  light: StyleSheet.create({
    barShadow: {
      shadowColor: '#1C1F30',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 2,
      boxShadow: '0 6px 10px rgba(28,31,48,0.10)',
    },
  }),

  dark: StyleSheet.create({
    barShadow: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.18,
      shadowRadius: 15,
      elevation: 4,
      boxShadow: '0 10px 15px rgba(0,0,0,0.18)',
    },
  }),
};

const getCommonStyles = (theme: ThemeMode) => commonStyles[theme];

export { getCommonStyles };
