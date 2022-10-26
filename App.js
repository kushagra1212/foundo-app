import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createNativeStackNavigator();

export default function App() {
  const [isfontLoaded] = useFonts(ROBOTO_FONTS);
  if (!isfontLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userLoggedIn ? 'Home' : 'Auth'}>
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

        <Toast config={toastConfig} visibilityTime={10000} />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
