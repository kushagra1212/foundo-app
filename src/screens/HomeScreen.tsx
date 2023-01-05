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
      <Tab.Screen
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: COLORS.lightGraySecondary,
          },
          headerShadowVisible: false,
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
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
