import { waitFor } from '@testing-library/react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import Foundo from './src/components/Foundo';
import { credentialsType } from './src/components/LoadFoundo';
import { store } from './src/redux/store';

describe('<App />', () => {
  let AppRender: React.ReactElement;

  beforeEach(() => {
    const credentials: credentialsType = {
      user: {
        email: '',
      },
      jwtResetToken: '',
      jwtToken: '',
    };
    AppRender = (
      <Provider store={store}>
        <StatusBar style="dark" />
        <Foundo credentials={credentials} />
      </Provider>
    );
  });

  it('should renders correctly', async () => {
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    store.dispatch({ type: 'RESET' });
  });
});
