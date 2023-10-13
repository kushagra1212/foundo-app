import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};
const Step1ItemNameComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  errors,
}) => {
  useEffect(() => {
    isValidHandler(!errors.itemName && values.itemName.trim().length > 0);
  }, [errors.itemName]);

  return (
    <View style={styles.item_name_header}>
      <View style={{}}>
        <Text style={{ ...FONTS.h1 }}>
          Write <Text style={{ color: COLORS.primary }}>Name</Text> of the Item{' '}
        </Text>
      </View>
      <AnimationTranslateScale
        translateRange={[0, 0]}
        translateDuration={500}
        scaleRange={[0.8, 0.9]}
        scaleDuration={100}
        translateRangeX={[500, 0]}
        tension={100}
        friction={1000}>
        <View>
          <TextInput
            focusable={true}
            autoFocus={true}
            style={styles.item_name_input}
            placeholder="Item Name"
            onChangeText={handleChange('itemName')}
            onBlur={handleBlur('itemName')}
            value={values.itemName.substring(0, 14)}
            keyboardType="email-address"
            testID="itemNameInput"
          />
        </View>
      </AnimationTranslateScale>
    </View>
  );
};

const styles = StyleSheet.create({
  item_name_header: {
    marginTop: '10%',
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item_name_input: {
    fontFamily: 'Roboto_400Regular',
    backgroundColor: COLORS.lightGraySecondary,
    fontSize: 35,
    fontWeight: '900',
    padding: 15,
    borderRadius: 20,
    width: SCREEN_WIDTH * 0.8,
    overflow: 'scroll',
    borderWidth: 1,
    borderColor: COLORS.GraySecondary,
    marginTop: SCREEN_HEIGHT * 0.1,
  },
});

export default Step1ItemNameComponent;
