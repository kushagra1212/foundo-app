import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import ItemSearchComponent from '../../components/atoms/ItemSearchComponent';
import LogoutButtonComponent from '../../components/atoms/LogoutButtonComponent';

import { Ionicons } from '../../constants/icons';
import { Post } from '../../interfaces';
import { useGetSearchedPostsMutation } from '../../redux/services/post-service';
import {
  selectFilterType,
  selectOffsetAndLimit,
  selectPosts,
  updateFilter,
  updatePosts,
} from '../../redux/slices/postSlice';

export type props = {
  navigation?: any;
};
const debounce = (fetchPostsHandle: Function, time: number) => {
  let timer: boolean = true;
  return () => {
    if (timer) {
      timer = false;
      setTimeout(() => {
        fetchPostsHandle();
        timer = true;
      }, time);
    }
  };
};
const FeedSearchSceen: React.FC<props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState<string>('');
  const posts: Array<Post> = useSelector(selectPosts);
  const filterType = useSelector(selectFilterType);
  const { limit, offset } = useSelector(selectOffsetAndLimit);
  const [getSearchedPosts, { isLoading }] = useGetSearchedPostsMutation();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const [postFound, setPostFound] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    setPostFound(true);
    if (loading) return;
    setLoading(true);
    try {
      const res = await getSearchedPosts({
        offset: offset,
        limit,
        searchString,
      }).unwrap();
      console.log(res.total);
      // dispatch(updatePosts({ offset: offset + limit, posts: res.items }));
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      setReachedEnd(true);
      if (posts.length !== 0)
        Toast.show({
          type: 'success',
          props: {
            text: `You've seen it all`,
            message: null,
          },
        });
      else setPostFound(false);
    }
  };

  const registerString = (value: string) => {
    setSearchString(value);
  };
  const fet = debounce(fetchPosts, 5000);

  useEffect(() => {
    setReachedEnd(false);

    let flag: boolean = true;
    if (flag && searchString !== '') fet();

    return () => {
      flag = false;
    };
  }, [searchString]);
  const handleOnFocus = () => {};
  return (
    <SafeAreaView>
      <View style={styles.search_header}>
        <View>
          <Ionicons
            onPress={() => {
              dispatch(updateFilter({ filterType: filterType }));
              navigation.replace('ItemScreen');
            }}
            name="arrow-back"
            size={35}
          />
        </View>
        <View style={styles.item_search_input}>
          <ItemSearchComponent
            handleOnFocus={handleOnFocus}
            navigation={navigation}
            registerString={registerString}
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
