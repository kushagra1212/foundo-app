import { SafeAreaView, View } from 'react-native';

import character4 from '../../assets/images/character4.png';
import object3 from '../../assets/images/object1.png';
import { COLORS } from '../../constants/theme';
import AnimatedComponent from '../molecules/Animation/AnimatedComponent';
import AnimatedObject from '../molecules/Animation/AnimatedObject';
import LogInButtonComponent from './LogInButtonComponent';
type props = {
  navigation: any;
  message: string;
};

const UserNotFound: React.FC<props> = ({ navigation, message }) => {
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: COLORS.lightGrayPrePrimary,
      }}>
      <View style={{ zIndex: 1, top: '60%' }}>
        <AnimatedObject width={300} height={300} source={object3} />
      </View>
      <AnimatedComponent
        title="Not Logged In"
        description={message}
        source={character4}
      />
      <View style={{ marginTop: '10%' }}>
        <LogInButtonComponent navigation={navigation} title="Log in" />
      </View>
    </SafeAreaView>
  );
};

export default UserNotFound;
