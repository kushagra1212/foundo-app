import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
const LinearGradientComponent: React.FC = () => {
  return (
    <View style={styles.main_container}>
      <LinearGradient
        colors={[
          '#FFFFFF00',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
        ]}
        style={{
          flex: 1,
          borderRadius: 5,
        }}></LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: 0,
  },
});

export default LinearGradientComponent;
