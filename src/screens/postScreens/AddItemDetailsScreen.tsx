import { Formik, FormikProps } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import character2 from '../../assets/images/character1.png';
import NotLoggedInComponent from '../../components/atoms/Auth/NotLoggedInComponent';
import StepWiseProgress from '../../components/atoms/ProgressBar/StepWiseProgress';
import NextStepButton from '../../components/molecules/ItemForm/NextStepButton';
import PrevStepButton from '../../components/molecules/ItemForm/PrevStepButton';
import Step1ItemNameComponent from '../../components/molecules/ItemForm/Step1ItemNameComponent';
import Step2SelectColorComponent from '../../components/molecules/ItemForm/Step2SelectColorComponent';
import Step3DateTimeComponent from '../../components/molecules/ItemForm/Step3DateTimeComponent';
import Step4DescriptionComponent from '../../components/molecules/ItemForm/Step4DescriptionComponent';
import Step5CategoryComponent from '../../components/molecules/ItemForm/Step5CategoryComponent';
import Step6UploadPicturesComponent from '../../components/molecules/ItemForm/Step6UploadPicturesComponent';
import Step7BrandandCityComponent from '../../components/molecules/ItemForm/Step7BrandandCityComponent';
import Step8SetLocationComponent from '../../components/molecules/ItemForm/Step8SetLocationComponent';
import { Ionicons } from '../../constants/icons';
import { COLORS } from '../../constants/theme';
import { AddPost } from '../../interfaces';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import { updateAddItemDetailsScreenStatus } from '../../redux/slices/sreenSilce';
type props = {
  navigation: any;
};
const initialPost: AddPost = {
  itemName: '',
  color: '',
  dateTime: '',
  description: '',
  category: '',
  pictures: [{ image: '' }, { image: '' }],
  location: {
    latitude: 0,
    longitude: 0,
  },
  brand: '',
  city: '',
  isFounded: false,
  fk_userId: 1,
};
const { width, height } = Dimensions.get('window');
const AddItemDetailsScreen: React.FC<props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState<boolean>(false);
  const user = useSelector(selectCurrentUser);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const formRef = React.useRef<FormikProps<AddPost>>(null);
  const _isFounded = navigation.getState().routes[1].params.isFounded;
  const closeThisScreen = () => {
    formRef.current?.resetForm();
    dispatch(
      updateAddItemDetailsScreenStatus({ addItemDetailsScreenStatus: false }),
    );

    // Clean up the Current Screen from the stack
    navigation.pop();

    return true;
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const previousStep = () => {
    isValidHander(true);
    setCurrentStep(currentStep - 1);
  };
  const handleSubmit = (values: any) => {};
  const isValidHander = (value: boolean) => {
    setValid(value);
  };
  type currentStepComponentProps = {
    isValidHandler: (value: boolean) => void;
  };
  const stepComponent: React.FC<
    FormikProps<AddPost> & currentStepComponentProps
  > = props => {
    switch (currentStep) {
      case 1:
        return <Step1ItemNameComponent {...props} />;
      case 2:
        return <Step2SelectColorComponent {...props} />;
      case 3:
        return <Step3DateTimeComponent {...props} />;
      case 4:
        return <Step4DescriptionComponent {...props} />;
      case 5:
        return <Step5CategoryComponent {...props} />;
      case 6:
        return <Step6UploadPicturesComponent {...props} />;
      case 7:
        return <Step7BrandandCityComponent {...props} />;
      case 8:
        return (
          <Step8SetLocationComponent
            closeThisScreen={closeThisScreen}
            navigation={navigation}
            {...props}
          />
        );
      default:
        return (
          <View>
            <Text>Something went wrong</Text>
          </View>
        );
    }
  };

  const CurrentStepComponent = useCallback(stepComponent, [currentStep]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', closeThisScreen);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', closeThisScreen);
    };
  }, []);

  if (!user) {
    return (
      <SafeAreaView mode="margin">
        <Ionicons
          name="arrow-back"
          size={35}
          color="black"
          onPress={closeThisScreen}
        />
        <NotLoggedInComponent
          navigation={navigation}
          title="Not Logged In"
          desciption="Please login to add items"
          characterSource={character2}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      testID="AddItemDetails"
      style={{ backgroundColor: COLORS.lightGrayPrePrimary }}>
      <View style={[styles.container, { height }]}>
        <View style={styles.header_container}>
          <PrevStepButton
            close={() =>
              currentStep === 1 ? closeThisScreen() : previousStep()
            }
          />
          <Ionicons
            name="close-circle"
            size={60}
            color="black"
            onPress={closeThisScreen}
          />
        </View>
        <StepWiseProgress numberOfSteps={8} currentStep={currentStep} />
        <View style={{ flex: 1 }}>
          <Formik
            validationSchema={ItemValidationSchema}
            initialValues={{
              ...initialPost,
              fk_userId: user.id,
              isFounded: _isFounded,
            }}
            onSubmit={handleSubmit}
            innerRef={formRef}>
            {(props: FormikProps<AddPost>) => (
              <CurrentStepComponent isValidHandler={isValidHander} {...props} />
            )}
          </Formik>
        </View>

        {currentStep !== 8 && (
          <View style={[styles.nextStepButtonContainer]}>
            <NextStepButton
              active={isValid}
              style={[
                styles.NextStepButton,
                !isValid ? { backgroundColor: COLORS.GrayPrimary } : {},
              ]}
              nextStep={nextStep}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: COLORS.lightGrayPrePrimary,
  },
  header_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextStepButtonContainer: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NextStepButton: {
    backgroundColor: COLORS.bluePrimary,
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const ItemValidationSchema = yup.object().shape({
  itemName: yup
    .string()
    .min(3, 'Item Name must be at least 3 characters long')
    .max(15, 'Item Name must be at most 14 characters long')
    .required('Item Name is required'),
  color: yup.string().required('Color is required'),
  dateTime: yup.string().required('Date and Time is required'),
  description: yup
    .string()
    .min(15, 'Description must be at least 3 characters long')
    .max(150, 'Description must be at most 50 characters long'),
  category: yup.string().required('Category is required'),
  pictures: yup.array().of(
    yup.object().shape({
      image: yup.string().required('Image is required').min(100),
    }),
  ),
  location: yup.object().shape({
    latitude: yup.number().required('Location is required'),
    longitude: yup.number().required('Location is required'),
  }),
  brand: yup.string().required('Brand is required').min(3),
  city: yup.string().required('City is required').min(3),
});
export default AddItemDetailsScreen;
