import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

import character5 from '../../../../assets/images/character5.png';
import { COLORS } from '../../../../constants/theme';
import { Post } from '../../../../interfaces';
import AnimatedComponent from '../../Animation/AnimatedComponent';
export type props = {
  postFound: boolean;
  posts: Post[];
  reachedEnd: boolean;
  fetchPosts: () => void;
  loading: boolean;
  navigation: any;
  SingleCardComponent: React.FC<any>;
};
const CardsComponent: React.FC<props> = ({
  postFound,
  reachedEnd,
  fetchPosts,
  loading,
  posts,
  navigation,
  SingleCardComponent,
}) => {
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
  };

  if (!postFound) {
    return (
      <AnimatedComponent
        source={character5}
        title="No Results"
        description={`Sorry We couldn't found anything`}
      />
    );
  }
  return (
    <FlatList
      testID="card-list"
      data={posts}
      renderItem={({ item }) => (
        <SingleCardComponent
          navigation={navigation}
          key={item.id.toString()}
          item={item}
        />
      )}
      onEndReached={reachedEnd ? null : fetchPosts}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginBottom: 20 }}
            color={COLORS.primary}
          />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    backgroundColor: COLORS.GrayPrimary,
  },
});
export default CardsComponent;
