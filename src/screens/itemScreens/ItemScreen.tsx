import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import FilterOptionComponent, {
  FILTER_ITEMS,
} from '../../components/atoms/FilterOptionItem';
import ItemSearchComponent from '../../components/atoms/ItemSearchComponent';
import LogoutButtonComponent from '../../components/atoms/LogoutButtonComponent';
import AdditionalFilterOptionComponent from '../../components/molecules/AditionalFilterOptionComponent.tsx';
import CardsComponent from '../../components/molecules/CardsComponent';
import { COLORS, FONTS } from '../../constants/theme';
import { FilterItemOn, Post } from '../../interfaces';
import { filterItemOnInitial } from '../../interfaces/initials';
import {
  resetPosts,
  selectFilterType,
  selectOffsetAndLimit,
  selectPosts,
  updateFilter,
  updatePosts,
} from '../../redux/slices/postSlice';
import FilterItemComponent from '../../components/molecules/FilterItemComponent';
import BottomModal from '../../components/molecules/BottomModal';
import { AntDesign, Feather } from '../../constants/icons';
import { useGetPostsMutation } from '../../redux/services/post-service';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';
import {
  selectFeedSearchScreenStatus,
  updateFeedSearchScreenStatus,
} from '../../redux/slices/sreenSilce';

export type props = {
  navigation: any;
};
const ItemScreen: React.FC<props> = ({ navigation }) => {
  const filterType = useSelector(selectFilterType);
  const posts: Array<Post> = useSelector(selectPosts);
  const feedSearchScreenStatus = useSelector(selectFeedSearchScreenStatus);
  const [itemFilterOption, setItemFilterOption] =
    useState<FilterItemOn>(filterItemOnInitial);
  const [backgroundFilter, setBackgroundFilter] = useState<boolean>(false);
  const [advFilterOn, setAdvFilterOn] = useState<boolean | undefined>(
    undefined
  );
  const { limit, offset } = useSelector(selectOffsetAndLimit);
  const [getPost, { isLoading }] = useGetPostsMutation();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [postFound, setPostFound] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChangeFilter = (id: number) => {
    dispatch(updateFilter({ filterType: id }));
  };
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalClose = () => {
    setBackgroundFilter(false);
    if (advFilterOn === undefined) setAdvFilterOn(true);
    else setAdvFilterOn(!advFilterOn);
    dispatch(updateFilter({ filterType: filterType }));
    setTimeout(() => {
      setIsModalVisible(false);
    }, 10);
  };
  const onModalOpen = () => {
    setIsModalVisible(true);
    setBackgroundFilter(true);
    dispatch(resetPosts());
  };
  const updateItemFilterOption = (options: FilterItemOn): void => {
    setItemFilterOption({ ...itemFilterOption, ...options });
  };
  const resetItemFilter = () => {
    setItemFilterOption(filterItemOnInitial);
  };
  const fetchPosts = async () => {
    setPostFound(true);
    if (loading || feedSearchScreenStatus) return;
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
    if (!feedSearchScreenStatus) {
      setReachedEnd(false);
      if (flag && offset === 0) {
        fetchPosts();
      }
      return () => {
        flag = true;
      };
    }
  }, [filterType, advFilterOn, offset]);

  const handleOnFocus = () => {
    dispatch(updateFeedSearchScreenStatus({ feedSearchScreenStatus: true }));
    dispatch(updateFilter({ filterType: !filterType }));
    navigation.navigate('FeedSearchScreen');
  };
  return (
    <SafeAreaView style={styles.feed}>
      <View>
        <TouchableOpacity
          onPress={handleOnFocus}
          style={styles.item_search_input}
        >
          <View style={{ marginLeft: 10 }}>
            <Text style={{ ...FONTS.body2 }}>
              <Text style={FONTS.h1}>Find </Text>Things you Lost
            </Text>
          </View>
          <Feather style={styles.item_search} name="search" size={35} />
          {/* 
          <TextInput
            style={[styles.item_text_ip, FONTS.body3]}
            placeholder="Search Items here.."
          />
        </View> */}
        </TouchableOpacity>
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
              console.log('refresh');
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
        />
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
export default ItemScreen;
