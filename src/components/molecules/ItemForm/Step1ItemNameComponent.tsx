import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
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
        translateRange={[500, 0]}
        translateDuration={500}
        scaleRange={[0.5, 1]}
        scaleDuration={1000}>
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
    width: '100%',
    fontFamily: 'Roboto_400Regular',
    backgroundColor: COLORS.lightGrayPrePrimary,
    alignSelf: 'center',
    marginTop: 100,
    height: 100,
    borderRadius: 10,
    padding: 20,
    fontSize: 55,
    fontWeight: '900',
  },
});

export default Step1ItemNameComponent;
