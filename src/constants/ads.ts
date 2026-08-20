import { Platform } from 'react-native';

export const ADS = {
  banner: {
    home: Platform.select({
      android: 'ca-app-pub-7102780910526722/2449801415',
      ios: 'ca-app-pub-7102780910526722/1910865506',
    })!,
    vote_result: Platform.select({
      android: 'ca-app-pub-7102780910526722/9897166736',
      ios: 'ca-app-pub-7102780910526722/1575703445',
    })!,
    bookmark: Platform.select({
      android: 'ca-app-pub-7102780910526722/8938655312',
      ios: 'ca-app-pub-7102780910526722/2041506259',
    })!,
    vote_history: Platform.select({
      android: 'ca-app-pub-7102780910526722/5019023387',
      ios: 'ca-app-pub-7102780910526722/6559903984',
    })!,
    unlock_stories: Platform.select({
      android: 'ca-app-pub-7102780910526722/3705941713',
      ios: 'ca-app-pub-7102780910526722/3933740647',
    })!,
  },
  native: {
    discover: Platform.select({
      android: 'ca-app-pub-7102780910526722/9972499991',
      ios: 'ca-app-pub-7102780910526722/3407091648',
    })!,
  },
  rewarded: Platform.select({
    android: 'ca-app-pub-7102780910526722/5613276521',
    ios: 'ca-app-pub-7102780910526722/3913182047',
  })!,
};
