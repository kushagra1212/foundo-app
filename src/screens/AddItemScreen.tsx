import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '../constants/theme';
import AddItemDetailsScreen from './postScreens/AddItemDetailsScreen';
import SelectItemTypeScreen from './postScreens/SelectItemTypeScreen';

const Stack = createNativeStackNavigator();

export type props = object;
const AddItemScreen: React.FC<props> = () => {
  return (
    <Stack.Navigator initialRouteName="SelectItemTypeScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="SelectItemTypeScreen"
        component={SelectItemTypeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AddItemDetailsScreen"
        component={AddItemDetailsScreen}
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
export default AddItemScreen;
