import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import AuthScreen from './src/screens/authScreens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import { toastConfig } from './src/configs/toastConfig';
import { useFonts } from 'expo-font';
import { ROBOTO_FONTS } from './src/assets/fonts';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { userLoggedIn } from './src/redux/services/auth-service';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@env';
const Stack = createNativeStackNavigator();
import * as Linking from 'expo-linking';
export default function App() {
  const [isfontLoaded] = useFonts(ROBOTO_FONTS);
  const [appLoaded, setAppLoaded] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    let flag = true;
    userLoggedIn()
      .then((isLogged) => {
        if (flag) setIsloggedIn(isLogged);
        setAppLoaded(true);
      })
      .catch((err) => console.log(err));
    return () => (flag = false);
  }, []);
  if (!isfontLoaded || !appLoaded) {
    return null;
  }

  const config = {
    screens: {
      Home: {
        path: 'home',
        screens: {
          FeedScreen: {
            path: 'feed',
            screens: {
              ItemScreen: 'item',
              FeedSearchScreen: 'feedsearch',
            },
          },
          ProfileScreen: {
            path: 'profilescreen',
          },
        },
      },
      Auth: {
        path: 'auth',
        screens: {
          Signin: 'signin',
          Signup: 'signup',
          ResetPassword: 'resetpassword/:email/:token',
          Forgotpassword: 'forgotpassword',
        },
      },
    },
  };
  const prefix = Linking.createURL('app');

  return (
    <Provider store={store}>
      <NavigationContainer linking={{ prefixes: [prefix], config }}>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Auth'}>
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
    </Provider>
  );
}

const styles = StyleSheet.create({});
