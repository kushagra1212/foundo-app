import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import ForgotPasswordScreen from './ForgotPasswordScreen';
const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signin"
        component={SigninScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
        name="Signup"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
        name="Forgotpassword"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default AuthScreen;
