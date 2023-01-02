import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Formik } from 'formik';
import { COLORS, SIZES } from '../../constants/theme';
import { FilterItemOn } from '../../interfaces';
import { ListItemType1 } from '../atoms/ListItem';
import { Ionicons } from '../../constants/icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ITEMCAT_TO_NUM } from '../../constants/item';
import MiniItemTextIcon from '../atoms/MiniItemTextIcon';
type Props = {
  updateItemFilterOption: (options: FilterItemOn) => void;
};
const FilterItemComponent: React.FC<Props> = ({ updateItemFilterOption }) => {
  const [viewAll, setViewAll] = useState<boolean>(false);
  const categories = useMemo(() => {
    let categories: Array<[string, number]> = [];
    for (let element of ITEMCAT_TO_NUM.entries()) {
      categories.push(element);
    }
    return categories;
  }, [ITEMCAT_TO_NUM]);
  const viewAllHandler = () => {
    setViewAll(true);
  };
  const SaveSelected = () => {};
  if (viewAll) {
    return (
      <View style={styles.view_container}>
        <FlatList
          data={categories}
          contentContainerStyle={{
            display: 'flex',
            width: '100%',
            margin: 10,
          }}
          numColumns={2}
          renderItem={({ item }) => (
            <MiniItemTextIcon isSelected={false} text={item[0]} />
          )}
          keyExtractor={(item) => item[1].toString()}
        />
        <TouchableOpacity style={styles.btn_active} onPress={SaveSelected}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.h3,
              fontWeight: '600',
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <Formik
        initialValues={{
          category: '',
          brand: '',
          color: '',
          college: '',
          latest: '',
        }}
        onSubmit={updateItemFilterOption}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <View style={styles.formik_view}>
            {/* <TextInput
                                                style={{
                                                        width: '80%',
                                                        fontSize: 20,
                                                        fontFamily: 'Roboto_400Regular',
                                                }}
                                                placeholder="Email ID"
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.category}
                                                keyboardType="email-address"
                                        /> */}
            <ListItemType1
              text="Category"
              category={values.category}
              viewAllHandler={viewAllHandler}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  formik_view: {
    margin: 5,
  },
  view_container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.white,
  },
  btn_active: {
    backgroundColor: COLORS.primary,
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
    margin: 10,
  },
});

export default FilterItemComponent;
