import { Image, ImageSourcePropType, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import ElevatedCard from '../../atoms/Other/ElevatedCard';
import AnimationTranslateScale from './AnimationTranslateScale';

interface props {
  title: string;
  description: string;
  source: ImageSourcePropType;
  transparent?: boolean;
  elevationCardStyle?: any;
}
const AnimatedComponent: React.FC<props> = ({
  title,
  description,
  source,
  elevationCardStyle,
  transparent = false,
  ...rest
}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: transparent
            ? 'transparent'
            : COLORS.lightGraySecondary,
          width: '100%',
          height: '100%',
          borderRadius: 25,
        }}>
        <AnimationTranslateScale
          {...rest}
          scaleRange={[1, 1.3]}
          scaleDuration={500}>
          <Image
            source={source}
            style={{
              width: 500,
              height: 500,
              position: 'absolute',
              zIndex: 0,
              right: 1,
            }}
          />
        </AnimationTranslateScale>
      </View>
      <ElevatedCard
        elevationCardStyle={elevationCardStyle}
        elevation={10}
        title={title}
        description={description}
      />
    </View>
  );
};

export default AnimatedComponent;
