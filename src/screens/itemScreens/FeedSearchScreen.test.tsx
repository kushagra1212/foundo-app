import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import { ReactTestInstance } from 'react-test-renderer';

import Error from '../../components/Error';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import FeedSearchSceen from './FeedSearchScreen';

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};
const FeedSearchSceenRender = () => (
  <Provider store={store}>
    <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
      <FeedSearchSceen navigation={navigation} />
    </ErrorBoundary>
  </Provider>
);

describe('<FeedSearchSceen />', () => {
  it('should FeedSearchSceen works', async () => {
    const { getByTestId, getAllByText } = render(<FeedSearchSceenRender />);

    await waitFor(() => {
      expect(getByTestId('searchInput')).toBeTruthy();
    });

    const searchInput: ReactTestInstance | null = getByTestId('searchInput');

    if (searchInput) fireEvent.changeText(searchInput, 'laptop');

    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });

    const backFromSearchToFeed: ReactTestInstance | null = getByTestId(
      'backFromSearchToFeed',
    );

    if (backFromSearchToFeed) fireEvent.press(backFromSearchToFeed);

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
afterEach(() => {
  // Tear down global state or variables
  jest.clearAllMocks();
});
