import React from 'react';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { transformOrigin } from 'react-native-redash';
import type { StickyItemContentProps } from '@gorhom/sticky-item';
import PlusSVG from '../../icons/PlusSVG';
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
  //#region plus
  const animatedPlusScale = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const plusStyle = [
    styles.plus,
    {
      width: stickyItemWidth,
      height: stickyItemHeight,
      [isRTL ? 'right' : 'left']: '50%',
      transform: transformOrigin(
        { x: 0, y: 0 },
        {
          translateX: interpolate(x, {
            inputRange: [separatorSize, threshold],
            outputRange: [
              (stickyItemWidth / 2) * (isRTL ? 1 : -1),
              (itemWidth / 2 - stickyItemWidth) * (isRTL ? -1 : 1),
            ],
            extrapolate: Extrapolate.CLAMP,
          }),
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
      <Animated.View style={plusStyle}>
        <PlusSVG />
      </Animated.View>
      <Animated.Text style={textStyle}>
        {isRTL ? 'להוסיף' : 'Add'}
      </Animated.Text>
    </>
  );
};

export default BasicSticky;
