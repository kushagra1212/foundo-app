import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { FormikProps } from 'formik';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '../../../constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};

const Step3DateTimeComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  setFieldValue,
  errors,
}) => {
  const [date, setDate] = useState(
    new Date(values.dateTime ? values.dateTime : new Date())
  );

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(),
    });
  };
  useEffect(() => {
    setFieldValue('dateTime', date.toISOString().split('T')[0]);
  }, [date]);

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <SafeAreaView
      style={{
        marginTop: '10%',
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      mode="margin"
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ ...FONTS.h1, lineHeight: 40 }}>
          When did you{' '}
          <Text style={{ color: COLORS.redPrimary, fontSize: 31 }}>Lose</Text>{' '}
          the Item ?
        </Text>
      </View>
      <View style={{ margin: 50, marginBottom: 60 }}>
        <AnimationTranslateScale
          translateRange={[-500, 0]}
          translateDuration={500}
          scaleRange={[1, 1.1]}
          scaleDuration={100}
          tension={100}
          friction={1000}
        >
          <View
            style={{
              width: 150,
            }}
          >
            <TouchableOpacity onPress={showDatepicker}>
              <MaterialIcons
                name="date-range"
                size={150}
                color={COLORS.orangePrimary}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 150,
              marginLeft: '50%',
            }}
          >
            <TouchableOpacity onPress={showTimepicker}>
              <MaterialIcons
                name="access-time"
                size={150}
                color={COLORS.greenPrimary}
              />
            </TouchableOpacity>
          </View>
        </AnimationTranslateScale>
        <View>
          <Text style={FONTS.body2}>{date.toISOString().split('T')[0]}</Text>

          <Text style={FONTS.body2}>{date.toTimeString()}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step3DateTimeComponent;
