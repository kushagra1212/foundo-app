import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../../constants/theme';
type props = {
  phoneNumber: string;
};
const PhoneNumberComponent: React.FC<props> = ({ phoneNumber }) => {
  const verifyEmailHandler = () => {};
  return (
    <View style={styles.view}>
      <Text
        style={{ ...FONTS.h3, margin: 20, opacity: 0.7, textAlign: 'center' }}
      >
        {phoneNumber}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>We've noticed that you haven't varified your email </Text>
      </View>
      <TouchableOpacity
        style={styles.verify_email_but}
        onPress={verifyEmailHandler}
      >
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  verify_email_but: {
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
export default PhoneNumberComponent;
