import MaskedView from '@react-native-masked-view/masked-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import LinearGradientComponent from '../../components/atoms/Other/LinearGradientComponent';
import CardsComponent from '../../components/molecules/Item/Card/CardsComponent';
import SingleCardComponent from '../../components/molecules/Item/Card/SingleCardComponent';
import { Ionicons } from '../../constants/icons';
import { SIZES } from '../../constants/theme';
import { Post } from '../../interfaces';
import { useLazyGetPostsByPostIdsQuery } from '../../redux/services/post-service';

export type UserPostsRecommendationScreenList = {
  params: {
    data: number[][];
  };
};

export type UserPostsRecommendationScreenProps = {
  navigation: NativeStackNavigationProp<UserPostsRecommendationScreenList>;
};

const UserPostsRecommendationScreen: React.FC<
  UserPostsRecommendationScreenProps
> = ({ navigation }) => {
  const getPostIds = () => {
    return navigation
      .getState()
      .routes[1].params.data.map((element: number[]) => {
        return element[0];
      });
  };

  const [postIds, setPostIds] = useState<number[]>(getPostIds());
  const POST_LIMIT = 2;
  const [postFound, setPostFound] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [getPost, { isLoading }] = useLazyGetPostsByPostIdsQuery();
  const onPressBack = (): boolean | null | undefined => {
    navigation.goBack();
    return true;
  };
  const fetchPosts = async () => {
    if (postIds.length === 0) {
      setReachedEnd(true);
      return;
    }
    setPostFound(true);
    if (loading) return;
    setLoading(true);
    try {
      const _posts = await getPost({
        postIds: postIds.slice(0, Math.min(POST_LIMIT, postIds.length)),
      }).unwrap();
      setPostIds(postIds.slice(Math.min(POST_LIMIT, postIds.length)));
      setPosts(prev => [...prev, ..._posts.items]);
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

  useEffect(() => {
    let flag: boolean = true;
    if (flag) {
      fetchPosts();
    }
    return () => {
      flag = false;
    };
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.back_btn}>
        <Ionicons onPress={onPressBack} name="arrow-back" size={30} />
      </View>
      <Text style={styles.text_header}>
        We recommend you to check out these posts 😊
      </Text>
      <MaskedView
        style={{
          flex: 1,
        }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
            }}>
            <LinearGradientComponent />
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    flex: 1,
  },
  text_header: { alignSelf: 'center', fontSize: SIZES.h4, margin: 10 },
  card: { paddingBottom: 230 },
  back_btn: {
    marginLeft: 10,
  },
});

export default UserPostsRecommendationScreen;
