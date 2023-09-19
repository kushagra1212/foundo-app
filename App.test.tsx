import { render, waitFor } from '@testing-library/react-native';

import App from './App';

describe('<App />', () => {
  let AppRender: React.ReactElement;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    AppRender = <App />;
  });

  it('should renders correctly', async () => {
    const { getByText } = render(AppRender);

    await waitFor(() => {
      expect(getByText('Find Things you Lost')).toBeTruthy();
    });
  });
  afterEach(() => {
    // Tear down global state or variables
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
});
