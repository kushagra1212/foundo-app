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
const Step4DesciptionComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  errors,
}) => {
  useEffect(() => {
    isValidHandler(!errors.description && values.description.trim().length > 0);
  }, [errors.description]);

  return (
    <View style={styles.main_container}>
      <View style={{}}>
        <Text style={{ ...FONTS.h1 }}>
          Write a{' '}
          <Text style={{ color: COLORS.purpleSecondary }}>Description</Text>
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
        <TextInput
          focusable={true}
          autoFocus={true}
          multiline={true}
          numberOfLines={3}
          scrollEnabled={true}
          maxLength={150}
          style={styles.input}
          placeholder="Description"
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          value={values.description.substring(0, 146)}
          keyboardType="email-address"
        />
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
  input: {
    fontFamily: 'Roboto_400Regular',
    backgroundColor: COLORS.lightGraySecondary,
    fontSize: 25,
    fontWeight: '900',
    padding: 15,
    borderRadius: 20,
    width: SCREEN_WIDTH * 0.8,
    maxHeight: SCREEN_WIDTH * 0.5,
    marginTop: 20,
    overflow: 'scroll',
    borderWidth: 1,
    borderColor: COLORS.GraySecondary,
  },
});

export default Step4DesciptionComponent;
