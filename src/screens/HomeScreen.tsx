import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import { COLORS } from '../constants/theme';
import { Ionicons } from '../constants/icons';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        title: 'FeedScreen',
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          elevation: 50,
          borderRadius: 20,
          marginTop: -20,
        },
        tabBarLabel: '',
      }}
      initialRouteName="FeedScreen"
    >
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
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
