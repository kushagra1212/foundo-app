import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import { ReactTestInstance } from 'react-test-renderer';

import Error from '../../components/Error';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import ItemScreen from './ItemScreen';

const navigation = {
  navigate: jest.fn(),
};

const ItemScreenRender = () => (
  <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
    <Provider store={store}>
      <ItemScreen navigation={navigation} />
    </Provider>
  </ErrorBoundary>
);
describe('<ItemScreen />', () => {
  it('should flat list render correctly', async () => {
    const { getByTestId } = render(<ItemScreenRender />);

    await waitFor(() => {
      expect(getByTestId('card-list')).toBeTruthy();
    });
  });
  it('should find the button with text lost and click', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <ItemScreen navigation={navigation} />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Lost')).toBeTruthy();
    });
    const parent: ReactTestInstance | null = getByText('Lost').parent;

    if (parent) fireEvent.press(parent);
    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
  });

  it('should find the button with text found and click', async () => {
    const { getByText, getAllByText } = render(<ItemScreenRender />);
    await waitFor(() => {
      expect(getByText('Found')).toBeTruthy();
    });
    const parent: ReactTestInstance | null = getByText('Found').parent;

    if (parent) fireEvent.press(parent);
    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
  });

  it('should find the card with text posted by at the bottom', async () => {
    const { getByText, getAllByText } = render(<ItemScreenRender />);
    await waitFor(() => {
      expect(getByText('Found')).toBeTruthy();
    });
    const parent: ReactTestInstance | null = getByText('Found').parent;

    if (parent) fireEvent.press(parent);
    await waitFor(() => {
      expect(getAllByText('posted by')).toBeTruthy();
    });
  });

  it('should find the button View and click and then find the button named Contact Owner', async () => {
    const { getByText, getAllByText } = render(<ItemScreenRender />);
    await waitFor(() => {
      expect(getByText('Lost')).toBeTruthy();
    });
    const lostParent: ReactTestInstance | null = getByText('Lost').parent;

    if (lostParent) fireEvent.press(lostParent);

    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
    const viewParent: ReactTestInstance | null = getAllByText('View')[0].parent;

    if (viewParent) fireEvent.press(viewParent);

    await waitFor(() => {
      expect(getByText('Contact Owner')).toBeTruthy();
    });
  }, 20000);

  it('should find the button View and click and then find the button named See on map', async () => {
    const { getByText, getAllByText } = render(<ItemScreenRender />);
    await waitFor(() => {
      expect(getByText('Lost')).toBeTruthy();
    });
    const lostParent: ReactTestInstance | null = getByText('Lost').parent;

    if (lostParent) fireEvent.press(lostParent);

    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
    const viewParent: ReactTestInstance | null = getAllByText('View')[0].parent;

    if (viewParent) fireEvent.press(viewParent);

    await waitFor(() => {
      expect(getByText('See on map')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText('See on map')).toBeTruthy();
    });
  }, 20000);

  it('should show the additonal filter option', async () => {
    const { getByTestId } = render(<ItemScreenRender />);

    await waitFor(() => {
      expect(getByTestId('additional-filter-option')).toBeTruthy();
    });
  });

  it('should click on the additonal filter option and show the modal', async () => {
    const { getByTestId, getByText } = render(<ItemScreenRender />);

    await waitFor(() => {
      expect(getByTestId('additional-filter-option')).toBeTruthy();
    });

    const additionalFilterOption: ReactTestInstance | null = getByTestId(
      'additional-filter-option',
    );

    if (additionalFilterOption) fireEvent.press(additionalFilterOption);

    await waitFor(() => {
      expect(getByText('Filter')).toBeTruthy();
    });
    expect(getByText('Brand')).toBeTruthy();

    expect(getByText('Category')).toBeTruthy();

    expect(getByText('Color')).toBeTruthy();

    expect(getByText('View All')).toBeTruthy();

    expect(getByText('Color')).toBeTruthy();

    const slideDownButtonColor: ReactTestInstance | null = getByTestId(
      'slideDownButtonColor',
    );

    if (slideDownButtonColor) fireEvent.press(slideDownButtonColor);

    await waitFor(() => {
      expect(getByText('Black')).toBeTruthy();
      expect(getByText('gray')).toBeTruthy();
    });
    const viewAllButtonCategory: ReactTestInstance | null = getByTestId(
      'viewAllButtonCategory',
    );

    if (viewAllButtonCategory) fireEvent.press(viewAllButtonCategory);

    await waitFor(() => {
      expect(getByText('mobile phone')).toBeTruthy();
      expect(getByText('tablets')).toBeTruthy();
    });

    const laptop: ReactTestInstance | null = getByTestId('laptop');

    if (laptop) fireEvent.press(laptop);

    const Add: ReactTestInstance | null = getByText('Add').parent;

    if (Add) fireEvent.press(Add);
  });

  it('should check and click the searchButton', async () => {
    const { getByTestId } = render(<ItemScreenRender />);

    await waitFor(() => {
      expect(getByTestId('searchButton')).toBeTruthy();
    });

    const searchButton: ReactTestInstance | null = getByTestId('searchButton');

    if (searchButton) fireEvent.press(searchButton);
    expect(navigation.navigate).toHaveBeenCalledWith('FeedSearchScreen');
  });
  it('should scroll the flat list', async () => {
    const { getByTestId } = render(<ItemScreenRender />);

    await waitFor(() => {
      expect(getByTestId('card-list')).toBeTruthy();
    });
  });
});
