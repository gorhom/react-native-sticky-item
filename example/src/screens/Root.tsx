import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Showcase from '@gorhom/showcase-template';
import { version, description } from '../../../package.json';

const examples = [
  {
    title: '',
    data: [
      {
        name: 'Basic',
        slug: 'Basic',
      },
    ],
  },
  {
    title: 'Facebook',
    data: [
      {
        name: 'Default',
        slug: 'FacebookStories',
      },
      {
        name: 'Styled',
        slug: 'FacebookStoriesStyled',
      },
    ],
  },
];

const RootScreen = () => {
  // hooks
  const { navigate } = useNavigation();

  // callbacks
  const handleOnExamplePress = (slug: string) => {
    navigate(slug);
  };

  // renders
  return (
    <Showcase
      theme="dark"
      name="Sticky Item"
      description={description}
      version={version}
      author={{
        username: '@gorhom',
        url: 'https://twitter.com/gorhom',
      }}
      data={examples}
      handleOnPress={handleOnExamplePress}
    />
  );
};

export default RootScreen;
