import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import { SCREEN_WIDTH } from '../../../utils';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};
const Step7BrandandCityComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  errors,
}) => {
  useEffect(() => {
    isValidHandler(
      !errors.brand &&
        values.brand.trim().length > 0 &&
        !errors.city &&
        values.city.trim().length > 0,
    );
  }, [errors.brand, errors.city]);

  return (
    <View style={styles.main_container}>
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Text style={{ ...FONTS.h1 }}>
          Write <Text style={{ color: COLORS.primary }}>Brand </Text>
          of the Item and{' '}
          <Text style={{ color: COLORS.redPrimary }}> City </Text>
          from where you are{' '}
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
        <View style={styles.input_container}>
          <TextInput
            focusable={true}
            autoFocus={true}
            maxLength={13}
            style={styles.input}
            placeholder="Brand"
            onChangeText={handleChange('brand')}
            onBlur={handleBlur('brand')}
            value={values.brand}
            keyboardType="ascii-capable"
          />
          <TextInput
            style={styles.input}
            focusable={true}
            placeholder="City"
            maxLength={13}
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            value={values.city}
            keyboardType="ascii-capable"
          />
        </View>
      </AnimationTranslateScale>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    marginTop: '10%',
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 0,
    height: SCREEN_WIDTH * 0.5,
  },
  input: {
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
  },
});

export default Step7BrandandCityComponent;
