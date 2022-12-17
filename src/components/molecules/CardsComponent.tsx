import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { COLORS } from '../../constants/theme';
export type props = {};
import { ITEMS } from '../../Dummy/constants';
import { useGetPostsQuery } from '../../redux/services/post-service';
import SingleCardComponent from '../atoms/SingleCardComponent';
const CardsComponent: React.FC<props> = ({ }) => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery({ offset: 0, limit: 10 });
  console.log("POST", posts)
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={posts}
      renderItem={({ item }) => (<SingleCardComponent item={item} />)}
      ListFooterComponent={() => <View style={{ backgroundColor: COLORS.blueSecondary }}><Text>Footer</Text></View>}
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    backgroundColor: COLORS.redPrimary,
  },
});
export default CardsComponent;
