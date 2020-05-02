import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootScreen from './screens/Root';
import FacebookStoriesScreen from './screens/FacebookStories';
import FacebookStoriesStyledScreen from './screens/FacebookStoriesStyled';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root" headerMode="none">
        <Stack.Screen name="Root" component={RootScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
