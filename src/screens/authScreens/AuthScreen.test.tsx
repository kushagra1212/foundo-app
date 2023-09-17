import { NavigationContainer } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { prefix } from '../../components/Foundo';
import { routesConfig } from '../../configs/routesConfig';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import AuthScreen from './AuthScreen';

const AuthScreenRender = () => (
  <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        linking={{
          prefixes: [prefix],
          config: routesConfig,
        }}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <AuthScreen />
        </ErrorBoundary>
      </NavigationContainer>
    </GestureHandlerRootView>
  </Provider>
);

describe('<AuthScreen />', () => {
  it('should AuthScreen works', async () => {
    const { getByTestId } = render(<AuthScreenRender />);

    waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
  });
});
afterEach(() => {
  // Tear down global state or variables
  jest.clearAllMocks();
});
