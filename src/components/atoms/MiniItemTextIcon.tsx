import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

type Props = {
  isSelected: boolean;
  text: string;
};
const MiniItemTextIcon: React.FC<Props> = ({ isSelected, text }) => {
  return (
    <View
      style={{
        ...styles.btn,
        ...(isSelected ? styles.selected_btn : styles.not_selected_btn),
      }}
    >
      <Text
        style={{
          ...FONTS.h4,
          ...(isSelected ? { color: COLORS.white } : { color: COLORS.black }),
        }}
      >
        {text}
      </Text>
      {isSelected ? (
        <AntDesign
          style={
            isSelected
              ? { color: COLORS.white, fontWeight: '500' }
              : { color: COLORS.black, fontWeight: '500' }
          }
          name="check"
          size={20}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    color: COLORS.black,
    elevation: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
  },
  selected_btn: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
  },
  not_selected_btn: {
    backgroundColor: COLORS.white,
  },
});

export default MiniItemTextIcon;
