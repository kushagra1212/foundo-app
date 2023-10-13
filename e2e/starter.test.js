const { device, element, by, expect, waitFor } = require('detox');

describe('Home screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.setURLBlacklist(['.*127.0.0.1.*', '.*my.ignored.endpoint.*']);
  });
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Lost button should be visible', async () => {
    await expect(element(by.text('Lost'))).toBeVisible();

    await expect(element(by.text('Found'))).toBeVisible();
  });

  it('should tap on Found button', async () => {
    await element(by.text('Found')).longPress();
  });
});
