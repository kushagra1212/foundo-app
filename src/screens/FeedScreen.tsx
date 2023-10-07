import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { COLORS } from '../constants/theme';
import FeedSearchSceen from './itemScreens/FeedSearchScreen';
import ItemScreen from './itemScreens/ItemScreen';
import UserProfileScreen from './itemScreens/UserProfileScreen';
const Stack = createNativeStackNavigator();

export type props = object;
const FeedScreen: React.FC<props> = () => {
  return (
    <Stack.Navigator initialRouteName="ItemScreen">
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.lightGrayPrePrimary,
          },
          headerShown: false,
          headerShadowVisible: false,
          headerLeft: () => null,
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="ItemScreen"
        component={ItemScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FeedSearchScreen"
        component={FeedSearchSceen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default FeedScreen;
