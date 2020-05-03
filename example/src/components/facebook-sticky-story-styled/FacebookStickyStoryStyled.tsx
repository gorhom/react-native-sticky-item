/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { transformOrigin } from 'react-native-redash';
import type { StickyItemContentProps } from '@gorhom/sticky-item';
import { styles } from './styles';

const FacebookStickyStory = ({
  x,
  threshold,
  itemWidth,
  itemHeight,
  stickyItemWidth,
  stickyItemHeight,
  separatorSize,
  borderRadius,
  isRTL,
}: StickyItemContentProps) => {
  const stickyScaleX = stickyItemWidth / itemWidth;

  //#region thumbnail
  const animatedThumbnailScale = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [1, stickyScaleX],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedThumbnailTranslateX = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [0, isRTL ? separatorSize : -separatorSize],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedThumbnailBorderRadius = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [borderRadius, itemWidth],
    extrapolate: Extrapolate.CLAMP,
  });
  const thumbnailStyle = [
    styles.thumbnail,
    {
      top: -1,
      width: itemWidth,
      height: itemWidth,
      borderRadius: animatedThumbnailBorderRadius,
      transform: transformOrigin(
        {
          x: (itemWidth / 2) * (isRTL ? -1 : 1),
          y: itemHeight / 2 + stickyItemHeight / 2 - itemWidth / 2,
        },
        {
          translateX: animatedThumbnailTranslateX,
          scale: animatedThumbnailScale,
        }
      ) as Animated.AnimatedTransform,
    },
  ];
  //#endregion

  //#region icon
  const animatedIconTranslateX = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [
      itemWidth / 2 - stickyItemWidth / 2,
      isRTL ? 0 : itemWidth - stickyItemWidth / 2 - separatorSize,
    ],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedIconTranslateY = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [itemHeight / 2, itemHeight / 2 - separatorSize / 2],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedIconScale = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [1, 0.4],
    extrapolate: Extrapolate.CLAMP,
  });
  const iconStyle = [
    styles.icon,
    {
      borderRadius: stickyItemWidth,
      width: stickyItemWidth,
      height: stickyItemWidth,
      transform: transformOrigin(
        {
          x: 0,
          y: 0,
        },
        {
          translateX: animatedIconTranslateX,
          translateY: animatedIconTranslateY,
          scale: animatedIconScale,
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
  const animatedTextTranslateY = interpolate(x, {
    inputRange: [0, threshold * 0.6],
    outputRange: [itemHeight / 2 + itemHeight / 4, itemHeight / 2],
    extrapolate: Extrapolate.CLAMP,
  });
  const textStyle = [
    styles.text,
    {
      opacity: animatedTextOpacity,
      paddingHorizontal: separatorSize * 2,
      transform: [
        {
          translateY: animatedTextTranslateY,
        },
      ] as Animated.AnimatedTransform,
    },
  ];
  //#endregion

  return (
    <>
      <Animated.View style={thumbnailStyle} />
      <Animated.Text style={textStyle}>
        {isRTL ? `إضافة إلى قصتك` : `Create a story`}
      </Animated.Text>
      <Animated.View style={iconStyle} />
    </>
  );
};

export default FacebookStickyStory;
