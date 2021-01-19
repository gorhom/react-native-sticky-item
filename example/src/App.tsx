import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
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
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen
          name="Root"
          component={RootScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Basic"
          options={{
            title: 'Basic',
          }}
          component={BasicScreen}
        />
        <Stack.Screen
          name="BasicRTL"
          options={{
            title: `בסיסי`,
          }}
          component={BasicRTLScreen}
        />
        <Stack.Screen
          name="BasicCustomSeparator"
          options={{
            title: 'Custom Separator',
          }}
          component={BasicCustomSeparatorScreen}
        />
        <Stack.Screen
          name="FacebookStories"
          options={{
            title: 'Facebook Stories',
          }}
          component={FacebookStoriesScreen}
        />
        <Stack.Screen
          name="FacebookStoriesStyled"
          options={{
            title: 'Facebook Stories Styled',
          }}
          component={FacebookStoriesStyledScreen}
        />
        <Stack.Screen
          name="FacebookStoriesRTL"
          options={{
            title: 'فيس بوك قصص',
          }}
          component={FacebookStoriesRTLScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
