import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { COLORS } from '../../../constants/theme';
import { webViewTemplate } from './showMapTemplate';
type props = {
  latitude: number;
  longitude: number;
};
const ShowMapComponent: React.FC<props> = ({ latitude, longitude }) => {
  let webRef: any = useRef<WebView>(null).current;
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      {!isMapReady && <ActivityIndicator size="large" color={COLORS.primary} />}
      <WebView
        ref={r => (webRef = r)}
        style={styles.map}
        originWhitelist={['*']}
        source={{
          html: webViewTemplate({ latitude, longitude }),
        }}
        onLoadEnd={() => {
          if (webRef) {
            webRef.injectJavaScript(`map.setZoom(5)`);
            setIsMapReady(true);
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
});
export default ShowMapComponent;
