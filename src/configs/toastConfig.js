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
          size={25}
        />
      )}
    />
  ),
  error: ({ props }) => (
    <FoundoToast
      {...props}
      ToastIcon={() => (
        <Entypo
          style={{ color: COLORS.redPrimary, marginRight: 10, zIndex: 100 }}
          name="circle-with-cross"
          size={25}
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
          size={25}
        />
      )}
    />
  ),
  success: ({ props }) => (
    <FoundoToast
      {...props}
      ToastIcon={() => (
        <AntDesign
          style={{ color: COLORS.greenSecondary, marginRight: 10 }}
          name="infocirlce"
          size={25}
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
        <Text style={{ fontWeight: '700', fontSize: 20 }}>{props.text}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <AntDesign onPress={() => Toast.hide()} name="close" size={25} />
      </View>
    </View>
    {props?.message && (
      <View style={{ margin: 10, marginBottom: 5, zIndex: 200 }}>
        <Text style={{ fontWeight: '300', fontSize: 18, textAlign: 'auto' }}>
          {props.message}
        </Text>
      </View>
    )}
  </View>
);
