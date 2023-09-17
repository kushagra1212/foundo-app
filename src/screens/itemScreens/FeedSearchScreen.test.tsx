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
  <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
    <Provider store={store}>
      <FeedSearchSceen navigation={navigation} />
    </Provider>
  </ErrorBoundary>
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
