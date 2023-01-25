import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
type props = {
  latitude: number;
  longitude: number;
};
const ShowMapComponent: React.FC<props> = ({ latitude, longitude }) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
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
      </MapView>
      {/* <LeafletView
        mapCenterPosition={[latitude, longitude]}
        // The rest of your props, see the list below
      /> */}
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
