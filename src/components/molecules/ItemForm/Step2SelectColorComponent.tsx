import { FormikProps } from 'formik';
import { View, Text, FlatList } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import React, { useEffect, useMemo } from 'react';
import { ITEM_STANDARD_COLORS } from '../../../constants/item';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
import MiniItemColorIcon from '../../atoms/MiniItemColorIcon';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};
const Step2SelectColorComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  setFieldValue,
  errors,
}) => {
  const colors = useMemo(() => {
    let colors: Array<[string, string]> = [];
    for (let element of ITEM_STANDARD_COLORS.entries()) {
      colors.push(element);
    }
    return colors;
  }, [ITEM_STANDARD_COLORS]);
  useEffect(() => {
    isValidHandler(!errors.color);
  }, [errors.color]);

  return (
    <View
      style={{
        marginTop: '10%',
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{}}>
        <Text style={{ ...FONTS.h1 }}>
          Select{' '}
          <Text style={{ color: COLORS.pinkPrimary, fontSize: 31 }}>Color</Text>{' '}
          of the Item{' '}
        </Text>
      </View>
      <View style={{ margin: 50, marginBottom: 60 }}>
        <AnimationTranslateScale
          translateRange={[0, 0]}
          translateDuration={500}
          scaleRange={[1, 1]}
          scaleDuration={100}
          translateRangeX={[500, 0]}
          tension={100}
          friction={1000}
        >
          <FlatList
            data={colors}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              display: 'flex',
              paddingBottom: 10,
              width: 200,
            }}
            renderItem={({ item }) => (
              <MiniItemColorIcon
                isSelected={values?.color === item[0]}
                text={item[0]}
                color={item[1]}
                onSelect={() => setFieldValue('color', item[0])}
              />
            )}
            keyExtractor={(item) => {
              return item[1].toString();
            }}
          />
        </AnimationTranslateScale>
      </View>
    </View>
  );
};

export default Step2SelectColorComponent;
