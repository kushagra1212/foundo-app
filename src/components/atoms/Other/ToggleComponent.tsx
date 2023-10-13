import { memo } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

import { COLORS } from '../../../constants/theme';
type props = {
  value: boolean;
  onChange: (value: boolean) => void;
};
const ToggleComponent: React.FC<props> = ({ value, onChange }) => {
  return (
    <View style={styles.view}>
      <Switch
        trackColor={{ false: COLORS.lightGraySecondary, true: COLORS.primary }}
        thumbColor={value ? COLORS.white : COLORS.white}
        ios_backgroundColor={COLORS.lightGraySecondary}
        onValueChange={onChange}
        value={value}
        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {},
});
export default memo(ToggleComponent);
