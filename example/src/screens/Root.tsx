import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Showcase from '@gorhom/showcase-template';
import { version, description } from '../../../package.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const examples = [
  {
    title: 'Basic',
    data: [
      {
        name: 'Default',
        slug: 'Basic',
      },
      {
        name: 'RTL',
        slug: 'BasicRTL',
      },
      {
        name: 'Custom Separator',
        slug: 'BasicCustomSeparator',
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
      {
        name: 'RTL',
        slug: 'FacebookStoriesRTL',
      },
    ],
  },
];

const RootScreen = () => {
  // hooks
  const { navigate } = useNavigation();
  const safeInsets = useSafeAreaInsets();

  // variables
  const author = useMemo(
    () => ({
      username: 'Mo Gorhom',
      url: 'https://gorhom.dev',
    }),
    []
  );

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
      author={author}
      data={examples}
      safeInsets={safeInsets}
      handleOnPress={handleOnExamplePress}
    />
  );
};

export default RootScreen;
