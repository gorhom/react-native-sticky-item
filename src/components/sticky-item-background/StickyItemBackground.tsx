import React, { useMemo } from 'react';
import { Platform, ViewStyle } from 'react-native';
import { Svg, Path, SvgProps, PathProps } from 'react-native-svg';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { interpolatePath, interpolateColor } from 'react-native-redash';
import { generatePathData } from './utils';
import { StickyItemBackgroundProps } from '../../types';
import { styles } from './styles';

Animated.addWhitelistedNativeProps({
  d: true,
  translateX: true,
});

const AnimatedPath = (Animated.createAnimatedComponent(
  Path
) as any) as React.ComponentClass<
  Animated.AnimateProps<ViewStyle, PathProps & { style?: ViewStyle }>,
  any
>;
const AnimatedSvg = Animated.createAnimatedComponent(
  Svg
) as React.ComponentClass<
  Animated.AnimateProps<ViewStyle, SvgProps & { style: ViewStyle }>,
  any
>;

const StickyItemBackground = ({
  x,
  threshold,
  itemWidth,
  itemHeight,
  separatorSize,
  borderRadius,
  stickyItemWidth,
  stickyItemBackgroundColors,
  isRTL,
}: StickyItemBackgroundProps) => {
  const adjustedBorderRadius = borderRadius === 0 ? 0.0001 : borderRadius;
  const stickySize = stickyItemWidth + separatorSize * 2;

  const paths = useMemo(
    () => [
      generatePathData({
        x: 0,
        y: 0,
        width: itemWidth,
        height: itemHeight,
        tl: adjustedBorderRadius,
        bl: adjustedBorderRadius,
        tr: adjustedBorderRadius,
        br: adjustedBorderRadius,
      }),
      generatePathData({
        x: isRTL ? 0 : itemWidth - stickyItemWidth - separatorSize * 2,
        y: itemHeight / 2 - stickySize / 2,
        width: stickySize,
        height: stickySize,
        tl: isRTL ? stickySize / 2 : 0.0001,
        bl: isRTL ? stickySize / 2 : 0.0001,
        tr: isRTL ? 0.0001 : stickySize / 2,
        br: isRTL ? 0.0001 : stickySize / 2,
      }),
    ],
    [
      adjustedBorderRadius,
      itemWidth,
      itemHeight,
      separatorSize,
      stickyItemWidth,
      stickySize,
      isRTL,
    ]
  );

  const animatedPathData = interpolatePath(x, {
    inputRange: [0, threshold],
    outputRange: paths,
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBackgroundColor = interpolateColor(x, {
    inputRange: [0, threshold],
    outputRange: stickyItemBackgroundColors,
  });

  const animatedShadowRadius = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [1, 16],
    extrapolate: Extrapolate.CLAMP,
  });

  const containerStyle = [
    styles.container,
    Platform.OS === 'ios'
      ? {
          shadowRadius: animatedShadowRadius,
        }
      : {},
  ];

  return (
    <AnimatedSvg
      pointerEvents="none"
      style={containerStyle}
      width={itemWidth}
      height={itemHeight}
      viewBox={`0 0 ${itemWidth} ${itemHeight}`}
    >
      <AnimatedPath
        d={animatedPathData}
        fill={animatedBackgroundColor}
        fillRule="evenodd"
      />
    </AnimatedSvg>
  );
};

export default StickyItemBackground;
