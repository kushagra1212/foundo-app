import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Ionicons, MaterialIconsCommunity } from '../constants/icons';
import { COLORS } from '../constants/theme';
import {
  selectAddItemDetailsScreenStatus,
  selectFeedSearchScreenStatus,
} from '../redux/slices/sreenSilce';
import AddItemScreen from './AddItemScreen';
import FeedScreen from './FeedScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import UserPostsHomeScreen from './userPostScreens/UserPostsHomeScreen';
const Tab = createBottomTabNavigator();
export const TAB_BAR_STYLE: any = {
  backgroundColor: COLORS.white,
  height: 70,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  padding: 10,
  elevation: 50,
  borderRadius: 20,
  marginTop: -20,
};
const HomeScreen = () => {
  const feedSearchShow = useSelector(selectFeedSearchScreenStatus);
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
          display: feedSearchShow || addItemDetailsScreenShow ? 'none' : 'flex',
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
          // <TouchableOpacity
          //   style={styles.left_btn}
          //   onPress={() => console.log('left-btn')}
          // >
          //   <Foundation name="indent-more" size={30} />
          // </TouchableOpacity>
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
          // <TouchableOpacity
          //   style={styles.left_btn}
          //   onPress={() => console.log('left-btn')}
          // >
          //   <Foundation name="indent-more" size={30} />
          // </TouchableOpacity>
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarLabel: '',
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
          // <TouchableOpacity
          //   style={styles.left_btn}
          //   onPress={() => console.log('left-btn')}
          // >
          //   <Foundation name="indent-more" size={30} />
          // </TouchableOpacity>
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

const styles = StyleSheet.create({});
export default HomeScreen;
