import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '../../../constants/icons';
import { COLORS, SIZES } from '../../../constants/theme';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');
type Props = {
  children: JSX.Element;
  onClose: (options: any) => void;
  titleText?: string;
  refreshAvail?: boolean;
  reset?: () => void;
  height?: string | number;
  iconName?: string;
};
const FilterWrapper: React.FC<Props> = ({
  children,
  onClose,
  reset,
  iconName = 'close-circle',
  height = '80%',
  titleText = 'ssqqwew',
  refreshAvail = false,
}) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{titleText}</Text>
        {refreshAvail && (
          <Pressable onPress={reset}>
            <Ionicons
              style={{
                fontWeight: '500',
                paddingRight: 20,
              }}
              name="refresh"
              size={35}
            />
          </Pressable>
        )}
      </View>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    height: 60,
    backgroundColor: COLORS.lightGrayPrePrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    borderRadius: 50,
  },
  title: {
    fontSize: SIZES.body2,
    fontWeight: '500',
    width: '80%',
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});

export default FilterWrapper;
