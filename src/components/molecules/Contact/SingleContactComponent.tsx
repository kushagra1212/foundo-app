import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '../../../constants/icons';
import { COLORS, FONTS } from '../../../constants/theme';
export type props = {
  contact: any;
  navigation: any;
};
const SingleContactComponent: React.FC<props> = ({ contact, navigation }) => {
  const handleOpen = () => {
    navigation.navigate('ChatScreen', { contact });
  };
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
