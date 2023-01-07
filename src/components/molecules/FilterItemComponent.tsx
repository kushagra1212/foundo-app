import { View, Text, StyleSheet, TextInput, BackHandler } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { FilterItemOn } from '../../interfaces';
import {
  ListFilterItemSlideDownInput,
  ListFilterItemSlideDownList,
  ListFilterItemViewAllType,
} from '../atoms/ListItem';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '../../constants/icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ITEMCAT_TO_NUM } from '../../constants/item';
import MiniItemTextIcon from '../atoms/MiniItemTextIcon';
import { filterItemOnInitial } from '../../interfaces/initials';
import BottomModal from './BottomModal';
type Props = {
  updateItemFilterOption: (options: FilterItemOn) => void;
  options: FilterItemOn;
  onModalClose: () => void;
};
const FilterItemComponent: React.FC<Props> = ({
  updateItemFilterOption,
  options,
  onModalClose,
}) => {
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [slideDownButton, setSlideDownButton] = useState<boolean>(false);
  const categories = useMemo(() => {
    let categories: Array<[string, number]> = [];
    for (let element of ITEMCAT_TO_NUM.entries()) {
      categories.push(element);
    }
    return categories;
  }, [ITEMCAT_TO_NUM]);

  const viewAllHandler = () => {
    setViewAll(!viewAll);
  };
  const closeModal = () => {
    updateItemFilterOption({ category: '' });
    setViewAll(!viewAll);
  };
  const handleChangeSlideDownButton = () => {
    setSlideDownButton(!slideDownButton);
  };
  const getItems = () => {
    onModalClose();
  };
  // const onPressBack = (): boolean | null | undefined => {
  //   onModalClose();
  //   return true;
  // };
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', onPressBack);

  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', onPressBack);
  //   };
  // }, []);
  console.log(options);
  return (
    <View>
      <ListFilterItemViewAllType
        text="Category"
        items={options.category}
        viewAllHandler={viewAllHandler}
        arrowText="View All"
      />
      <ListFilterItemSlideDownList
        text="Color"
        category={options.color}
        handleChangeSlideDownButton={handleChangeSlideDownButton}
        options={options}
        updateItemFilterOption={updateItemFilterOption}
      />
      <ListFilterItemSlideDownInput
        options={options}
        handleChangeSlideDownButton={() => {}}
        text="Brand"
        desc="write brand name"
        updateItem={updateItemFilterOption}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: 10,
        }}
        onTouchStart={() =>
          updateItemFilterOption({
            latest:
              options.latest === 'undefined'
                ? '1'
                : options.latest === '1'
                ? '0'
                : '1',
          })
        }
      >
        <AntDesign
          style={{
            backgroundColor: COLORS.white,
            width: 35,
            elevation: 5,
            borderRadius: 5,
            color: COLORS.primary,
            borderWidth: 1,
            ...(options.latest === undefined || options.latest === '0'
              ? { color: COLORS.GrayPrimary }
              : {}),
          }}
          name="check"
          size={35}
        />
        <Text
          style={{
            marginLeft: 10,
            ...FONTS.body3,
            ...(options.latest === undefined || options.latest === '0'
              ? { color: COLORS.GrayPrimary }
              : {}),
          }}
        >
          Get Lastest At Top
        </Text>
      </View>
      <View
        style={{
          ...styles.btn_active,
          ...(JSON.stringify(options) === JSON.stringify(filterItemOnInitial)
            ? { backgroundColor: COLORS.GraySecondary }
            : {}),
        }}
        onTouchStart={() =>
          JSON.stringify(options) === JSON.stringify(filterItemOnInitial)
            ? () => {}
            : getItems()
        }
      >
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Find</Text>
      </View>
      <BottomModal
        backgroundFilter={false}
        isVisible={viewAll}
        onClose={closeModal}
        effect="fade"
      >
        <View style={styles.view_container}>
          <FlatList
            data={categories}
            contentContainerStyle={{
              margin: 5,
              paddingBottom: 50,
            }}
            numColumns={2}
            renderItem={({ item }) => (
              <MiniItemTextIcon
                isSelected={options?.category === item[0]}
                text={item[0]}
                updateItemFilterOption={updateItemFilterOption}
              />
            )}
            keyExtractor={(item) => {
              return item[0].toString();
            }}
          />
          <View
            style={{
              ...styles.btn_active,
              ...(options.category !== ''
                ? {}
                : { backgroundColor: COLORS.GraySecondary }),
            }}
            onTouchStart={options.category !== '' ? viewAllHandler : () => ({})}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.h3,
                fontWeight: '600',
              }}
            >
              Add
            </Text>
          </View>
        </View>
      </BottomModal>
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
    backgroundColor: COLORS.blueSecondary,
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 10,
    marginBottom: 100,
  },
});

export default FilterItemComponent;
