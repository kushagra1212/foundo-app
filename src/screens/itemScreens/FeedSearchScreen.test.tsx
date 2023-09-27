import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { logOut } from '../../redux/slices/authSlice';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import FeedSearchSceen from './FeedSearchScreen';

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('<FeedSearchSceen />', () => {
  let FeedSearchSceenRender: React.ReactElement;

  beforeAll(() => {
    store.dispatch(logOut);

    FeedSearchSceenRender = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <FeedSearchSceen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  it('should FeedSearchSceen works', async () => {
    const { getByTestId, getAllByText, getByText } = render(
      FeedSearchSceenRender,
    );

    await waitFor(() => {
      expect(getByTestId('searchInput')).toBeTruthy();
    });
    fireEvent.changeText(getByTestId('searchInput'), 'laptop');

    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('backFromSearchToFeed')).toBeTruthy();
    });
    fireEvent.press(getByTestId('backFromSearchToFeed'));

    await waitFor(() => {
      expect(navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
});
