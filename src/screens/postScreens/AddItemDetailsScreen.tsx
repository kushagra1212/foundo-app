import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { Ionicons } from '../../constants/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddItemDetailsScreenStatus } from '../../redux/slices/sreenSilce';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import NotLoggedInProfileComponent from '../../components/molecules/profile/NotLoggedInProfileComponent';
import character2 from '../../assets/images/character1.png';
import { COLORS } from '../../constants/theme';
import NotLoggedInComponent from '../../components/atoms/NotLoggedInComponent';
type props = {
  navigation: any;
};
const AddItemDetailsScreen: React.FC<props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const closeThisScreen = () => {
    dispatch(
      updateAddItemDetailsScreenStatus({ addItemDetailsScreenStatus: false })
    );
    navigation.goBack();
  };
  if (!user) {
    return (
      <SafeAreaView mode="margin">
        <Ionicons
          name="arrow-back"
          size={35}
          color="black"
          onPress={closeThisScreen}
        />
        <NotLoggedInComponent
          navigation={navigation}
          title="Not Logged In"
          desciption="Please login to add items"
          characterSource={character2}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <View style={{ margin: 10 }}>
        <Ionicons
          name="arrow-back"
          size={35}
          color="black"
          onPress={closeThisScreen}
        />
      </View>
      <Text> AddItemDetailsScreen </Text>
    </SafeAreaView>
  );
};

export default AddItemDetailsScreen;
