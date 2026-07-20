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
    bookmark:
      Platform.OS === 'android'
        ? 'ca-app-pub-7102780910526722/8938655312'
        : 'ca-app-pub-7102780910526722/2041506259',
    vote_history:
      Platform.OS === 'android'
        ? 'ca-app-pub-7102780910526722/5019023387'
        : 'ca-app-pub-7102780910526722/6559903984',
    unlock_stories:
      Platform.OS === 'android'
        ? 'ca-app-pub-7102780910526722/3705941713'
        : 'ca-app-pub-7102780910526722/3933740647',
  },
  native: {
    discover:
      Platform.OS === 'android'
        ? 'ca-app-pub-7102780910526722/9972499991'
        : 'ca-app-pub-7102780910526722/3407091648',
  },
};
