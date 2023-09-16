import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider, useDispatch } from 'react-redux';

import { ROBOTO_FONTS } from './src/assets/fonts';
import { routesConfig } from './src/configs/routesConfig';
import { toastConfig } from './src/configs/toastConfig';
import { userLoggedIn } from './src/redux/services/auth-service';
import { setCredentials } from './src/redux/slices/authSlice';
import { store } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/authScreens/AuthScreen';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

const Stack = createNativeStackNavigator();
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const Foundo = () => {
  const [isfontLoaded] = useFonts(ROBOTO_FONTS);
  const [appLoaded, setAppLoaded] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const url = Linking.useURL();
  useEffect(() => {
    let flag = true;

    userLoggedIn()
      .then(res => {
        if (!flag) return;
        if (res.isLoggedIn === true) {
          dispatch(
            setCredentials({
              user: res.user,
              jwtToken: res.token,
            }),
          );
          setIsloggedIn(res.isLoggedIn);
        } else if (url) {
          const { path } = Linking.parse(url);
          const pathArray = path?.split('/');
          if (pathArray !== undefined && pathArray?.length >= 2) {
            dispatch(
              setCredentials({
                user: { email: pathArray[pathArray?.length - 2] },
                jwtResetToken: pathArray[pathArray?.length - 1],
                jwtToken: '',
              }),
            );
          }
        }
      })
      .catch(err => console.log(err))
      .finally(async () => {
        await SplashScreen.hideAsync();
        setIsLoading(false);
        setAppLoaded(true);
      });

    return () => (flag = false);
  }, [url]);
  if (!isfontLoaded || !appLoaded) {
    return null;
  }
  const prefix = Linking.createURL('app');

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
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Foundo />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
