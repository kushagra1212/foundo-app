import { Image, ImageSourcePropType, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import AnimationTranslateScale from './AnimationTranslateScale';

type props = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  style?: any;
};
const AnimatedObject: React.FC<props> = ({
  source,
  style,
  width = 500,
  height = 500,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          backgroundColor: COLORS.lightGraySecondary,
          width: '100%',
          height: '100%',
          borderRadius: 25,
          ...style,
        }}
      >
        <AnimationTranslateScale
          translateRange={[100, 0]}
          translateDuration={1500}
          scaleRange={[1.5, 1.3]}
          scaleDuration={500}
        >
          <Image
            source={source}
            style={{
              width: width,
              height: height,
              position: 'absolute',
              zIndex: 0,
              right: 1,
            }}
          />
        </AnimationTranslateScale>
      </View>
    </View>
  );
};

export default AnimatedObject;
