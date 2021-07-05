import React, { useMemo } from 'react';
import { Dimensions, View, ViewStyle } from 'react-native';
import Animated, {
  multiply,
  sub,
  greaterThan,
  cond,
  add,
  eq,
  Extrapolate,
} from 'react-native-reanimated';
import { transformOrigin, withTimingTransition } from '../../utilities/redash';
import { interpolate, Easing } from '../../utilities';
import StickyItemBackground from '../sticky-item-background';
import type { StickyItemProps } from '../../types';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StickyItem = ({
  x,
  tapState,
  itemWidth,
  itemHeight,
  separatorSize,
  borderRadius,
  stickyItemActiveOpacity,
  stickyItemWidth,
  stickyItemHeight,
  stickyItemContent: StickyItemContent,
  stickyItemBackgroundColors,
  isRTL,
}: StickyItemProps) => {
  const threshold = itemWidth - stickyItemWidth + separatorSize;

  //#region animations
  const animatedTranslateX = multiply(
    cond(
      greaterThan(x, threshold),
      isRTL ? SCREEN_WIDTH - stickyItemWidth : itemWidth - stickyItemWidth,
      isRTL
        ? add(x, SCREEN_WIDTH - itemWidth - separatorSize)
        : sub(x, separatorSize)
    ),
    isRTL ? 1 : -1
  );
  const animatedOpacity = withTimingTransition(eq(tapState, 2), {
    duration: 125,
    easing: Easing.inOut(Easing.quad),
  });
  //#endregion

  //#region styles
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        width: itemWidth,
        height: itemHeight,
        opacity: interpolate(animatedOpacity, {
          inputRange: [0, 1],
          outputRange: [1, stickyItemActiveOpacity],
          extrapolate: Extrapolate.CLAMP,
        }),
        transform: transformOrigin(
          { x: itemWidth / 2, y: 0 },
          {
            translateX: animatedTranslateX,
          }
        ) as Animated.AnimatedTransform,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemWidth, itemHeight, stickyItemActiveOpacity]
  );
  const pressableViewStyle = useMemo<ViewStyle>(
    () => ({
      ...styles.pressable,
      width: stickyItemWidth,
      height: stickyItemHeight,
      borderRadius: stickyItemWidth,
      [isRTL ? 'left' : 'right']: 0,
      top: (itemHeight - stickyItemHeight) / 2,
    }),
    [isRTL, stickyItemWidth, stickyItemHeight, itemHeight]
  );
  //#endregion

  // render
  const renderContent = () => {
    const props = {
      x,
      itemWidth,
      itemHeight,
      stickyItemWidth,
      stickyItemHeight,
      separatorSize,
      borderRadius,
      threshold,
      isRTL,
    };
    return typeof StickyItemContent === 'function' ? (
      // @ts-ignore
      StickyItemContent(props)
    ) : (
      // @ts-ignore
      <StickyItemContent {...props} />
    );
  };

  return (
    <Animated.View pointerEvents="box-none" style={containerStyle}>
      <View style={pressableViewStyle} />
      <StickyItemBackground
        threshold={threshold}
        x={x}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
        separatorSize={separatorSize}
        borderRadius={borderRadius}
        stickyItemWidth={stickyItemWidth}
        stickyItemHeight={stickyItemHeight}
        stickyItemBackgroundColors={stickyItemBackgroundColors}
        isRTL={isRTL}
      />
      {renderContent()}
    </Animated.View>
  );
};

export default StickyItem;
