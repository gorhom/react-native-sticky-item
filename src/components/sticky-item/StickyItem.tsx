import React from 'react';
import Animated, {
  multiply,
  sub,
  greaterThan,
  cond,
} from 'react-native-reanimated';
import { transformOrigin } from 'react-native-redash';
import StickyItemBackground from '../sticky-item-background';
import { StickyItemProps } from '../../types';
import { styles } from './styles';

const StickyItem = ({
  x,
  itemWidth,
  itemHeight,
  separatorSize,
  borderRadius,
  stickyItemWidth,
  stickyItemHeight,
  stickyItemContent: StickyItemContent,
  stickyItemBackgroundColors,
}: StickyItemProps) => {
  const threshold = itemWidth - stickyItemWidth - separatorSize;
  //#region Container
  const animatedTranslateX = multiply(
    cond(
      greaterThan(x, threshold),
      itemWidth - stickyItemWidth - separatorSize * 2,
      sub(x, separatorSize)
    ),
    -1
  );
  const containerStyle = [
    styles.container,
    {
      width: itemWidth,
      height: itemHeight,
      transform: transformOrigin(
        { x: itemWidth / 2, y: 0 },
        {
          translateX: animatedTranslateX,
        }
      ) as Animated.AnimatedTransform,
    },
  ];
  //#endregion

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
    <Animated.View style={containerStyle}>
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
      />
      {renderContent()}
    </Animated.View>
  );
};

export default StickyItem;
