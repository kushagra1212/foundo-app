import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

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
  const getUserIds = () => {
    return navigation
      .getState()
      .routes[1].params.data.map((element: number[]) => {
        return element[0];
      });
  };

  const [userIds, setUserIds] = useState<number[]>(getUserIds());
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
    if (userIds.length === 0) {
      setReachedEnd(true);
      return;
    }
    setPostFound(true);
    if (loading) return;
    setLoading(true);
    try {
      const _posts = await getPost({
        userIds: userIds.slice(0, Math.min(POST_LIMIT, userIds.length)),
      }).unwrap();
      setUserIds(userIds.slice(Math.min(POST_LIMIT, userIds.length)));
      setPosts(prev => [...prev, ..._posts]);
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
    <SafeAreaView>
      <Ionicons onPress={onPressBack} name="arrow-back" size={35} />

      <Text style={styles.text_header}>
        We recommend you to check out these posts 😊
      </Text>
      <View style={styles.card}>
        <CardsComponent
          fetchPosts={fetchPosts}
          loading={loading}
          postFound={postFound}
          posts={posts}
          reachedEnd={reachedEnd}
          navigation={navigation}
          SingleCardComponent={SingleCardComponent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text_header: { alignSelf: 'center', fontSize: SIZES.h4, margin: 10 },
  card: { paddingBottom: 230 },
});

export default UserPostsRecommendationScreen;
