import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import FilterOptionComponent, {
  FILTER_ITEMS, LOST_ITEM,
} from '../components/atoms/FilterOptionItem';
import AdditionalFilterOptionComponent from '../components/molecules/Filter/AditionalFilterOptionComponent.tsx';
import CardsComponent from '../components/molecules/Item/Card/CardsComponent';
import { COLORS, FONTS } from '../constants/theme';
import { FilterItemOn, Post } from '../interfaces';
import { filterItemOnInitial } from '../interfaces/initials';
import {
  resetUserPosts,
  selectUserPosts,
  selectUserPostsFilterType,
  selectUserPostsLimit,
  selectUserPostsOffset,
  updateUserPosts,
  updateUsersPostsFilter,
} from '../redux/slices/postSlice';
import FilterItemComponent from '../components/molecules/Filter/FilterItemComponent';
import BottomModal from '../components/atoms/BottomModal';
import { useLazyGetUserPostsQuery } from '../redux/services/post-service';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import MaskedView from '@react-native-masked-view/masked-view';
import character4 from '../assets/images/character4.png';
import object3 from '../assets/images/object1.png';
import { LinearGradient } from 'expo-linear-gradient';
import { selectCurrentUserId } from '../redux/slices/authSlice';
import SingleCardComponentWithMatch from '../components/molecules/Item/Card/SingleCardComponentWithMatch';
import AnimatedObject from '../components/molecules/Animation/AnimatedObject';
import AnimatedComponent from '../components/molecules/Animation/AnimatedComponent';
import LogInButtonComponent from '../components/atoms/LogInButtonComponent';




export type props = {
  navigation: any;
};
const UserPostsScreen: React.FC<props> = ({ navigation }) => {
  const filterType = useSelector(selectUserPostsFilterType);
  const _currentUserId = useSelector(selectCurrentUserId);
  const posts: Array<Post> = useSelector(selectUserPosts);
  const currentUserId = useSelector(selectCurrentUserId);
  const [itemFilterOption, setItemFilterOption] =
    useState<FilterItemOn>(filterItemOnInitial);
  const [backgroundFilter, setBackgroundFilter] = useState<boolean>(false);
  const [advFilterOn, setAdvFilterOn] = useState<boolean | undefined>(
    undefined
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
    dispatch(updateUsersPostsFilter({ filterType: filterType }));
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
    if (loading ) return;
    setLoading(true);
    let cat = { ...itemFilterOption };

    try {
      const posts = await getPost({
        offset: offset,
        limit,
        userId:currentUserId,
        founded: filterType,
        ...cat,
      }).unwrap();
      dispatch(updateUserPosts({ offset: offset + limit, posts: posts }));
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

  const handleOnFocus = () => {
   
  };

    if (_currentUserId === null) {
    return (
      <SafeAreaView
        style={{
          height: '100%',
          backgroundColor: COLORS.lightGrayPrePrimary,
        }}
      >
        <View style={{ zIndex: 1, top: '60%' }}>
          <AnimatedObject width={300} height={300} source={object3} />
        </View>
        <AnimatedComponent
          title="Not Logged In"
          description="Please login to see your posts"
          source={character4}
        />
        <View style={{ marginTop: '10%' }}>
          <LogInButtonComponent navigation={navigation} title="Log in" />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.feed}>
      <View>
        <View
          style={styles.item_search_input}
        >
          <View style={{ marginLeft: 10,marginTop:10 }}>
            <Text style={{ ...FONTS.body2 }}>
             
              <Text style={FONTS.h1}> Items You </Text>
             {filterType===LOST_ITEM?
              <Text>have Lost </Text>
            : <Text>have Found </Text>
            }

            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
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
            }}
          >
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
              }}
            ></LinearGradient>
          </View>
        }
      >
        {/* Shows behind the mask, you can put anything here, such as an image */}

        <CardsComponent
          fetchPosts={fetchPosts}
          loading={loading}
          postFound={postFound}
          posts={posts}
          reachedEnd={reachedEnd}
          navigation={navigation}
          SingleCardComponent={SingleCardComponentWithMatch}
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
          refreshAvail
        >
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
    margin: 10,
    marginRight: 20,
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
export default UserPostsScreen;
