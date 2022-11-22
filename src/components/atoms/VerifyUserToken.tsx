import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
import {
  logoutUser,
  useUserVerifyResetPasswordQuery,
} from '../../redux/services/auth-service';
export type props = {
  navigation: any;
  credentials: { email: string; token: string };
};
const VerifyUserToken: React.FC<props> = ({ navigation, credentials }) => {
  const {
    data: isUserTokenValid,
    error,
    isLoading,
  } = useUserVerifyResetPasswordQuery(credentials);
  console.log('Valid?', isUserTokenValid);
  if (isUserTokenValid) {
    return null;
  }
  return (
    <View>
      <Text>Token Expired</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: 10,
    backgroundColor: COLORS.white,
    width: 50,
  },
});
export default VerifyUserToken;
