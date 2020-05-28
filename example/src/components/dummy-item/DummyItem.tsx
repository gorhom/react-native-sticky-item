import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

interface DummyItemProps {
  index: number;
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
}

const DummyItem = ({
  index,
  width,
  height,
  borderRadius,
  backgroundColor,
}: DummyItemProps) => {
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        width,
        height,
        borderRadius,
        backgroundColor,
      },
    ],
    [width, height, borderRadius, backgroundColor]
  );
  return (
    <View style={containerStyle}>
      <Text style={styles.text}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DummyItem;
