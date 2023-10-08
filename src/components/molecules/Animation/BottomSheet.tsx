import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { COLORS } from '../../../constants/theme';

enum Direction {
  LEFT,
  RIGHT,
  CENTER,
}
type props = {
  children: React.ReactNode;
  onClose: () => void;
};
const BottomSheet: React.FC<props> = ({ children, onClose }) => {
  const NewGestureDetector = GestureDetector;

  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      position.value = e.translationY;
    })
    .onEnd(e => {});

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));
  return (
    <GestureHandlerRootView>
      <NewGestureDetector gesture={panGesture}>
        <Animated.View style={[styles.ball, animatedStyle]}>
          {children}
        </Animated.View>
      </NewGestureDetector>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  ball: {
    zIndex: 100,
    width: '100%',
    height: 1000,
    position: 'absolute',
    backgroundColor: COLORS.white,
  },
});

export default BottomSheet;
