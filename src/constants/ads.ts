import { Platform } from 'react-native';

export const ADS = {
  banner: {
    home:
      Platform.OS === 'android'
        ? 'ca-app-pub-7102780910526722/2449801415'
        : 'ca-app-pub-7102780910526722/1910865506',
    vote_result:
      Platform.OS === 'android'
        ? 'ca-app-pub-7102780910526722/9897166736'
        : 'ca-app-pub-7102780910526722/1575703445',
  },
};
