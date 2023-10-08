import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';

import BottomModal from '../../components/atoms/BottomModal';
import FilterOptionComponent, {
  FILTER_ITEMS,
} from '../../components/atoms/FilterOptionItem';
import UserNotFound from '../../components/atoms/UserNotFound';
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
import {
  resetUserPosts,
  selectUserPosts,
  selectUserPostsFilterType,
  selectUserPostsLimit,
  selectUserPostsOffset,
  updateUserPosts,
  updateUsersPostsFilter,
} from '../../redux/slices/postSlice';

export type props = {
  navigation: any;
  route: any;
};
const PostsScreen: React.FC<props> = ({ navigation, route }) => {
  const filterType = useSelector(selectUserPostsFilterType);
  const posts: Post[] = useSelector(selectUserPosts);
  const userId = route.params.userId;
  const { data: user } = useGetUserQuery({ fk_userId: userId });
  const [itemFilterOption, setItemFilterOption] =
    useState<FilterItemOn>(filterItemOnInitial);
  const [backgroundFilter, setBackgroundFilter] = useState<boolean>(false);
  const [advFilterOn, setAdvFilterOn] = useState<boolean | undefined>(
    undefined,
  );
  const limit = useSelector(selectUserPostsLimit);
  const offset = useSelector(selectUserPostsOffset);
  const [getPost, { isLoading }] = useLazyGetUserPostsQuery();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [postFound, setPostFound] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChangeFilter = (id: number) => {
    dispatch(updateUsersPostsFilter({ filterType: id }));
  };
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalClose = () => {
    setBackgroundFilter(false);
    if (advFilterOn === undefined) setAdvFilterOn(true);
    else setAdvFilterOn(!advFilterOn);
    dispatch(updateUsersPostsFilter({ filterType }));
    setTimeout(() => {
      setIsModalVisible(false);
    }, 10);
  };
  const onModalOpen = () => {
    setIsModalVisible(true);
    setBackgroundFilter(true);
    dispatch(resetUserPosts());
  };
  const updateItemFilterOption = (options: FilterItemOn): void => {
    setItemFilterOption({ ...itemFilterOption, ...options });
  };
  const resetItemFilter = () => {
    setItemFilterOption(filterItemOnInitial);
  };
  const fetchPosts = async () => {
    setPostFound(true);
    if (loading) return;
    setLoading(true);
    const cat = { ...itemFilterOption };

    try {
      const posts = await getPost({
        offset,
        limit,
        userId,
        founded: filterType,
        ...cat,
      }).unwrap();
      dispatch(updateUserPosts({ offset: offset + limit, posts }));
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
      setReachedEnd(false);
      if (offset === 0) {
        fetchPosts();
      }
    }
    return () => {
      flag = false;
    };
  }, [filterType, advFilterOn, offset]);

  if (!userId) {
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
          <View
            style={{
              backgroundColor: COLORS.GraySecondary,
              borderRadius: 50,
              paddingLeft: 3,
              paddingRight: 3,
              elevation: 10,
            }}>
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
            refreshing={false}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 10000);
            }}
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
                '#FFFFFF',
                '#FFFFFF',
              ]}
              style={{
                flex: 1,
                borderRadius: 5,
              }}></LinearGradient>
          </View>
        }>
        {/* Shows behind the mask, you can put anything here, such as an image */}

        <CardsComponent
          fetchPosts={fetchPosts}
          loading={loading}
          postFound={postFound}
          posts={posts}
          reachedEnd={reachedEnd}
          navigation={navigation}
          SingleCardComponent={SingleCardComponent}
        />
        <View style={{ height: 10 }}></View>
      </MaskedView>
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
});
export default PostsScreen;