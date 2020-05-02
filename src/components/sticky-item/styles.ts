import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  thumbnail: {
    backgroundColor: 'black',
  },
  button: {
    ...StyleSheet.absoluteFillObject,
  },
});
