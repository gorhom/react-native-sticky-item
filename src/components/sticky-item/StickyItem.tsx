import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  multiply,
  sub,
  greaterThan,
  cond,
  add,
  useCode,
  onChange,
  call,
  eq,
} from 'react-native-reanimated';
import { transformOrigin } from 'react-native-redash';
import StickyItemBackground from '../sticky-item-background';
import { StickyItemProps } from '../../types';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  isRTL,
}: StickyItemProps) => {
  const containerRef = useRef<Animated.View>(null);
  const threshold = itemWidth - stickyItemWidth - separatorSize;
  //#region Container
  const animatedTranslateX = multiply(
    cond(
      greaterThan(x, threshold),
      isRTL
        ? SCREEN_WIDTH - stickyItemWidth - separatorSize * 2
        : itemWidth - stickyItemWidth - separatorSize * 2,
      isRTL
        ? add(x, SCREEN_WIDTH - itemWidth - separatorSize)
        : sub(x, separatorSize)
    ),
    isRTL ? 1 : -1
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

  // effects
  /**
   * @DEV
   * here we manipulate the container `pointerEvents` to avoid
   * the double press event on Android.
   */
  useCode(
    () => [
      onChange(animatedTranslateX, [
        cond(
          eq(animatedTranslateX, separatorSize),
          call([], () => {
            const container = containerRef.current;
            if (container) {
              // @ts-ignore
              container.setNativeProps({
                pointerEvents: 'none',
              });
            }
          })
        ),
        cond(
          eq(animatedTranslateX, (threshold - separatorSize) * -1),
          call([], () => {
            const container = containerRef.current;
            if (container) {
              // @ts-ignore
              container.setNativeProps({
                pointerEvents: 'auto',
              });
            }
          })
        ),
      ]),
    ],
    [separatorSize, threshold]
  );
  return (
    <Animated.View ref={containerRef} style={containerStyle}>
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
