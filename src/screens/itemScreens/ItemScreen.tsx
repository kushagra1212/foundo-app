import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import FilterOptionComponent, {
  FILTER_ITEMS,
} from '../../components/atoms/FilterOptionItem';
import ItemSearchComponent from '../../components/atoms/ItemSearchComponent';
import LogoutButtonComponent from '../../components/atoms/LogoutButtonComponent';
import AdditionalFilterOptionComponent from '../../components/molecules/AditionalFilterOptionComponent.tsx';
import CardsComponent from '../../components/molecules/CardsComponent';
import { COLORS } from '../../constants/theme';
import { FilterItemOn } from '../../interfaces';
import { filterItemOnInitial } from '../../interfaces/initials';
import { selectFilterType, updateFilter } from '../../redux/slices/postSlice';
import FilterItemComponent from '../../components/molecules/FilterItemComponent';
import BottomModal from '../../components/molecules/BottomModal';

export type props = {
  navigation: any;
};
const ItemScreen: React.FC<props> = ({ navigation }) => {

  const filterType = useSelector(selectFilterType);
  const [itemFilterOption, setItemFilterOption] = useState<FilterItemOn>(filterItemOnInitial)
  const [backgroundFilter, setBackgroundFilter] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleChangeFilter = (id: number) => {
    dispatch(updateFilter({ filterType: id }));
  };
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalClose = () => {
    setBackgroundFilter(false);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 10)
  };
  const onModalOpen = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setBackgroundFilter(true);
    }, 200)
  }
  const updateItemFilterOption = (options: FilterItemOn): void => {
    setItemFilterOption(options);
  }
  return (
    <SafeAreaView style={styles.feed}>
      <View style={styles.item_search_input}>
        <ItemSearchComponent navigation={navigation} isItemScreenClick={true} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FlatList
          data={FILTER_ITEMS}
          contentContainerStyle={styles.option_flatlist}
          renderItem={({ item }) => (
            <FilterOptionComponent
              item={item}
              selectedFilterId={filterType}
              handleChangeFilter={handleChangeFilter}
            />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
        />
        <AdditionalFilterOptionComponent onModalOpen={onModalOpen} isFilterOptionSelected={JSON.stringify(itemFilterOption) !== JSON.stringify(filterItemOnInitial)} />
      </View>
      <BottomModal backgroundFilter={backgroundFilter} isVisible={isModalVisible} onClose={onModalClose} >
        <FilterItemComponent updateItemFilterOption={updateItemFilterOption} />
      </BottomModal >
      <CardsComponent itemFilterOption={itemFilterOption} />
      {/* <View>
        <LogoutButtonComponent navigation={navigation} />
      </View> */}
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  feed: {
    backgroundColor: COLORS.lightGrayPrePrimary,
    width: '100%',
    height: '100%',
  },
  option_flatlist: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    margin: 5,
    height: 60,
  },
  item_search_input: {
    margin: 5,
  },
});
export default ItemScreen;
