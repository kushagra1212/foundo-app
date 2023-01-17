import { View, TouchableOpacity } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import { Ionicons } from '../../../constants/icons';
import { COLORS } from '../../../constants/theme';
type props = {
  nextStep: () => void;
  style?: any;
  active: boolean;
};

const NextStepButton: React.FC<props> = ({ nextStep, style, active }) => {
  return (
    <View
      style={[
        {
          margin: 10,
          backgroundColor: COLORS.GrayPrimary,
          width: 95,
          borderRadius: 100,
          padding: 5,
        },
        ...style,
      ]}
    >
      <TouchableOpacity disabled={!active} onPress={nextStep}>
        <Ionicons
          name="chevron-forward"
          size={80}
          color="black"
          style={{ color: COLORS.white }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NextStepButton;
