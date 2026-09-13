import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  barShadow: {
    // iOS
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 15,

    // Android
    elevation: 6,
    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
  },
});

export { commonStyles };
