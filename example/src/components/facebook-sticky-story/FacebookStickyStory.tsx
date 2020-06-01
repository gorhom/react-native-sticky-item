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
  separatorSize,
  borderRadius,
  isRTL,
}: StickyItemContentProps) => {
  const separatorSizeToStickyWidthScale = separatorSize / stickyItemWidth;
  const stickyWidthWithoutPadding = stickyItemWidth - separatorSize * 2;
  const stickyScaleX =
    stickyItemWidth / itemWidth - separatorSizeToStickyWidthScale;

  //#region thumbnail
  const animatedThumbnailScale = interpolate(x, {
    inputRange: [separatorSize, threshold],
    outputRange: [1, stickyScaleX],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedThumbnailTranslateX = interpolate(x, {
    inputRange: [separatorSize, threshold],
    outputRange: [0, isRTL ? separatorSize : -separatorSize],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedThumbnailBorderRadius = interpolate(x, {
    inputRange: [separatorSize, threshold],
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
          x: (itemWidth / 2) * (isRTL ? -1 : 1),
          y: itemHeight / 2 + stickyItemWidth / 2 - itemWidth / 2,
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
  const iconPosition = findPointOnCircle({
    radius: stickyWidthWithoutPadding / 2,
    degrees: 45,
  });
  const animatedIconTranslateX = interpolate(x, {
    inputRange: [separatorSize, threshold],
    outputRange: [
      -(stickyItemWidth / 2),
      -(stickyWidthWithoutPadding / 2) + iconPosition.x + separatorSize,
    ],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedIconTranslateY = interpolate(x, {
    inputRange: [separatorSize, threshold],
    outputRange: [
      -(stickyItemWidth / 2),
      -(stickyWidthWithoutPadding / 2) + iconPosition.y - separatorSize,
    ],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedIconScale = interpolate(x, {
    inputRange: [separatorSize, threshold],
    outputRange: [1, 0.25],
    extrapolate: Extrapolate.CLAMP,
  });
  const iconStyle = [
    styles.icon,
    {
      borderRadius: stickyItemWidth,
      width: stickyItemWidth,
      height: stickyItemWidth,
      left: '50%',
      top: itemHeight / 2,
      transform: transformOrigin(
        { x: 0, y: 0 },
        {
          translateX: animatedIconTranslateX,
          translateY: animatedIconTranslateY,
          scale: animatedIconScale,
        }
      ),
    },
  ];
  //#endregion

  //#region text
  const animatedTextOpacity = interpolate(x, {
    inputRange: [separatorSize, threshold * 0.6],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedTextTranslateY = interpolate(x, {
    inputRange: [separatorSize, threshold * 0.6],
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

const findPointOnCircle = ({
  radius,
  degrees,
}: {
  radius: number;
  degrees: number;
}) => {
  var newX = radius * Math.cos(degrees * (Math.PI / 180));
  var newY = radius * Math.sin(degrees * (Math.PI / 180));
  return { x: newX, y: newY };
};

export default FacebookStickyStory;
