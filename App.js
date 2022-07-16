import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import AuthScreen from './src/screens/authScreens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import { toastConfig } from './src/configs/toastConfig';
import { useFonts } from 'expo-font';
import {
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isfontLoaded] = useFonts({
    Roboto_400Regular: Roboto_400Regular,
    Roboto_700Bold: Roboto_700Bold,
    Roboto_100Thin: Roboto_100Thin,
  });
  if (!isfontLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
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
  );
}

const styles = StyleSheet.create({});
