import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { useState } from 'react';
import { COLORS, FONTS } from '../../../constants/theme';
import * as Location from 'expo-location';
import { ILocation } from '../../../interfaces';
import { getAddress } from '../../../utils';
type props = {
  onChange: (coordinates: { latitude: number; longitude: number }) => void;
  coordinates: { latitude: number; longitude: number };
  onConfirm: () => void;
};
const PickMapComponent: React.FC<props> = ({
  onChange,
  coordinates,
  onConfirm,
}) => {
  return (
    <View style={{ flex: 5 / 6 }}>
      <MapView style={styles.map}>
        <Marker
          style={{ width: 200, height: 200 }}
          draggable={true}
          coordinate={coordinates}
          onDragEnd={(e) => {
            onChange(e.nativeEvent.coordinate);
          }}
        />
      </MapView>
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
          onPress={onConfirm}
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
