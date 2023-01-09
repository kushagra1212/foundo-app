import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
export type props = {
  children: any;
  scaleDuration?: number;
  translateDuration?: number;
  tension?: number;
  friction?: number;
  scaleRange?: number[];
  translateRange?: number[];
  translateRangeX?: number[];
};
const AnimationTranslateScale: React.FC<props> = ({
  children,
  scaleDuration,
  translateDuration,
  tension,
  friction,
  scaleRange,
  translateRange,
  translateRangeX,
}) => {
  const Translate = useRef(new Animated.Value(0)).current;
  const translateY = Translate.interpolate({
    inputRange: [0, 1],
    outputRange: translateRange ? translateRange : [-10, 10],
  });
  const translateX = Translate.interpolate({
    inputRange: [0, 1],
    outputRange: translateRangeX ? translateRangeX : [0, 0],
  });
  const Scale = useRef(new Animated.Value(0)).current;
  const scaleValue = Scale.interpolate({
    inputRange: [0, 1],
    outputRange: scaleRange ? scaleRange : [4, 1],
  });

  const SpringVal = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(Scale, {
        toValue: 1,
        duration: scaleDuration ? scaleDuration : 500,
        useNativeDriver: true,
      }),
      Animated.timing(Translate, {
        toValue: 1,
        duration: translateDuration ? translateDuration : 2100,
        useNativeDriver: true,
      }),
      Animated.spring(SpringVal, {
        toValue: 2,
        friction: friction ? friction : 1,
        tension: tension ? tension : 0.5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [Scale, Translate, SpringVal]);
  return (
    <Animated.View
      style={{
        transform: [
          { scale: scaleValue },
          { translateY: translateY },
          { translateX: translateX },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cards: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export default AnimationTranslateScale;
