import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '../constants/theme';
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

const styles = StyleSheet.create({
  left_btn: {
    margin: 5,
    backgroundColor: COLORS.white,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginLeft: -5,
    elevation: 10,
  },
});
export default MessageScreen;
