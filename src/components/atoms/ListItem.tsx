import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '../../constants/icons';
import { ITEMCAT_TO_NUM } from '../../constants/item';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { FilterItemOn } from '../../interfaces';
interface Props extends FilterItemOn {
  text: string;
  viewAllHandler: () => void;
}

const ListItemType1: React.FC<Props> = ({ text, ...rest }) => {
  return (
    <View>
      <View style={styles.list_item}>
        <View style={styles.text}>
          <Text style={{ margin: 5, ...FONTS.h4 }}>{text}</Text>
        </View>
        <View style={styles.view_all}>
          <Text style={FONTS.h4} onPress={rest.viewAllHandler}>
            View all
          </Text>
          <Ionicons
            style={{ margin: 5, ...FONTS.h1 }}
            name="chevron-forward"
            size={30}
          />
        </View>
        {rest?.category !== undefined && rest?.category !== '' && (
          <Text>{rest?.category}</Text>
        )}
      </View>

      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: COLORS.lightGrayPrimary,
          elevation: 1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  list_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: 5,
    alignItems: 'center',
  },
  text: {},
  view_all: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 5,
  },
});

export { ListItemType1 };
