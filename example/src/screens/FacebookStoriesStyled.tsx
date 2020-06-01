import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import StickyItemFlatList from '@gorhom/sticky-item';
import DummyItem from '../components/dummy-item';
import FacebookStickyStoryStyled from '../components/facebook-sticky-story-styled';

const data = [...Array(20)]
  .fill(0)
  .map((_, index) => ({ id: `item-${index}` }));

export const STORY_WIDTH = 90;
export const STORY_HEIGHT = 150;
const STICKY_ITEM_WIDTH = 46;
const STICKY_ITEM_HEIGHT = 46;
const SEPARATOR_SIZE = 8;
const BORDER_RADIUS = 10;

const FacebookStoriesStyled = () => {
  const { params } = useRoute();
  // @ts-ignore
  const { title } = params;

  // styles
  const containerStyle = {
    paddingVertical: SEPARATOR_SIZE * 2,
    backgroundColor: '#111',
  };

  // methods
  const handleStickyItemPress = () => Alert.alert('Sticky Item Pressed');

  // render
  const renderItem = ({ index }: ListRenderItemInfo<{}>) => (
    <TouchableOpacity onPress={() => Alert.alert(`Item ${index} Pressed`)}>
      <DummyItem
        index={index}
        borderRadius={BORDER_RADIUS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
        backgroundColor={'#333'}
      />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.text}>{title}</Text>
      <View style={containerStyle}>
        <StickyItemFlatList
          itemWidth={STORY_WIDTH}
          itemHeight={STORY_HEIGHT}
          separatorSize={SEPARATOR_SIZE}
          borderRadius={BORDER_RADIUS}
          stickyItemWidth={STICKY_ITEM_WIDTH}
          stickyItemHeight={STICKY_ITEM_HEIGHT}
          stickyItemBackgroundColors={['#222', '#000']}
          stickyItemContent={FacebookStickyStoryStyled}
          onStickyItemPress={handleStickyItemPress}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  text: {
    marginHorizontal: SEPARATOR_SIZE * 2,
    marginBottom: SEPARATOR_SIZE,
    fontSize: 43,
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    textTransform: 'uppercase',
    color: '#2d88ff',
  },
});

export default FacebookStoriesStyled;
