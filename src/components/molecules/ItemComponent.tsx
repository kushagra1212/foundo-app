import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import BottomModal from './BottomModal';
import { useGetpostQuery } from '../../redux/services/post-service';
import { COLORS } from '../../constants/theme';
import { useGetUserQuery } from '../../redux/services/profile-service';
import AnimatedImageComponent from './Animations/AnimatedImageComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
type props = {
  item: any;
  onClose: () => void;
  isVisible: boolean;
};
const ItemComponent: React.FC<props> = ({ item, onClose, isVisible }) => {
  const { data: detailedItem, isLoading } = useGetpostQuery(item.id);
  const { data: userWhoPosted } = useGetUserQuery({
    userId: item.userId,
  });
  console.log(detailedItem, userWhoPosted);
  return (
    <SafeAreaView>
      <BottomModal
        height={'90%'}
        backgroundFilter={true}
        isVisible={isVisible}
        effect={'fade'}
        onClose={onClose}
        iconName={'close'}
      >
        <View>
          {isLoading && (
            <ActivityIndicator
              size="large"
              style={{ marginBottom: 20 }}
              color={COLORS.primary}
            />
          )}
          <GestureHandlerRootView>
            <AnimatedImageComponent />
          </GestureHandlerRootView>
          <Text>Item</Text>
        </View>
      </BottomModal>
    </SafeAreaView>
  );
};
export default ItemComponent;
