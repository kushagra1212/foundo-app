import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import AnimatedComponent from '../Animation/AnimatedComponent';
import character5 from '../../../assets/images/character5.png';
import object3 from '../../../assets/images/object3.png';
import AnimatedObject from '../Animation/AnimatedObject';
import LogInButtonComponent from '../../atoms/LogInButtonComponent';
import { View } from 'react-native';
type props = {
  navigation: any;
};
const NotLoggedInProfileComponent: React.FC<props> = ({ navigation }) => {
  console.log('NotLoggedInProfileComponent', navigation);
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: COLORS.lightGrayPrePrimary,
        zIndex: 10,
      }}
    >
      <AnimatedComponent
        title="Not Logged In"
        description="Please login to see your profile"
        source={character5}
      />
      <AnimatedObject source={object3} />
      <View style={{ marginTop: '10%' }}>
        <LogInButtonComponent navigation={navigation} title="Log in" />
      </View>
    </SafeAreaView>
  );
};

export default NotLoggedInProfileComponent;
