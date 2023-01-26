import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { COLORS, FONTS } from '../../../constants/theme';

import { WebView } from 'react-native-webview';
import { webViewTemplateSelect } from './pickMapTemplate';
type props = {
  onConfirm: (coordinates: { latitude: number; longitude: number }) => void;
  coordinates: { latitude: number; longitude: number };
};
const PickMapComponent: React.FC<props> = ({ coordinates, onConfirm }) => {
  let webRef2: any = undefined;
  const [isUpdating, setIsUpdating] = useState(false);
  let [mapCenter, setMapCenter] = useState(
    `${coordinates.longitude}, ${coordinates.latitude}`
  );

  const onButtonPress = async () => {
    const [lng, lat] = mapCenter.split(',');
    console.log(mapCenter);
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
      {isUpdating && <ActivityIndicator size="large" color={COLORS.primary} />}
      <WebView
        ref={(r) => (webRef2 = r)}
        style={styles.map}
        originWhitelist={['*']}
        source={{
          html: webViewTemplateSelect({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }),
        }}
        onMessage={handleMapEvent}
      />
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 20,
        }}
      >
        <Text
          style={[
            FONTS.body3,
            { margin: 5, fontWeight: '900', textAlign: 'justify' },
          ]}
        >
          Long press on the marker and drag it to the desired location
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.black,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}
          onPress={onButtonPress}
        >
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
});
export default PickMapComponent;
