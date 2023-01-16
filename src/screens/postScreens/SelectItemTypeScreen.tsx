import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AnimatedComponent from '../../components/molecules/Animation/AnimatedComponent';
import character3 from '../../assets/images/character3.png';
import object2 from '../../assets/images/object4.png';
import AnimatedObject from '../../components/molecules/Animation/AnimatedObject';
import { COLORS, FONTS } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddItemDetailsScreenStatus } from '../../redux/slices/sreenSilce';
import { useEffect } from 'react';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import NotLoggedInProfileComponent from '../../components/molecules/profile/NotLoggedInProfileComponent';
type props = {
  navigation: any;
};
const SelectItemTypeScreen: React.FC<props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const openAddItemDetailsScreen = () => {
    dispatch(
      updateAddItemDetailsScreenStatus({ addItemDetailsScreenStatus: true })
    );
    navigation.navigate('AddItemDetailsScreen');
  };

  return (
    <SafeAreaView mode="margin">
      <AnimatedObject style={{ opacity: 0.5, zIndex: 0 }} source={object2} />
      <Text
        style={[
          FONTS.body1,
          {
            alignSelf: 'center',
            margin: 10,
            zIndex: 10,
            position: 'absolute',
            opacity: 0.5,
          },
        ]}
      >
        Upload an Item
      </Text>
      <AnimatedComponent
        elevationCardStyle={{ marginTop: '70%', elevation: 0, opacity: 0.9 }}
        transparent={true}
        title="Select Item Type"
        description="Please select the type of item you want to post"
        source={character3}
        {...{
          translateDuration: 1000,
          translateRangeX: [0, 100],

          translateRange: [0, 50],
          tension: 100,
          friction: 100,
        }}
      />
      <View style={styles.but_view}>
        <TouchableOpacity
          onPress={openAddItemDetailsScreen}
          style={[styles.but, { backgroundColor: COLORS.pinkSecond }]}
        >
          <Text style={[FONTS.h2, { color: COLORS.white }]}> Lost Item </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openAddItemDetailsScreen} style={styles.but}>
          <Text style={[FONTS.h2, { color: COLORS.white }]}> Found Item </Text>
        </TouchableOpacity>
      </View>

      <AnimatedObject style={{ opacity: 1, bottom: 50 }} source={object2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  but_view: {
    width: '100%',
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 0,
    zIndex: 10,
  },
  but: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.blueSecondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    elevation: 15,
    alignSelf: 'center',
    zIndex: 10,
    marginTop: 10,
  },
});
export default SelectItemTypeScreen;
