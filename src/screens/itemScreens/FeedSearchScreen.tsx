import React from 'react';
import { StyleSheet, Text, View, FlatList, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemSearchComponent from '../../components/atoms/ItemSearchComponent';
import { Ionicons } from '../../constants/icons';
import { COLORS } from '../../constants/theme';

export type props = {
  navigation?: any;
};

const FeedSearchSceen: React.FC<props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.search_header}>
        <View>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={35}
          />
        </View>
        <View style={styles.item_search_input}>
          <ItemSearchComponent
            navigation={navigation}
            isItemScreenClick={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_search_input: {
    width: '90%',
  },
});
export default FeedSearchSceen;
