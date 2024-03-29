import React, { useMemo } from 'react';
import { Platform, ViewStyle } from 'react-native';
import { Svg, Path, SvgProps, PathProps } from 'react-native-svg';
import Animated, { Extrapolate } from 'react-native-reanimated';
import {
  interpolatePath,
  interpolateColor,
  transformOrigin,
} from '../../utilities/redash';
import { interpolate } from '../../utilities/reanimated';
import { generatePathData } from './utils';
import type { StickyItemBackgroundProps } from '../../types';
import { styles } from './styles';

Animated.addWhitelistedUIProps({
  d: true,
  translateX: true,
});

const AnimatedPath = Animated.createAnimatedComponent(
  Path
) as any as React.ComponentClass<
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
  stickyItemHeight,
  stickyItemBackgroundColors,
  isRTL,
}: StickyItemBackgroundProps) => {
  const adjustedBorderRadius = borderRadius === 0 ? 0.0001 : borderRadius;
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
        x: isRTL ? 0 : itemWidth - stickyItemWidth,
        y: itemHeight / 2 - stickyItemHeight / 2,
        width: stickyItemWidth,
        height: stickyItemHeight,
        tl: isRTL ? stickyItemHeight / 2 : 0.0001,
        bl: isRTL ? stickyItemHeight / 2 : 0.0001,
        tr: isRTL ? 0.0001 : stickyItemHeight / 2,
        br: isRTL ? 0.0001 : stickyItemHeight / 2,
      }),
    ],
    [
      adjustedBorderRadius,
      itemWidth,
      itemHeight,
      stickyItemWidth,
      stickyItemHeight,
      isRTL,
    ]
  );

  //#region animations
  const animatedTransform = transformOrigin(
    {
      x: 0,
      y: 0,
    },
    {
      translateX: 0,
    }
  );

  const animatedPathData = interpolatePath(x, {
    inputRange: [separatorSize, threshold],
    outputRange: paths,
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBackgroundColor = interpolateColor(x, {
    inputRange: [separatorSize, threshold],
    outputRange: stickyItemBackgroundColors,
  });

  const animatedShadowRadius = interpolate(x, {
    inputRange: [separatorSize, threshold],
    outputRange: [1, 16],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  //#region styles
  const containerStyle = [
    styles.container,
    {
      transform: animatedTransform,
    },
    Platform.OS === 'ios'
      ? {
          shadowRadius: animatedShadowRadius,
        }
      : {},
  ];
  //#endregion

  // render
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
