import { FormikProps } from 'formik';
import { View, Text } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import React, { useEffect, useMemo } from 'react';
import { ITEMCAT_TO_NUM } from '../../../constants/item';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
import MiniItemColorIcon from '../../atoms/MiniItemColorIcon';
import MiniItemTextIcon from '../../atoms/MiniItemTextIcon';
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
    let categories: Array<[string, number]> = [];
    for (let element of ITEMCAT_TO_NUM.entries()) {
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
      }}
    >
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
          scaleRange={[1, 1]}
          scaleDuration={100}
          translateRangeX={[500, 0]}
          tension={100}
          friction={1000}
        >
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
            keyExtractor={(item) => {
              return item[0].toString();
            }}
          />
        </AnimationTranslateScale>
      </View>
    </View>
  );
};

export default Step5CategoryComponent;
