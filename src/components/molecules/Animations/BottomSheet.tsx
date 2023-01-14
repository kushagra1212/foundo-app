import React, { useRef } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  ComposedGesture,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  GestureType,
} from 'react-native-gesture-handler';
import BottomModal from '../BottomModal';

interface GestureDetectorProps {
  gesture?: ComposedGesture | GestureType;
  children: React.ReactNode;
}
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
  const NewGestureDetector: React.FC<GestureDetectorProps> = GestureDetector;
  const END_POSITION = 250;
  const direction = useSharedValue(Direction.CENTER);
  const position = useSharedValue(0);
  const scale1 = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationY;
    })
    .onEnd((e) => {});
  const dragGesture = Gesture.Pan()
    .activeOffsetX(10)
    .onUpdate((e) => {
      console.log(e.translationX);
    });

  console.log(position.value);
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
