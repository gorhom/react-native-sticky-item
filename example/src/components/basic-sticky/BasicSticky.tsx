/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { transformOrigin } from 'react-native-redash';
import type { StickyItemContentProps } from '@gorhom/sticky-item';
import { styles } from './styles';

const BasicSticky = ({
  x,
  threshold,
  itemWidth,
  itemHeight,
  stickyItemWidth,
  stickyItemHeight,
  separatorSize,
  isRTL,
}: StickyItemContentProps) => {
  const stickyScaleX = stickyItemWidth / itemWidth;
  const stickyScaleY = stickyItemHeight / itemHeight;
  const scaledSpaceX = (separatorSize * 2) / itemWidth;
  const scaledSpaceY = (separatorSize * 2) / itemHeight;
  const containerScaleX = stickyScaleX + scaledSpaceX;

  //#region plus
  const animatedPlusScale = interpolate(x, {
    inputRange: [0, threshold * 0.6],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const plusStyle = [
    styles.plus,
    {
      width: stickyItemWidth,
      lineHeight: stickyItemHeight,
      [isRTL ? 'left' : 'right']: 0,
      paddingHorizontal: separatorSize,
      transform: transformOrigin(
        { x: 0, y: 0 },
        {
          translateX: isRTL ? separatorSize : -separatorSize,
          translateY: itemHeight / 2 - stickyItemHeight / 2,
          scale: animatedPlusScale,
        }
      ) as Animated.AnimatedTransform,
    },
  ];
  //#endregion

  //#region text
  const animatedTextOpacity = interpolate(x, {
    inputRange: [0, threshold * 0.6],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const textStyle = [
    styles.text,
    {
      opacity: animatedTextOpacity,
      paddingHorizontal: separatorSize,
      lineHeight: itemHeight,
      transform: [
        {
          translateY: 0,
        },
      ] as Animated.AnimatedTransform,
    },
  ];
  //#endregion

  return (
    <>
      <Animated.Text style={plusStyle}>+</Animated.Text>
      <Animated.Text style={textStyle}>Add</Animated.Text>
    </>
  );
};

export default BasicSticky;
