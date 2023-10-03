import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ChatScreen from './contactScreens/ChatScreen';
import ContactScreen from './contactScreens/ContactScreen';
const Stack = createNativeStackNavigator();

export type props = object;
const MessageScreen: React.FC<props> = () => {
  return (
    <Stack.Navigator initialRouteName="ContactScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="ContactScreen"
        component={ContactScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerShown: false,
        }}
        name="ChatScreen"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

export default MessageScreen;
