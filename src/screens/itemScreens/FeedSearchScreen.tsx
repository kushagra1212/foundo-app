import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';

import searchItemImg from '../../assets/images/searchitem.png';
import ElevatedCard from '../../components/atoms/ElevatedCard';
import ItemSearchComponent from '../../components/atoms/ItemSearchComponent';
import AnimationTranslateScale from '../../components/molecules/Animation/AnimationTranslateScale';
import CardsComponent from '../../components/molecules/Item/Card/CardsComponent';
import SingleCardComponent from '../../components/molecules/Item/Card/SingleCardComponent';
import { Ionicons } from '../../constants/icons';
import { FONTS } from '../../constants/theme';
import { Post } from '../../interfaces';
import { useGetSearchedPostsMutation } from '../../redux/services/post-service';
import {
  selectFilterType,
  selectLimit,
  selectOffset,
  selectPosts,
  updateFilter,
  updatePosts,
} from '../../redux/slices/postSlice';
import { updateFeedSearchScreenStatus } from '../../redux/slices/sreenSilce';
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
  const posts: Post[] = useSelector(selectPosts);
  const filterType = useSelector(selectFilterType);
  const limit = useSelector(selectLimit);
  const offset = useSelector(selectOffset);

  const [getSearchedPosts, { isLoading }] = useGetSearchedPostsMutation();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [totalPosts, setTotalPosts] = useState<null | number>(null);

  const [postFound, setPostFound] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    setPostFound(true);
    if (loading) return;
    setLoading(true);
    try {
      const res = await getSearchedPosts({
        offset,
        limit,
        searchString,
      }).unwrap();
      setTotalPosts(res.total);
      dispatch(updatePosts({ offset: offset + limit, posts: res.items }));
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
  const onPressBack = (): boolean | null | undefined => {
    dispatch(
      updateFeedSearchScreenStatus({
        feedSearchScreenStatus: false,
      }),
    );
    dispatch(updateFilter({ filterType: !filterType }));
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    let flag: boolean = true;
    if (flag) {
      setReachedEnd(false);
      setPostFound(true);
      setTotalPosts(null);
    }

    BackHandler.addEventListener('hardwareBackPress', onPressBack);

    dispatch(updateFilter({ filterType }));
    let timer: NodeJS.Timeout;
    if (flag && searchString !== '') {
      timer = setTimeout(() => {
        fetchPosts();
      }, 500);
    }

    return () => {
      flag = false;
      clearTimeout(timer);
      BackHandler.removeEventListener('hardwareBackPress', onPressBack);
    };
  }, [searchString]);
  const handleOnFocus = () => {};
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={styles.search_header}>
        <TouchableOpacity onPress={onPressBack} testID="backFromSearchToFeed">
          <Ionicons name="arrow-back" size={35} />
        </TouchableOpacity>
        <View style={styles.item_search_input}>
          <ItemSearchComponent
            handleOnFocus={handleOnFocus}
            navigation={navigation}
            registerString={registerString}
          />
        </View>
      </View>
      {totalPosts !== null && (
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={FONTS.body3}>
            We've found {totalPosts} Posts for you ❤️
          </Text>
        </View>
      )}
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              marginTop: 0,
            }}>
            <LinearGradient
              colors={[
                '#FFFFFF00',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
              ]}
              style={{
                flex: 1,
                borderRadius: 5,
              }}></LinearGradient>
          </View>
        }>
        <CardsComponent
          fetchPosts={fetchPosts}
          loading={loading}
          postFound={postFound}
          posts={posts}
          reachedEnd={reachedEnd}
          navigation={navigation}
          SingleCardComponent={SingleCardComponent}
        />
      </MaskedView>

      {searchString === '' && (
        <View style={{ width: '100%', height: '100%' }}>
          <AnimationTranslateScale scaleRange={[1, 1.3]} scaleDuration={500}>
            <Image
              source={searchItemImg}
              style={{
                width: 500,
                height: 500,
                position: 'absolute',
                zIndex: 0,
                right: 1,
              }}
            />
          </AnimationTranslateScale>
          <ElevatedCard
            title="Search anything"
            description={`by name, brand, city, color, category`}
          />
        </View>
      )}
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
