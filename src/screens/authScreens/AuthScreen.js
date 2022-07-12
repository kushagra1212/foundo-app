import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default AuthScreen;
