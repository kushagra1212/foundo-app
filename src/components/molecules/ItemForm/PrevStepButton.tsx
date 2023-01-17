import { View } from 'react-native';
import { Ionicons } from '../../../constants/icons';
import { COLORS } from '../../../constants/theme';
type props = {
  close: () => void;
};

const PrevStepButton: React.FC<props> = ({ close }) => {
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: COLORS.GrayPrimary,
        width: 50,
        borderRadius: 30,
        padding: 5,
      }}
    >
      <Ionicons
        name="chevron-back-outline"
        size={38}
        color="black"
        onPress={close}
      />
    </View>
  );
};

export default PrevStepButton;
