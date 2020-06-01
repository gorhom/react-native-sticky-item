import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootScreen from './screens/Root';
import BasicScreen from './screens/Basic';
import BasicRTLScreen from './screens/BasicRTL';
import BasicCustomSeparatorScreen from './screens/BasicCustomSeparator';
import FacebookStoriesScreen from './screens/FacebookStories';
import FacebookStoriesStyledScreen from './screens/FacebookStoriesStyled';
import FacebookStoriesRTLScreen from './screens/FacebookStoriesRTL';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root" headerMode="none">
        <Stack.Screen name="Root" component={RootScreen} />
        <Stack.Screen
          name="Basic"
          initialParams={{
            title: 'Basic',
          }}
          component={BasicScreen}
        />
        <Stack.Screen
          name="BasicRTL"
          initialParams={{
            title: `בסיסי`,
          }}
          component={BasicRTLScreen}
        />
        <Stack.Screen
          name="BasicCustomSeparator"
          initialParams={{
            title: 'Custom Separator',
          }}
          component={BasicCustomSeparatorScreen}
        />
        <Stack.Screen
          name="FacebookStories"
          initialParams={{
            title: 'Facebook Stories',
          }}
          component={FacebookStoriesScreen}
        />
        <Stack.Screen
          name="FacebookStoriesStyled"
          initialParams={{
            title: 'Facebook Stories Styled',
          }}
          component={FacebookStoriesStyledScreen}
        />
        <Stack.Screen
          name="FacebookStoriesRTL"
          initialParams={{
            title: 'فيس بوك قصص',
          }}
          component={FacebookStoriesRTLScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
