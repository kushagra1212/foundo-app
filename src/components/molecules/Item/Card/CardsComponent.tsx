import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../../constants/theme';

import SingleCardComponent from './SingleCardComponent';
import { Post } from '../../../../interfaces';
import character5 from '../../../../assets/images/character5.png';
import AnimatedComponent from '../../Animation/AnimatedComponent';
export type props = {
  postFound: boolean;
  posts: Array<Post>;
  reachedEnd: boolean;
  fetchPosts: () => void;
  loading: boolean;
  navigation: any;
};
const CardsComponent: React.FC<props> = ({
  postFound,
  reachedEnd,
  fetchPosts,
  loading,
  posts,
  navigation,
}) => {
  const onScroll = (event: any) => {
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
      data={posts}
      renderItem={({ item }) => (
        <SingleCardComponent
          navigation={navigation}
          key={item.id.toString()}
          item={item}
        />
      )}
      onEndReached={reachedEnd ? null : fetchPosts}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginBottom: 20 }}
            color={COLORS.primary}
          />
        ) : null
      }
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
