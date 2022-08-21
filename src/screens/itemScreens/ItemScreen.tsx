import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FilterOptionComponent, {
  FILTER_ITEMS,
} from '../../components/atoms/FilterOptionComponent';
import ItemSearchComponent from '../../components/atoms/ItemSearchComponent';
import CardsComponent from '../../components/molecules/CardsComponent';
import { COLORS } from '../../constants/theme';

export type props = {
  navigation: any;
};
const ItemScreen: React.FC<props> = ({ navigation }) => {
  const [selectedFilterId, setSelectedFilterId] = useState(FILTER_ITEMS[0].id);
  const handleChangeFilter = (id: number) => {
    setSelectedFilterId(id);
  };
  return (
    <View style={styles.feed}>
      <View style={styles.item_search_input}>
        <ItemSearchComponent navigation={navigation} isItemScreenClick={true} />
      </View>
      <View>
        <FlatList
          data={FILTER_ITEMS}
          contentContainerStyle={styles.option_flatlist}
          renderItem={({ item }) => (
            <FilterOptionComponent
              item={item}
              selectedFilterId={selectedFilterId}
              handleChangeFilter={handleChangeFilter}
            />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
        />
      </View>
      <View>
        <CardsComponent />
      </View>
    </View>
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
    justifyContent: 'space-evenly',
    width: '100%',
    margin: 5,
    height: 80,
  },
  item_search_input: {
    margin: 5,
    marginTop: 10,
  },
});
export default ItemScreen;
