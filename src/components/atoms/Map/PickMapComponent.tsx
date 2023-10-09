import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { COLORS, FONTS } from '../../../constants/theme';
import { webViewTemplateSelect } from './pickMapTemplate';
type props = {
  onConfirm: (coordinates: { latitude: number; longitude: number }) => void;
  coordinates: { latitude: number; longitude: number };
};
const PickMapComponent: React.FC<props> = ({ coordinates, onConfirm }) => {
  let webRef2: any = undefined;
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapCenter, setMapCenter] = useState(
    `${coordinates.longitude}, ${coordinates.latitude}`,
  );

  const onButtonPress = async () => {
    const [lng, lat] = mapCenter.split(',');

    // webRef2.injectJavaScript(
    //   `map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])`
    // );
    setIsUpdating(true);
    onConfirm({ latitude: parseFloat(lat), longitude: parseFloat(lng) });

    setIsUpdating(false);
  };

  const handleMapEvent = (event: any) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={{ flex: 5 / 6 }}>
      {/* <MapView style={styles.map}>
        <Marker
          style={{ width: 200, height: 200 }}
          draggable={true}
          coordinate={coordinates}
          onDragEnd={(e) => {
            onChange(e.nativeEvent.coordinate);
          }}
        />
      </MapView> */}
      {!isMapReady && <ActivityIndicator size="small" color={COLORS.primary} />}
      {isUpdating && <ActivityIndicator size="large" color={COLORS.primary} />}
      <WebView
        ref={r => (webRef2 = r)}
        style={styles.map}
        originWhitelist={['*']}
        source={{
          html: webViewTemplateSelect({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }),
        }}
        onLoad={() => {
          webRef2.injectJavaScript(`map.setZoom(5)`);
          webRef2.injectJavaScript(
            `map.setCenter([${coordinates.longitude}, ${coordinates.latitude}])`,
          );
          setIsMapReady(true);
        }}
        onMessage={handleMapEvent}
      />
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 20,
        }}>
        <Text style={styles.bottom_text}>
          Long press on the marker and drag it to the desired location
        </Text>

        <TouchableOpacity style={styles.confirm_btn} onPress={onButtonPress}>
          <Text style={[FONTS.h2, { color: COLORS.white }]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  bottom_text: {
    ...FONTS.body3,
    margin: 5,
    fontWeight: '900',
    textAlign: 'justify',
  },
  confirm_btn: {
    backgroundColor: COLORS.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
export default PickMapComponent;
