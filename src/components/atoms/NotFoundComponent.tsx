import { Image, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import AnimationTranslateScale from '../molecules/Animation/AnimationTranslateScale';
import ElevatedCard from './ElevatedCard';

import character13 from '../../assets/images/character13.png';
type props = {
  title: string;
  description: string;
};
const NotFoundComponent: React.FC<props> = ({ title, description }) => {
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
        }}
      >
        <AnimationTranslateScale scaleRange={[1, 1.3]} scaleDuration={500}>
          <Image
            source={character13}
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
      <ElevatedCard title={title} description={description} />
    </View>
  );
};

export default NotFoundComponent;
