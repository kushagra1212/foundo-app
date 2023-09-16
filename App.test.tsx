import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('should renders correctly', async () => {
    await renderer.act(async () => {
      renderer.create(<App />);
    });
  });
});
