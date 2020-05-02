import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  event,
  useCode,
  cond,
  eq,
  call,
  onChange,
  set,
} from 'react-native-reanimated';
import {
  FlatList,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { useValues, useGestureHandler } from 'react-native-redash';
import StickyItem from './components/sticky-item';
import { DEFAULT_SEPARATOR_SIZE, DEFAULT_BORDER_RADIUS } from './constants';
import type { StickyItemFlatListProps } from './types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function StickyItemFlatList<T>({
  itemWidth,
  itemHeight,
  separatorSize = DEFAULT_SEPARATOR_SIZE,
  borderRadius = DEFAULT_BORDER_RADIUS,
  stickyItemWidth,
  stickyItemHeight,
  stickyItemBackgroundColors,
  stickyItemContent,
  onStickyItemPress,
  ...rest
}: StickyItemFlatListProps<T>) {
  const flatlistRef = useRef(null);
  const tapRef = useRef<TapGestureHandler>(null);

  //#region styles
  const contentContainerStyle = useMemo(
    () => [
      rest.contentContainerStyle,
      {
        paddingLeft: itemWidth + separatorSize * 2,
        paddingRight: separatorSize,
      },
    ],
    [rest.contentContainerStyle, itemWidth, separatorSize]
  );
  //#endregion

  //#region gesture
  const [x, tapState] = useValues([0, State.UNDETERMINED]);
  const tapGestures = useGestureHandler({ state: tapState });
  const onScroll = event([
    {
      nativeEvent: {
        contentOffset: {
          x,
        },
      },
    },
  ]);
  const onScrollEnd = event([
    {
      nativeEvent: {
        contentOffset: {
          x,
        },
      },
    },
  ]);
  useCode(
    () =>
      cond(
        eq(tapState, State.END),
        call([], () => {
          if (onStickyItemPress) {
            onStickyItemPress();
          }
        }),
        set(tapState, State.UNDETERMINED)
      ),
    [tapState]
  );
  //#endregion

  // effect
  useCode(
    () =>
      onChange(
        x,
        call([x], args => {
          if (tapRef.current) {
            const isMinimized = args[0] > 0;
            // @ts-ignore
            tapRef.current.setNativeProps({
              hitSlop: {
                top: isMinimized
                  ? -((itemHeight - (stickyItemWidth + separatorSize * 2)) / 2)
                  : 0,
                left: isMinimized ? 0 : -separatorSize,
                width: isMinimized
                  ? stickyItemWidth + separatorSize * 2
                  : itemWidth,
                height: isMinimized
                  ? stickyItemWidth + separatorSize * 2
                  : itemHeight,
              },
            });
          }
        })
      ),
    [x, itemWidth, itemHeight, stickyItemWidth, stickyItemWidth, separatorSize]
  );
  // render
  const renderSeparator = () => <View style={{ width: separatorSize }} />;
  return (
    <TapGestureHandler
      ref={tapRef}
      hitSlop={{
        top: 0,
        left: -separatorSize,
        width: itemWidth,
        height: itemHeight,
      }}
      waitFor={flatlistRef}
      {...tapGestures}
    >
      <Animated.View>
        <AnimatedFlatList
          {...rest}
          ref={flatlistRef}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={contentContainerStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          pagingEnabled={true}
          decelerationRate={'fast'}
          snapToAlignment={'start'}
          snapToInterval={itemWidth + separatorSize}
          onScroll={onScroll}
          onScrollAnimationEnd={onScrollEnd}
        />
        <StickyItem
          x={x}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          separatorSize={separatorSize}
          borderRadius={borderRadius}
          stickyItemWidth={stickyItemWidth}
          stickyItemHeight={stickyItemHeight}
          stickyItemBackgroundColors={stickyItemBackgroundColors}
          stickyItemContent={stickyItemContent}
        />
      </Animated.View>
    </TapGestureHandler>
  );
}

export default StickyItemFlatList;
