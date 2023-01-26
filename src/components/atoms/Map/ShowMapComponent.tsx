import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { webViewTemplate } from './showMapTemplate';
type props = {
  latitude: number;
  longitude: number;
};
const ShowMapComponent: React.FC<props> = ({ latitude, longitude }) => {
  let webRef: any = undefined;

  return (
    <View style={{ flex: 1 }}>
      {/* <MapView
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView> */}
      <WebView
        ref={(r) => (webRef = r)}
        style={styles.map}
        originWhitelist={['*']}
        source={{
          html: webViewTemplate({ latitude: latitude, longitude: longitude }),
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
