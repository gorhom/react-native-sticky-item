import React from 'react';
import { View } from 'react-native';

interface DummyItemProps {
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
}

const DummyItem = ({
  width,
  height,
  borderRadius,
  backgroundColor,
}: DummyItemProps) => {
  return <View style={{ width, height, borderRadius, backgroundColor }} />;
};

export default DummyItem;
