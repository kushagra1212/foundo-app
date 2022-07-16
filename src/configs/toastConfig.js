import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { COLORS } from '../constants/theme';
import { Entypo, AntDesign, MaterialIcons } from '../constants/icons';
import { Text, View } from 'react-native';
export const toastConfig = {
  warning: ({ props }) => (
    <FoundoToast
      {...props}
      ToastIcon={() => (
        <Entypo
          style={{ color: COLORS.yellowPrimary, marginRight: 10 }}
          name="warning"
          size={30}
        />
      )}
    />
  ),
  error: ({ props }) => (
    <FoundoToast
      {...props}
      ToastIcon={() => (
        <Entypo
          style={{ color: COLORS.redPrimary, marginRight: 10 }}
          name="circle-with-cross"
          size={30}
        />
      )}
    />
  ),
  info: ({ props }) => (
    <FoundoToast
      {...props}
      ToastIcon={() => (
        <AntDesign
          style={{ color: COLORS.blueSecondary, marginRight: 10 }}
          name="infocirlce"
          size={30}
        />
      )}
    />
  ),
};

const FoundoToast = (props) => (
  <View
    style={{
      borderRadius: 10,
      backgroundColor: COLORS.white,
      elevation: 20,
      padding: 5,
      width: '95%',
    }}
  >
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {props.ToastIcon()}
        <Text style={{ fontWeight: '700', fontSize: 22 }}>{props.text}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <AntDesign onPress={() => Toast.hide()} name="close" size={30} />
      </View>
    </View>
    <View style={{ margin: 10, marginBottom: 5 }}>
      <Text style={{ fontWeight: '300', fontSize: 18, textAlign: 'auto' }}>
        {props.message}
      </Text>
    </View>
  </View>
);
