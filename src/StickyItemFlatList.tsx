import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import Animated, { event, block, set } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import { useValues } from 'react-native-redash';
import type { StickyItemFlatListProps } from './types';
import StickyItem from './components/sticky-item';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function StickyItemFlatList<T>({
  itemWidth,
  itemHeight,
  separatorSize,
  borderRadius,
  stickyItemWidth,
  stickyItemHeight,
  stickyItemBackgroundColors,
  stickyItemContent,
  ...rest
}: StickyItemFlatListProps<T>) {
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
  const [x, state] = useValues([0, State.UNDETERMINED]);
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
          x: (_x: number) => block([set(x, _x), set(state, State.END)]),
        },
      },
    },
  ]);
  //#endregion

  const renderSeparator = () => <View style={{ width: separatorSize }} />;
  return (
    <View>
      <AnimatedFlatList
        {...rest}
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
    </View>
  );
}

export default StickyItemFlatList;
