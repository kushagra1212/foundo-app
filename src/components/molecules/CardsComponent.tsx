import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/theme';
export type props = {};
import { ITEMS } from '../../Dummy/constants';
import { useGetPostsMutation } from '../../redux/services/post-service';
import { selectOffsetAndLimit, selectPosts, updatePosts } from '../../redux/slices/postSlice';
import SingleCardComponent from '../atoms/SingleCardComponent';
import { useEffect, useState } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const CardsComponent: React.FC<props> = ({ }) => {
  const dispatch = useDispatch();
  const { limit } = useSelector(selectOffsetAndLimit);
  const posts = useSelector(selectPosts);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [allPostsRecived, setAllPostRecived] = useState(false)
  const [getPost, { isLoading }] = useGetPostsMutation();
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    if (allPostsRecived || loading) return;
    setLoading(true);
    try {
      const posts = await getPost({ offset: currentOffset, limit }).unwrap();

      console.log(posts, "CARDS COMPONENT");
      setCurrentOffset(currentOffset + limit);
      dispatch(updatePosts({ offset: currentOffset + limit, posts: posts }));
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      setAllPostRecived(true);
      setLoading(false);
      Toast.show({
        type: 'success',
        props: {
          text: `You've seen it all`,
          message: null,
        },
      });
    }

  }
  const onScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    console.log(y)
  }
  useEffect(() => {
    let flag: boolean = false;
    if (currentOffset == 0) {
      fetchPosts();
    }
  }, [currentOffset])
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (<SingleCardComponent key={item.id.toString()} item={item} />)}
      onEndReached={fetchPosts}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={loading ? <ActivityIndicator
        size="large"
        color={COLORS.greenPrimary}
      /> : null}
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
