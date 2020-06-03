import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  addIcon: {
    position: 'absolute',
    borderColor: 'white',
    backgroundColor: '#2d88ff',
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 14,
    fontSize: Platform.OS === 'ios' ? 12 : 14,
    fontWeight: '500',
  },
});
