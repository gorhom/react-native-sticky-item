import type { FlatListProps } from 'react-native';
import Animated from 'react-native-reanimated';

export interface StickyItemProps extends StickyItemConfig {
  x: Animated.Value<number>;
}

export interface StickyItemContentProps
  extends Omit<
    StickyItemProps,
    'stickyItemContent' | 'stickyItemBackgroundColors'
  > {
  threshold: number;
}

export interface StickyItemBackgroundProps
  extends Omit<StickyItemProps, 'stickyItemContent'> {
  threshold: number;
  stickyItemBackgroundColors: string[];
}

export interface StickyItemConfig {
  itemWidth: number;
  itemHeight: number;
  separatorSize: number;
  borderRadius: number;
  stickyItemWidth: number;
  stickyItemHeight: number;
  stickyItemBackgroundColors: string[];
  stickyItemContent:
    | ((props: StickyItemContentProps) => React.ReactNode)
    | React.ComponentClass<StickyItemContentProps>;
}

export interface StickyItemFlatListProps<T>
  extends FlatListProps<T>,
    StickyItemConfig {
  onStickyItemPress?: () => void;
}
