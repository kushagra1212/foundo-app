import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { routesConfig } from '../configs/routesConfig';
import { toastConfig } from '../configs/toastConfig';
import { setCredentials } from '../redux/slices/authSlice';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/authScreens/AuthScreen';
import { credentialsType } from './LoadFoundo';
export const prefix = Linking.createURL('app');
const Stack = createNativeStackNavigator();

export type FoundoProps = {
  credentials: credentialsType;
};
const Foundo: React.FC<FoundoProps> = ({ credentials }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(setCredentials(credentials));
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        linking={{ prefixes: [prefix], config: routesConfig }}>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={AuthScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>

        <Toast config={toastConfig} visibilityTime={2000} />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Foundo;
