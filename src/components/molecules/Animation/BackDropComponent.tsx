import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { COLORS } from '../../../constants/theme';

const BackDropComponent = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(
      interpolate(animatedIndex.value, [0, 0.5], [0, 0.5], Extrapolate.CLAMP),
      {
        damping: 20, // Adjust the damping value for the desired springiness
        stiffness: 50, // Adjust the stiffness for the desired speed
        mass: 1,
        velocity: 0,
      },
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: COLORS.black,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return <Animated.View style={containerStyle} />;
};

export default BackDropComponent;
