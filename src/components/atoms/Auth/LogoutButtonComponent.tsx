import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '../../../constants/icons';
import { COLORS, FONTS } from '../../../constants/theme';
import { logoutUser } from '../../../redux/services/auth-service';
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
      <MaterialIcons name="logout" size={22} />
      <Text style={{ ...FONTS.h4, marginLeft: 10 }}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    elevation: 1,
    borderStartColor: COLORS.redSecondary,
    borderRadius: 10,
  },
});
export default LogoutButtonComponent;
