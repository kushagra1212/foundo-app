import MaskedView from '@react-native-masked-view/masked-view';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserNotFound from '../../components/atoms/Auth/UserNotFound';
import FilterOptionComponent, {
  FILTER_ITEMS,
} from '../../components/atoms/Item/FilterOptionItem';
import BottomModal from '../../components/atoms/Other/BottomModal';
import LinearGradientComponent from '../../components/atoms/Other/LinearGradientComponent';
import AdditionalFilterOptionComponent from '../../components/molecules/Filter/AditionalFilterOptionComponent.tsx';
import FilterItemComponent from '../../components/molecules/Filter/FilterItemComponent';
import CardsComponent from '../../components/molecules/Item/Card/CardsComponent';
import SingleCardComponent from '../../components/molecules/Item/Card/SingleCardComponent';
import { Ionicons } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
import { FilterItemOn, Post } from '../../interfaces';
import { filterItemOnInitial } from '../../interfaces/initials';
import { useLazyGetUserPostsQuery } from '../../redux/services/post-service';
import { useGetUserQuery } from '../../redux/services/profile-service';

export type props = {
  navigation: any;
  route: any;
};
const PostsScreen: React.FC<props> = ({ navigation, route }) => {
  const userId = route.params.userId;
  const { data: user } = useGetUserQuery({ fk_userId: userId });
  const [itemFilterOption, setItemFilterOption] =
    useState<FilterItemOn>(filterItemOnInitial);
  const [backgroundFilter, setBackgroundFilter] = useState<boolean>(false);
  const [advFilterOn, setAdvFilterOn] = useState<boolean | undefined>(
    undefined,
  );
  const [offset, setOffset] = useState<number>(0);
  const limit = 5;
  const [getPost] = useLazyGetUserPostsQuery();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterType, setFilterType] = useState<number>(0);

  const handleChangeFilter = (id: number) => {
    setFilterType(id);
  };
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalClose = () => {
    setBackgroundFilter(false);
    if (advFilterOn === undefined) setAdvFilterOn(true);
    else setAdvFilterOn(!advFilterOn);

    setIsModalVisible(false);
    setOffset(0);
    setPosts([]);
  };
  const onModalOpen = () => {
    setIsModalVisible(true);
    setBackgroundFilter(true);
  };
  const updateItemFilterOption = (options: FilterItemOn): void => {
    setItemFilterOption({ ...itemFilterOption, ...options });
  };
  const resetItemFilter = () => {
    setItemFilterOption(filterItemOnInitial);
  };
  const fetchPosts = async () => {
    const cat = { ...itemFilterOption };

    try {
      const _posts = await getPost({
        offset,
        limit,
        userId,
        founded: filterType,
        ...cat,
      }).unwrap();
      setOffset(prev => prev + limit);
      setPosts(prev => [...prev, ..._posts]);
    } catch (e: any) {
      console.log(e);
      setReachedEnd(true);

      if (posts.length !== 0) {
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = async () => {
    setReachedEnd(false);
    setOffset(0);
    setPosts([]);
    setLoading(true);
    await fetchPosts();
  };
  const isPostFound = !loading && posts.length !== 0;
  const handleRefreshControl = async () => {
    await refreshPosts();
  };

  useEffect(() => {
    let flag: boolean = true;
    if (flag) {
      refreshPosts();
    }
    return () => {
      flag = false;
    };
  }, [filterType, advFilterOn]);

  if (!userId && !loading) {
    return (
      <UserNotFound
        navigation={navigation}
        message="Please Log In to view your posts"
      />
    );
  }
  return (
    <SafeAreaView style={styles.feed}>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <View style={styles.go_back}>
            <Ionicons
              name="chevron-back-outline"
              size={40}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.item_search_input}>
            <Text style={{ ...FONTS.body2 }}>
              <Text style={FONTS.h1}> {user?.firstName + "'s"} </Text>
              Posts
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FlatList
            data={FILTER_ITEMS}
            contentContainerStyle={styles.option_flatlist}
            renderItem={({ item }) => (
              <FilterOptionComponent
                item={item}
                selectedFilterId={filterType}
                handleChangeFilter={handleChangeFilter}
              />
            )}
            keyExtractor={(item: any) => item.id}
            horizontal
          />
          <AdditionalFilterOptionComponent
            onModalOpen={onModalOpen}
            isFilterOptionSelected={
              JSON.stringify(itemFilterOption) !==
              JSON.stringify(filterItemOnInitial)
            }
          />
        </View>
      </View>
      {!loading ? (
        <MaskedView
          style={{ flex: 1 }}
          maskElement={<LinearGradientComponent />}>
          {/* Shows behind the mask, can put anything here, such as an image */}

          <CardsComponent
            fetchPosts={fetchPosts}
            loading={loading}
            postFound={isPostFound}
            posts={posts}
            reachedEnd={reachedEnd}
            navigation={navigation}
            SingleCardComponent={SingleCardComponent}
          />
          <View style={{ height: 10 }}></View>
        </MaskedView>
      ) : null}
      {isModalVisible && (
        <BottomModal
          backgroundFilter={backgroundFilter}
          isVisible={isModalVisible}
          onClose={onModalClose}
          titleText="Filter"
          reset={resetItemFilter}
          refreshAvail>
          <FilterItemComponent
            options={itemFilterOption}
            updateItemFilterOption={updateItemFilterOption}
            onModalClose={onModalClose}
          />
        </BottomModal>
      )}
      {/* <View>
        <LogoutButtonComponent navigation={navigation} />
      </View> */}
    </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
  },
  item_search_input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item_search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  item_text_ip: {
    marginLeft: 10,
    width: '90%',
  },
  go_back: {
    backgroundColor: COLORS.GrayPrimary,
    borderRadius: 50,
    paddingLeft: 3,
    paddingRight: 3,
    elevation: 10,
  },
});
export default PostsScreen;
