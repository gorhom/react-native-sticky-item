import type { FlatListProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

export interface StickyItemProps extends Required<StickyItemConfig> {
  /**
   * Animated value of the flatlist x position.
   * @type {Animated.Value<number>}
   */
  x: Animated.Value<number>;

  /**
   * Tap gesture state, this used for tap/press effect
   * @type {Animated.Value<State>}
   */
  tapState: Animated.Value<State>;
}

export interface StickyItemContentProps
  extends Omit<
    StickyItemProps,
    'stickyItemContent' | 'stickyItemBackgroundColors'
  > {
  threshold: number;
}

export interface StickyItemBackgroundProps
  extends Omit<
    StickyItemProps,
    'stickyItemContent' | 'tapState' | 'stickyItemActiveOpacity'
  > {
  threshold: number;
}

export interface StickyItemConfig {
  /**
   * Item's width.
   * @type {number}
   */
  itemWidth: number;
  /**
   * Item's height.
   * @type {number}
   */
  itemHeight: number;
  /**
   * FlatList's separator width
   * @type {number}
   * @default 10
   */
  separatorSize?: number;
  /**
   * Item & sticky border radius.
   * @type {number}
   * @default 15
   */
  borderRadius?: number;
  /**
   * Sticky item's active opacity.
   * @type {number}
   * @default 0.2
   */
  stickyItemActiveOpacity?: number;
  /**
   * Sticky item's width.
   * @type {number}
   */
  stickyItemWidth: number;
  /**
   * Sticky item's height.
   * @type {number}
   */
  stickyItemHeight: number;
  /**
   * Sticky item's two background colors, one when sticky item is extended
   * another when it's minimize.
   * @type {string[]}
   */
  stickyItemBackgroundColors: string[];
  /**
   * Sticky item's content component.
   * @type {(props: StickyItemContentProps) => React.ReactNode}
   */
  stickyItemContent:
    | ((props: StickyItemContentProps) => React.ReactNode)
    | React.ComponentClass<StickyItemContentProps>;
  /**
   * FlatList' layout direction.
   * @default false
   */
  isRTL?: boolean;
}

export interface SeparatorConfig {
  /**
   * FlatList's separator width
   * @type {number}
   * @default 10
   */
  size: number;
}

export interface StickyItemFlatListProps<T>
  extends FlatListProps<T>,
    StickyItemConfig {
  /**
   * Callback when sticky item gets pressed.
   * @type {() => void}
   */
  onStickyItemPress?: () => void;

  /**
   * Override `FlatList` prop, to add
   * `SeparatorConfig` to `ItemSeparatorComponent`
   */
  ItemSeparatorComponent?: React.ComponentType<SeparatorConfig>;
}
