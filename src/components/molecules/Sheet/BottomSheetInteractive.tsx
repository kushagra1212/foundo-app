import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import WebView from 'react-native-webview';

import { COLORS } from '../../../constants/theme';
const { width: SCREEN_WIDTH, height: SCREEEN_HEIGHT } =
  Dimensions.get('window');

type BottomSheetProps = {
  children: React.ReactNode;
  bottomSheetToggle: () => void;
};
export type BottomSheetRef = {
  showBottomSheet: () => void;
  hideBottomSheet: () => void;
  isActive: () => boolean;
};

const BottomSheetInteractive = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, bottomSheetToggle }, ref) => {
    const contextY = useSharedValue(SCREEEN_HEIGHT);
    const offsetY = useSharedValue(0);
    const bottom = useSharedValue(-SCREEEN_HEIGHT);
    let isActived = useRef(false).current;
    const showBottomSheet = () => {
      isActived = true;
      offsetY.value = -SCREEEN_HEIGHT / 2;
    };
    const hideBottomSheet = () => {
      offsetY.value = 0;
      bottom.value = -SCREEEN_HEIGHT;
      isActived = false;
    };
    useImperativeHandle(ref, () => ({
      showBottomSheet,
      hideBottomSheet,
      isActive: () => isActived,
    }));
    const AnimatedBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withSpring(offsetY.value, {
              damping: 20,
              velocity: 50,
            }),
          },
        ],
        bottom: withSpring(bottom.value, {
          damping: 20,
          velocity: 50,
        }),
      };
    });
    const gesture = Gesture.Pan()
      .onBegin(e => {
        contextY.value = offsetY.value;
      })
      .onUpdate(e => {
        offsetY.value = e.translationY + contextY.value;
      })
      .onEnd(() => {
        if (offsetY.value <= -SCREEEN_HEIGHT / 2) {
          offsetY.value = -SCREEEN_HEIGHT;
        } else if (offsetY.value >= -SCREEEN_HEIGHT / 2) {
          runOnJS(bottomSheetToggle)();
        }
      })
      .onFinalize(() => {});

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.sheetContainer, AnimatedBottomSheetStyle]}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'transparent',
            }}>
            <WebView
              style={{ flex: 1, backgroundColor: 'transparent' }}
              originWhitelist={['*']}
              source={{
                html: `<div style="
        position: absolute;

        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: ${COLORS.lightGrayPrePrimary};
        backdrop-filter: blur(30px);
        "/>`,
              }}
            />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.dragger} />
            <View style={styles.content}>{children}</View>
          </View>
        </Animated.View>
      </GestureDetector>
    );
  },
);
const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    width: SCREEN_WIDTH,
    height: SCREEEN_HEIGHT,
    zIndex: 5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  wrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  dragger: {
    width: 70,
    height: 6,
    borderRadius: 5,
    backgroundColor: COLORS.blackPrimary,
    margin: 10,
  },
  content: {
    width: '100%',
  },
});

export default BottomSheetInteractive;
