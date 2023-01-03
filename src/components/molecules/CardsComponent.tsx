import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/theme';

import { ITEMS } from '../../Dummy/constants';
import { useGetPostsMutation } from '../../redux/services/post-service';
import {
  selectFilterType,
  selectOffsetAndLimit,
  selectPosts,
  updateFilter,
  updatePosts,
} from '../../redux/slices/postSlice';
import SingleCardComponent from '../atoms/SingleCardComponent';
import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { boolean } from 'yup';
import { FilterItemOn } from '../../interfaces';
export type props = {
  itemFilterOption: FilterItemOn;
  advFilterOn: boolean;
};
const CardsComponent: React.FC<props> = ({ itemFilterOption, advFilterOn }) => {
  const dispatch = useDispatch();
  const { limit, offset } = useSelector(selectOffsetAndLimit);
  const filterType = useSelector(selectFilterType);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const posts = useSelector(selectPosts);
  const [getPost, { isLoading }] = useGetPostsMutation();
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const posts = await getPost({
        offset: offset,
        limit,
        founded: filterType,
        ...itemFilterOption,
      }).unwrap();

      dispatch(updatePosts({ offset: offset + limit, posts: posts }));
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      setReachedEnd(true);
      Toast.show({
        type: 'success',
        props: {
          text: `You've seen it all`,
          message: null,
        },
      });
    }
  };
  const onScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
  };
  useEffect(() => {
    let flag: boolean = true;
    setReachedEnd(false);

    if (flag) {
      fetchPosts();
    }
    return () => {
      flag = true;
    };
  }, [filterType, advFilterOn]);
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <SingleCardComponent key={item.id.toString()} item={item} />
      )}
      onEndReached={reachedEnd ? null : fetchPosts}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="large" color={COLORS.greenPrimary} />
        ) : null
      }
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    backgroundColor: COLORS.GrayPrimary,
  },
});
export default CardsComponent;
