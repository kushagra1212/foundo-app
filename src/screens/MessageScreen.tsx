import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Foundation } from '../constants/icons';
import { COLORS } from '../constants/theme';
import ChatScreen from './contactScreens/ChatScreen';
import ContactScreen from './contactScreens/ContactScreen';
import FeedSearchSceen from './itemScreens/FeedSearchScreen';
import ItemScreen from './itemScreens/ItemScreen';
const Stack = createNativeStackNavigator();

export type props = {};
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
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
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
