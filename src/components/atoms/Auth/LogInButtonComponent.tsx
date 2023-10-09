import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONTS } from '../../../constants/theme';
type props = {
  title: string;
  navigation: any;
};
const LogInButtonComponent: React.FC<props> = ({ title, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.replace('Auth')}
      style={styles.but}>
      <Text style={[FONTS.h1, { color: COLORS.white }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  but: {
    width: '80%',
    height: 50,
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 30,
    alignSelf: 'center',
    zIndex: 10,
  },
});

export default LogInButtonComponent;
