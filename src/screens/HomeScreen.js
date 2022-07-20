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
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.lightGrayPrePrimary,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.left_btn}
              onPress={() => console.log('left-btn')}
            >
              <Foundation name="indent-more" size={30} />
            </TouchableOpacity>
          ),
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Feed"
        component={FeedScreen}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
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
    elevation: 10,
  },
});
export default HomeScreen;
