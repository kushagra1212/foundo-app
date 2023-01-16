import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { Ionicons } from '../../constants/icons';
import { useDispatch } from 'react-redux';
import { updateAddItemDetailsScreenStatus } from '../../redux/slices/sreenSilce';
type props = {
  navigation: any;
};
const AddItemDetailsScreen: React.FC<props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const closeThisScreen = () => {
    dispatch(
      updateAddItemDetailsScreenStatus({ addItemDetailsScreenStatus: false })
    );
    navigation.goBack();
  };
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
