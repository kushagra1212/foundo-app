import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import Error from './src/components/Error';
import Foundo from './src/components/Foundo';
import { LoadFoundo } from './src/components/LoadFoundo';
import { store } from './src/redux/store';
// Re-export the default UI

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

SplashScreen.preventAutoHideAsync();
// const errorHandler = (error: Error, stackTrace: string) => {
//   /* Log the error to an error reporting service */
//   // console.log(error, stackTrace);
// };

const App = () => {
  const [isLoaded, error, credentials] = LoadFoundo();

  console.log(isLoaded, error, credentials);
  useEffect(() => {
    if (isLoaded) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <SafeAreaView>
        <StatusBar style="dark" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return <Error error={error} />;
  }
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Foundo credentials={credentials} />
    </Provider>
  );
};
export default App;
