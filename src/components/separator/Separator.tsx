import React, { memo } from 'react';
import { View } from 'react-native';
import type { SeparatorConfig } from '../../types';

interface SeparatorProps extends SeparatorConfig {}

const SeparatorComponent = ({ size }: SeparatorProps) => {
  return <View style={{ width: size }} />;
};

const Separator = memo(SeparatorComponent);

export default Separator;
