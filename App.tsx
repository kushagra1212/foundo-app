import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import Error from './src/components/Error';
import Foundo from './src/components/Foundo';
import { LoadFoundo } from './src/components/molecules/Hooks/Auth/LoadFoundo';
import { COLORS } from './src/constants/theme';
import { api } from './src/redux/services/api-service';
import { store } from './src/redux/store';
// Re-export the default UI

SplashScreen.preventAutoHideAsync();
// const errorHandler = (error: Error, stackTrace: string) => {
//   /* Log the error to an error reporting service */
//   // console.log(error, stackTrace);
// };
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [isLoaded, error, credentials] = LoadFoundo();
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
        <ActivityIndicator size="large" color={COLORS.redPrimary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return <Error error={error} resetError={() => {}} />;
  }

  return (
    <ApiProvider api={api}>
      <Provider store={store}>
        <StatusBar style="dark" />
        <Foundo credentials={credentials} />
      </Provider>
    </ApiProvider>
  );
};
export default App;
