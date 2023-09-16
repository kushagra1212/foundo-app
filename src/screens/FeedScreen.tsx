import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '../constants/theme';
import FeedSearchSceen from './itemScreens/FeedSearchScreen';
import ItemScreen from './itemScreens/ItemScreen';
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
        name="ItemScreen"
        component={ItemScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FeedSearchScreen"
        component={FeedSearchSceen}
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
export default FeedScreen;
