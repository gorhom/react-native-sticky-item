import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'flex-end',
  },
  thumbnail: {
    backgroundColor: 'black',
  },
  button: {
    ...StyleSheet.absoluteFillObject,
  },
});
