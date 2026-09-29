import { NetInfoState } from '@react-native-community/netinfo';

export const getIsOnline = (state: NetInfoState) =>
  state.isConnected === true && state.isInternetReachable !== false;
