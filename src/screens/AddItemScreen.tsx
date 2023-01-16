import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Foundation } from '../constants/icons';
import { COLORS } from '../constants/theme';
import { updateAddItemDetailsScreenStatus } from '../redux/slices/sreenSilce';
import AddItemDetailsScreen from './postScreens/AddItemDetailsScreen';
import SelectItemTypeScreen from './postScreens/SelectItemTypeScreen';
import { useEffect } from 'react';
const Stack = createNativeStackNavigator();

export type props = {};
const AddItemScreen: React.FC<props> = () => {
  return (
    <Stack.Navigator initialRouteName="ContactScreen">
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
