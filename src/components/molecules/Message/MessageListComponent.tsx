import { memo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import character5 from '../../../assets/images/character5.png';
import { COLORS } from '../../../constants/theme';
import { ChatMessage } from '../../../interfaces';
import AnimatedComponent from '../Animation/AnimatedComponent';
import SingleMessageComponent from './SingleMessageComponent';
export type props = {
  messages: ChatMessage[];
  reachedEnd: boolean;
  fetchMessages: () => void;
  loading: boolean;
  messageFound: boolean;
};
const MessageListComponent: React.FC<props> = ({
  reachedEnd,
  fetchMessages,
  loading,
  messages,
  messageFound,
}) => {
  const onScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
  };
  if (!messageFound) {
    return (
      <AnimatedComponent
        source={character5}
        title={'No Results'}
        description={"You don't have any messages yet"}
      />
    );
  }
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <SingleMessageComponent key={item.id.toString()} message={item} />
      )}
      inverted={true}
      onEndReached={reachedEnd ? null : fetchMessages}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <SafeAreaView>
            <ActivityIndicator
              size="large"
              style={{ marginBottom: 20 }}
              color={COLORS.primary}
            />
          </SafeAreaView>
        ) : null
      }
      onScroll={onScroll}
    />
  );
};

export default memo(MessageListComponent);
