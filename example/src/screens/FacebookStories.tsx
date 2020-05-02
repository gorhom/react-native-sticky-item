import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Text } from 'react-native';
import StickyItemFlatList from '@gorhom/sticky-item';
import DummyItem from '../components/dummy-item';
import FacebookStickyStory from '../components/facebook-sticky-story';
import { useRoute } from '@react-navigation/native';

const data = [...Array(20)]
  .fill(0)
  .map((_, index) => ({ id: `item-${index}` }));

export const STORY_WIDTH = 90;
export const STORY_HEIGHT = 150;
const SEPARATOR_SIZE = 5;
const BORDER_RADIUS = 15;

const FacebookStories = () => {
  const { params } = useRoute();
  // @ts-ignore
  const { title } = params;

  const renderItem = () => (
    <DummyItem
      borderRadius={BORDER_RADIUS}
      width={STORY_WIDTH}
      height={STORY_HEIGHT}
      backgroundColor={'#dfdfdf'}
    />
  );

  const containerStyle = {
    paddingVertical: SEPARATOR_SIZE * 2,
    backgroundColor: 'white',
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>{title}</Text>
      <View style={containerStyle}>
        <StickyItemFlatList
          itemWidth={STORY_WIDTH}
          itemHeight={STORY_HEIGHT}
          separatorSize={SEPARATOR_SIZE}
          borderRadius={BORDER_RADIUS}
          stickyItemWidth={36}
          stickyItemHeight={36}
          stickyItemBackgroundColors={['#F8F8FA', '#FFF']}
          stickyItemContent={FacebookStickyStory}
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
    justifyContent: 'center',
    backgroundColor: '#CACACD',
  },
  text: {
    marginHorizontal: SEPARATOR_SIZE * 2,
    marginBottom: SEPARATOR_SIZE,
    fontSize: 43,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#2d88ff',
  },
});

export default FacebookStories;
