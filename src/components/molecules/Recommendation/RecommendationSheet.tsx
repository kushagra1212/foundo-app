import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BottomSheetInteractive, {
  BottomSheetRef,
} from '../Sheet/BottomSheetInteractive';

export type RecommendationSheetParamList = object;

export type RecommendationSheetProps = {
  navigation: any;
};

const TabBarStyle = {};
const RecommendationSheet: React.FC<RecommendationSheetProps> = ({
  navigation,
}) => {
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(true);
  const bottomSheetToggle = () => {
    if (sheetRef.current?.isActive()) {
      sheetRef.current?.hideBottomSheet();

      navigation?.getParent()?.setOptions({
        tabBarStyle: { ...TabBarStyle, display: 'flex' },
      });
      // opacity.value = 0;
      setTimeout(() => {
        setShowBottomSheet(false);
      }, 500);
    } else {
      setShowBottomSheet(true);
      setTimeout(() => {
        sheetRef.current?.showBottomSheet();
        // opacity.value = 0.5;
        navigation?.getParent()?.setOptions({
          tabBarStyle: { ...TabBarStyle, display: 'none' },
        });
      }, 100);
    }
  };

  return (
    <BottomSheetInteractive
      bottomSheetToggle={bottomSheetToggle}
      ref={sheetRef}>
      <View>
        <Text>Recommendation Sheet</Text>
      </View>
    </BottomSheetInteractive>
  );
};
const styles = StyleSheet.create({});
export default RecommendationSheet;
