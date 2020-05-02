import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Text } from 'react-native';
import StickyItemFlatList from '@gorhom/sticky-item';
import DummyItem from '../components/dummy-item';
import FacebookStickyStoryStyled from '../components/facebook-sticky-story-styled';
import { useRoute } from '@react-navigation/native';

const data = [...Array(20)]
  .fill(0)
  .map((_, index) => ({ id: `item-${index}` }));

export const STORY_WIDTH = 90;
export const STORY_HEIGHT = 150;
const SEPARATOR_SIZE = 5;
const BORDER_RADIUS = 10;

const FacebookStoriesStyled = () => {
  const { params } = useRoute();
  // @ts-ignore
  const { title } = params;

  const renderItem = () => (
    <DummyItem
      width={STORY_WIDTH}
      height={STORY_HEIGHT}
      borderRadius={BORDER_RADIUS}
      backgroundColor={'#333'}
    />
  );

  const containerStyle = {
    paddingVertical: SEPARATOR_SIZE * 2,
    backgroundColor: '#111',
  };

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
          stickyItemWidth={36}
          stickyItemHeight={36}
          stickyItemBackgroundColors={['#222', '#000']}
          stickyItemContent={FacebookStickyStoryStyled}
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
    backgroundColor: '#000',
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

export default FacebookStoriesStyled;
