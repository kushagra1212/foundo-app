import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import character5 from '../../../assets/images/character5.png';
import object3 from '../../../assets/images/object3.png';
import { COLORS } from '../../../constants/theme';
import AnimatedComponent from '../../molecules/Animation/AnimatedComponent';
import AnimatedObject from '../../molecules/Animation/AnimatedObject';
import LogInButtonComponent from './LogInButtonComponent';
type props = {
  navigation: any;
  title: string;
  desciption: string;
  characterSource?: ImageSourcePropType;
  objectSource?: ImageSourcePropType;
};
const NotLoggedInComponent: React.FC<props> = ({
  navigation,
  title,
  desciption,
  characterSource = character5,
  objectSource = object3,
}) => {
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: COLORS.lightGrayPrePrimary,
        zIndex: 10,
      }}>
      <AnimatedComponent
        title={title}
        description={desciption}
        source={characterSource}
      />
      <AnimatedObject source={objectSource} />
      <View style={{ marginTop: '10%' }}>
        <LogInButtonComponent navigation={navigation} title="Log in" />
      </View>
    </SafeAreaView>
  );
};

export default NotLoggedInComponent;
