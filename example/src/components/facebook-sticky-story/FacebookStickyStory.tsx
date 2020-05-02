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
}: StickyItemContentProps) => {
  const stickyScaleX = stickyItemWidth / itemWidth;
  const stickyScaleY = stickyItemHeight / itemHeight;
  const scaledSpaceX = (separatorSize * 2) / itemWidth;
  const scaledSpaceY = (separatorSize * 2) / itemHeight;
  const containerScaleX = stickyScaleX + scaledSpaceX;

  //#region thumbnail
  const animatedThumbnailScale = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [1, stickyScaleX],
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
      width: itemWidth,
      height: itemWidth,
      borderRadius: animatedThumbnailBorderRadius,
      transform: transformOrigin(
        {
          x: itemWidth / 2 - separatorSize * 2,
          y: itemWidth / 2 + separatorSize,
        },
        {
          scale: animatedThumbnailScale,
        }
      ) as Animated.AnimatedTransform,
    },
  ];
  //#endregion

  console.log(itemWidth);
  //#region icon
  const animatedIconTranslateX = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [-(stickyItemWidth / 2), stickyItemWidth / 2 - separatorSize],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedIconTranslateY = interpolate(x, {
    inputRange: [0, threshold],
    outputRange: [0, -(separatorSize * 2)],
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
        { x: 0, y: 0 },
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
    outputRange: [stickyItemHeight, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const textStyle = [
    styles.text,
    {
      opacity: animatedTextOpacity,
      paddingHorizontal: separatorSize,
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
      <Animated.Text style={textStyle}>Create a story</Animated.Text>
      <Animated.View style={iconStyle} />
    </>
  );
};

export default FacebookStickyStory;
