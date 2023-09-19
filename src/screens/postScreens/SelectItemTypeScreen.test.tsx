import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import SelectItemTypeScreen from './SelectItemTypeScreen';

describe('<SelectItemTypeScreen />', () => {
  let SelectItemTypeScreenRender: React.ReactElement;
  let navigation: any;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    SelectItemTypeScreenRender = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <SelectItemTypeScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  it('should SelectItemTypeScreen works', async () => {
    const { getByTestId } = render(SelectItemTypeScreenRender);

    await waitFor(() => {
      expect(getByTestId('lostItemButton')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('foundItemButton')).toBeTruthy();
    });
  });

  it('should goto AddItemDetailsScreen when click on lostItemButton', async () => {
    const { getByTestId } = render(SelectItemTypeScreenRender);

    await waitFor(() => {
      expect(getByTestId('lostItemButton')).toBeTruthy();
    });

    fireEvent.press(getByTestId('lostItemButton'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('AddItemDetailsScreen', {
        isFounded: false,
      });
    });
  });
  it('should goto AddItemDetailsScreen when click on foundItemButton', async () => {
    const { getByTestId } = render(SelectItemTypeScreenRender);
    await waitFor(() => {
      expect(getByTestId('foundItemButton')).toBeTruthy();
    });

    fireEvent.press(getByTestId('foundItemButton'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('AddItemDetailsScreen', {
        isFounded: true,
      });
    });
  });
  afterEach(() => {
    // Tear down global state or variables
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
});
