import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
import { logoutUser } from '../../redux/services/auth-service';
export type props = {
  navigation: any;
};
const LogoutButtonComponent: React.FC<props> = ({ navigation }) => {
  const logOutUser = () => {
    logoutUser();
    navigation.replace('Auth');
  };
  return (
    <TouchableOpacity style={styles.btn} onPress={logOutUser}>
      <AntDesign name="logout" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: 10,
    backgroundColor: COLORS.white,
    width: 50,
  },
});
export default LogoutButtonComponent;
