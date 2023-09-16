import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../../constants/theme';
import { selectorgotPasswordStatus } from '../../redux/slices/authSlice';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';
const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  const forgotPasswordLinkSent = useSelector(selectorgotPasswordStatus);

  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: '',
          headerStyle: { backgroundColor: COLORS.white },
        }}
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
          headerShown: !forgotPasswordLinkSent,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
        name="Forgotpassword"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default AuthScreen;
