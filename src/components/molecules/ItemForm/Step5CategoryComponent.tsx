import { FormikProps } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';

import { ITEMCAT_TO_NUM } from '../../../constants/item';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import MiniItemTextIcon from '../../atoms/Item/MiniItemTextIcon';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};
const Step5CategoryComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  setFieldValue,
  errors,
}) => {
  const categories = useMemo(() => {
    const categories: [string, number][] = [];
    for (const element of ITEMCAT_TO_NUM.entries()) {
      categories.push(element);
    }
    return categories;
  }, [ITEMCAT_TO_NUM]);
  useEffect(() => {
    isValidHandler(!errors.category);
  }, [errors.category]);

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
      }}>
      <View style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
        <Text style={{ ...FONTS.h1 }}>
          Select{' '}
          <Text style={{ color: COLORS.redPrimary, fontSize: 31 }}>
            Category
          </Text>{' '}
          of the Item{' '}
        </Text>
      </View>
      <View style={{ margin: 10, marginBottom: 120 }}>
        <AnimationTranslateScale
          translateRange={[0, 0]}
          translateDuration={500}
          scaleRange={[0.8, 0.9]}
          scaleDuration={100}
          translateRangeX={[500, 20]}
          tension={100}
          friction={1000}>
          <FlatList
            data={categories}
            contentContainerStyle={{
              display: 'flex',
              paddingBottom: 10,
              width: '100%',
            }}
            numColumns={2}
            renderItem={({ item }) => (
              <MiniItemTextIcon
                isSelected={values?.category === item[0]}
                text={item[0]}
                updateItemFilterOption={() =>
                  setFieldValue('category', item[0])
                }
              />
            )}
            keyExtractor={item => {
              return item[0].toString();
            }}
          />
        </AnimationTranslateScale>
      </View>
    </View>
  );
};

export default Step5CategoryComponent;
