import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  ComposedGesture,
  Gesture,
  GestureDetector,
  GestureType,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

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
  urls: string[];
  height?: number;
  width?: number;
};
const AnimatedImageComponent: React.FC<props> = ({
  urls,
  height = 300,
  width = 300,
}) => {
  const NewGestureDetector: React.FC<GestureDetectorProps> = GestureDetector;
  const END_POSITION = 250;
  const direction = useSharedValue(Direction.CENTER);
  const position1 = useSharedValue(0);
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(0.5);
  const position2 = useSharedValue(END_POSITION);
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (direction.value === Direction.CENTER) {
        position1.value = e.translationX;
        position2.value = END_POSITION + e.translationX;
        scale1.value = Math.max(scale1.value - 0.01, 0.5);

        scale2.value = Math.min(scale2.value + 0.01, 1);
      } else if (direction.value === Direction.RIGHT) {
        position1.value = END_POSITION + e.translationX;
        position2.value = e.translationX;
        scale1.value = Math.min(scale1.value + 0.01, 1);
        scale2.value = Math.max(scale2.value - 0.01, 0.5);
      } else {
        position1.value = -END_POSITION + e.translationX;
        position2.value = e.translationX;
        scale1.value = Math.min(scale1.value + 0.01, 1);
        scale2.value = Math.max(scale2.value - 0.01, 0.5);
      }
    })
    .onEnd(e => {
      if (position1.value > END_POSITION / 2) {
        position1.value = withTiming(END_POSITION, { duration: 200 });
        direction.value = Direction.RIGHT;
        scale1.value = withSpring(0.5);
        scale2.value = withSpring(1);
        position2.value = withTiming(0, { duration: 200 });
      } else if (position1.value >= 0 && position1.value <= END_POSITION / 2) {
        position1.value = withTiming(0, { duration: 200 });
        direction.value = Direction.CENTER;
        scale1.value = withSpring(1);
        scale2.value = withSpring(0.5);
        position2.value = withTiming(END_POSITION, { duration: 200 });
      } else if (position1.value < 0 && position1.value >= -END_POSITION / 2) {
        position1.value = withTiming(0, { duration: 200 });
        direction.value = Direction.CENTER;
        scale1.value = withSpring(1);
        scale2.value = withSpring(0.5);
        position2.value = withTiming(END_POSITION, { duration: 200 });
      } else {
        position1.value = withTiming(-END_POSITION, { duration: 200 });
        direction.value = Direction.LEFT;
        scale1.value = withSpring(0.5);
        scale2.value = withSpring(1);
        position2.value = withTiming(0, { duration: 200 });
      }
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position1.value }, { scale: scale1.value }],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: position2.value }, { scale: scale2.value }],
  }));
  return (
    <NewGestureDetector gesture={panGesture}>
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Animated.View style={[styles.ball, animatedStyle, { height, width }]}>
          <Image
            source={{ uri: urls[0] }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        </Animated.View>
        {urls.length > 1 && (
          <Animated.View
            style={[styles.ball, animatedStyle2, { height, width }]}>
            <Image
              source={{ uri: urls[1] }}
              style={{ width: '100%', height: '100%', borderRadius: 10 }}
            />
          </Animated.View>
        )}
      </View>
    </NewGestureDetector>
  );
};
const styles = StyleSheet.create({
  ball: {
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    elevation: 50,
    borderRadius: 10,
  },
});

export default AnimatedImageComponent;
