import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { Ionicons, MaterialIconsCommunity } from '../constants/icons';
import { COLORS } from '../constants/theme';
import {
  selectAddItemDetailsScreenStatus,
  selectFeedSearchScreenStatus,
} from '../redux/slices/sreenSilce';
import { TAB_BAR_STYLE } from '../utils';
import AddItemScreen from './AddItemScreen';
import FeedScreen from './FeedScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import UserPostsHomeScreen from './userPostScreens/UserPostsHomeScreen';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const showFeedScreen = useSelector(selectFeedSearchScreenStatus);
  const showChatScreen = useSelector(selectFeedSearchScreenStatus);
  const addItemDetailsScreenShow = useSelector(
    selectAddItemDetailsScreenStatus,
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        title: 'FeedScreen',
        tabBarStyle: {
          ...TAB_BAR_STYLE,
          display: showFeedScreen || addItemDetailsScreenShow ? 'none' : 'flex',
        },
        tabBarLabel: '',
      }}
      initialRouteName="FeedScreen">
      <Tab.Screen
        name="FeedScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                size={30}
                color={focused ? COLORS.black : COLORS.GraySecondary}
              />
            );
          },
        }}
        component={FeedScreen}
      />
      <Tab.Screen
        name="AddItemScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={40}
                color={focused ? COLORS.black : COLORS.GraySecondary}
              />
            );
          },
        }}
        component={AddItemScreen}
      />
      <Tab.Screen
        options={{
          title: '',
          headerShown: false,
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={30}
                color={focused ? COLORS.black : COLORS.GraySecondary}
              />
            );
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Tab.Screen
        options={{
          title: '',
          headerShown: false,
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarLabel: '',
          tabBarStyle: {
            ...TAB_BAR_STYLE,
            display: showChatScreen ? 'none' : 'flex',
          },
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIconsCommunity
                name={focused ? 'message-badge' : 'message-badge-outline'}
                size={30}
                color={focused ? COLORS.black : COLORS.GraySecondary}
              />
            );
          },
        }}
        name="MessageScreen"
        component={MessageScreen}
      />
      <Tab.Screen
        options={{
          title: '',
          headerShown: false,
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIconsCommunity
                name={focused ? 'post' : 'post-outline'}
                size={30}
                color={focused ? COLORS.black : COLORS.GraySecondary}
              />
            );
          },
        }}
        name="UserPostsHomeScreen"
        component={UserPostsHomeScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
