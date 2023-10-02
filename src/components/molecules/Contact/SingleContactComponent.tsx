import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '../../../constants/icons';
import { COLORS, FONTS } from '../../../constants/theme';
import { contactType } from '../../../screens/contactScreens/ContactScreen';
export type props = {
  contact: contactType;
  navigation: any;
  currentUserId: number;
};
const SingleContactComponent: React.FC<props> = ({
  contact,
  navigation,
  currentUserId,
}) => {
  const handleOpen = () => {
    navigation.navigate('ChatScreen', { contact });
  };
  contact.fk_user_Id_1 =
    contact.fk_user_Id_1 === currentUserId
      ? contact.fk_user_Id_2
      : contact.fk_user_Id_1;
  return (
    <TouchableOpacity style={styles.contact} onPress={handleOpen}>
      <View>
        <Ionicons name="ios-person-circle-sharp" size={40} color="black" />
      </View>
      <View style={styles.contact_name}>
        <Text style={FONTS.h4}>
          {contact.firstName + ' ' + contact.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contact: {
    backgroundColor: COLORS.white,
    overflow: 'scroll',
    borderRadius: 20,
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
    margin: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contact_name: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '80%',
  },
});
export default SingleContactComponent;
