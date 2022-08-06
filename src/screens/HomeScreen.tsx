import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import { COLORS } from '../constants/theme';
import { Foundation } from '../constants/icons';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="FeedScreen"
    >
      <Tab.Screen
        name="FeedScreen"
        options={{ headerShown: false }}
        component={FeedScreen}
      />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
