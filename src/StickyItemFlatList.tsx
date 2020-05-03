import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
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
import {
  DEFAULT_SEPARATOR_SIZE,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_IS_RTL,
} from './constants';
import type { StickyItemFlatListProps } from './types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SCREEN_WIDTH = Dimensions.get('window').width;

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
  isRTL = DEFAULT_IS_RTL,
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

  //#region methods
  const getHitSlop = useCallback(
    isMinimized => {
      const startPosition = isMinimized ? 0 : -separatorSize;
      const endPosition = isMinimized
        ? -(SCREEN_WIDTH - (stickyItemWidth + separatorSize * 2))
        : -(SCREEN_WIDTH - separatorSize - itemWidth);

      return {
        top: isMinimized
          ? -(itemHeight / 2 - (stickyItemWidth + separatorSize * 2) / 2)
          : 0,
        right: isRTL ? startPosition : endPosition,
        left: isRTL ? endPosition : startPosition,
        bottom: isMinimized
          ? -(itemHeight / 2 - (stickyItemWidth + separatorSize * 2) / 2)
          : 0,
      };
    },
    [itemWidth, itemHeight, stickyItemWidth, separatorSize, isRTL]
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
  //#endregion

  //#region effects
  useCode(
    () =>
      cond(eq(tapState, State.END), [
        call([tapState], args => {
          console.log(args);
          if (onStickyItemPress) {
            onStickyItemPress();
          }
        }),
        set(tapState, State.UNDETERMINED),
      ]),
    [tapState]
  );
  useCode(
    () =>
      onChange(
        x,
        call([x], args => {
          if (tapRef.current) {
            const isMinimized = args[0] > 0;
            // @ts-ignore
            tapRef.current.setNativeProps({ hitSlop: getHitSlop(isMinimized) });
          }
        })
      ),
    [x, itemWidth, itemHeight, stickyItemWidth, stickyItemWidth, separatorSize]
  );
  /**
   * @DEV
   * to fix stick item position with fast refresh
   */
  useEffect(() => {
    x.setValue(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  // render
  const renderSeparator = () => <View style={{ width: separatorSize }} />;
  return (
    <TapGestureHandler
      ref={tapRef}
      hitSlop={getHitSlop(false)}
      waitFor={flatlistRef}
      {...tapGestures}
    >
      <Animated.View>
        <AnimatedFlatList
          {...rest}
          ref={flatlistRef}
          inverted={isRTL}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={contentContainerStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          pagingEnabled={true}
          decelerationRate={'fast'}
          snapToAlignment={'start'}
          snapToInterval={itemWidth + separatorSize}
          initialScrollIndex={0}
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
          isRTL={isRTL}
        />
      </Animated.View>
    </TapGestureHandler>
  );
}

export default StickyItemFlatList;
