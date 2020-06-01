import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  Platform,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import StickyItemFlatList from '@gorhom/sticky-item';
import Button from '../components/button';
import DummyItem from '../components/dummy-item';
import BasicSticky from '../components/basic-sticky';

const data = [...Array(20)]
  .fill(0)
  .map((_, index) => ({ id: `item-${index}` }));

export const STORY_WIDTH = 200;
export const STORY_HEIGHT = 100;
const STICKY_ITEM_WIDTH = 56;
const STICKY_ITEM_HEIGHT = 56;
const SEPARATOR_SIZE = 10;
const BORDER_RADIUS = 0;

const Basic = () => {
  const flatListRef = useRef<FlatList>(null);
  const { params } = useRoute();
  // @ts-ignore
  const { title } = params;

  // styles
  const containerStyle = {
    paddingVertical: SEPARATOR_SIZE * 2,
    backgroundColor: 'white',
  };

  // methods
  const handleStickyItemPress = () => Alert.alert('Sticky Item Pressed');
  const handleScrollToEnd = () => {
    const flatlist = flatListRef.current;
    if (flatlist) {
      flatlist.scrollToEnd({ animated: true });
    }
  };
  const handleScrollToStart = () => {
    const flatlist = flatListRef.current;
    if (flatlist) {
      flatlist.scrollToOffset({ animated: true, offset: 0 });
    }
  };
  const handleScrollToIndex = useCallback(index => {
    const flatlist = flatListRef.current;
    if (flatlist) {
      flatlist.scrollToIndex({ index });
    }
  }, []);

  // render
  const renderItem = ({ index }: ListRenderItemInfo<{}>) => (
    <TouchableOpacity onPress={() => Alert.alert(`Item ${index} Pressed`)}>
      <DummyItem
        index={index}
        borderRadius={BORDER_RADIUS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
        backgroundColor={'#dfdfdf'}
      />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>{title}</Text>
      <View style={containerStyle}>
        <StickyItemFlatList
          ref={flatListRef}
          itemWidth={STORY_WIDTH}
          itemHeight={STORY_HEIGHT}
          separatorSize={SEPARATOR_SIZE}
          borderRadius={BORDER_RADIUS}
          stickyItemWidth={STICKY_ITEM_WIDTH}
          stickyItemHeight={STICKY_ITEM_HEIGHT}
          stickyItemBackgroundColors={['#F8F8FA', '#2d88ff']}
          stickyItemContent={BasicSticky}
          onStickyItemPress={handleStickyItemPress}
          data={data}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.buttons}>
        <Button label="< Scroll To Start" onPress={handleScrollToStart} />
        <Button label="Scroll To End >" onPress={handleScrollToEnd} />
      </View>
      <View style={styles.buttons}>
        <Button label="Scroll To 4" onPress={() => handleScrollToIndex(4)} />
        <Button label="Scroll To 9" onPress={() => handleScrollToIndex(9)} />
        <Button label="Scroll To 14" onPress={() => handleScrollToIndex(14)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#CACACD',
  },
  text: {
    marginHorizontal: SEPARATOR_SIZE * 2,
    marginBottom: SEPARATOR_SIZE,
    fontSize: 43,
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    textTransform: 'uppercase',
    color: '#2d88ff',
  },
  buttons: {
    marginTop: SEPARATOR_SIZE,
    marginHorizontal: SEPARATOR_SIZE * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
});

export default Basic;
