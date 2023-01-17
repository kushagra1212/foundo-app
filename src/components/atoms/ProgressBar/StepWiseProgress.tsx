import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
type props = {
  numberOfSteps: number;
  currentStep: number;
};

const StepWisProgress: React.FC<props> = ({ numberOfSteps, currentStep }) => {
  return (
    <View style={styles.container}>
      {Array.from(Array(numberOfSteps).keys()).map((step, index) => (
        <View
          key={index}
          style={[styles.stepContainer, { flex: 1 / numberOfSteps }]}
        >
          <View
            style={[
              styles.step,
              index < currentStep ? styles.stepCompleted : null,
            ]}
          />
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    elevation: 10,
    borderRadius: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    borderRadius: 10,
  },
  step: {
    borderRadius: 10,
    height: 8,
    width: '95%',
    backgroundColor: COLORS.GraySecondary,
  },
  stepCompleted: {
    backgroundColor: COLORS.greenSecondary,
  },
});

export default StepWisProgress;
