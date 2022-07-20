import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FilterOptionComponent, {
  FILTER_ITEMS,
} from '../components/atoms/FilterOptionComponent';
import ItemSearchComponent from '../components/atoms/ItemSearchComponent';
import { COLORS } from '../constants/theme';

const FeedScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(FILTER_ITEMS[0].id);
  const handleChangeFilter = (id) => {
    setSelectedFilter(id);
  };
  return (
    <View style={styles.feed}>
      <ItemSearchComponent />
      <FlatList
        data={FILTER_ITEMS}
        contentContainerStyle={styles.option_flatlist}
        renderItem={({ item }) => (
          <FilterOptionComponent
            item={item}
            selectedFilter={selectedFilter}
            handleChangeFilter={handleChangeFilter}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
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
    marginTop: 20,
    height: 80,
  },
});
export default FeedScreen;
