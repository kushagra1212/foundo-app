import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { Feather } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
import { resetPosts } from '../../redux/slices/postSlice';
export type props = {
  navigation?: any;
  handleOnFocus?: () => void;
  registerString?: (searchString: string) => void;
};
const ItemSearchComponent: React.FC<props> = ({
  handleOnFocus,
  registerString,
  navigation,
}) => {
  useEffect(() => {
    //dispatch(resetPosts());
  }, []);
  return (
    <View style={styles.item_search}>
      <Feather name="search" size={25} />
      <TextInput
        style={[styles.item_text_ip, FONTS.body3]}
        placeholder="Search Items here.."
        onFocus={handleOnFocus}
        autoFocus={true}
        onChangeText={registerString}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item_search: {
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 100,
    margin: 5,
    borderRadius: 10,
  },
  item_text_ip: {
    marginLeft: 10,
    width: '90%',
  },
});
export default ItemSearchComponent;
