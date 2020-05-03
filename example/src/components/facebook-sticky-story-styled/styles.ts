import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  thumbnail: {
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    backgroundColor: '#2d88ff',
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 14,
    fontSize: Platform.OS === 'ios' ? 12 : 14,
    fontWeight: '500',
    color: 'white',
  },
});
