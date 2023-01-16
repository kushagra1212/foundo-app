import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { boolean } from 'yup';
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIconsCommunity,
} from '../../../constants/icons';
import { ITEM_STANDARD_COLORS } from '../../../constants/item';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { Post } from '../../../interfaces';
import { useState } from 'react';
import { capitalizeEveryWord, capitalizeFirstLetter } from '../../../utils';
import ItemComponent from '../Item/ItemViewComponent';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import BottomModal from '../../atoms/BottomModal';
import ShowMapComponent from '../../atoms/Map/ShowMapComponent';
export type props = {
  message: any;
};
const SingleMessageComponent: React.FC<props> = ({ message }) => {
  const user = useSelector(selectCurrentUser);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [showMapView, setShowMapView] = useState<boolean>(false);
  const closeMapView = () => {
    setShowMapView(false);
  };
  return (
    <View
      style={[
        styles.message,
        user.id === message.senderId
          ? {
              backgroundColor: COLORS.blackPrimary,
              width: '85%',
              marginLeft: '15%',
            }
          : { width: '85%', marginRight: '15%' },
      ]}
    >
      <View
        style={[
          { borderBottomWidth: 1, width: '100%' },
          user.id === message.senderId ? { borderColor: COLORS.white } : {},
        ]}
      >
        <Text
          style={[
            { ...FONTS.h4, margin: 10 },
            user.id === message.senderId ? { color: COLORS.white } : {},
          ]}
        >
          {capitalizeEveryWord(message.title)}
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          maxHeight: readMore ? '100%' : 200,
        }}
      >
        {message.message.length > 100 && !readMore ? (
          <Text
            style={[
              { ...FONTS.body3, ...{ margin: 10 } },
              user.id === message.senderId ? { color: COLORS.white } : {},
            ]}
          >
            {message.message.substring(0, 100)}
            <Text
              style={{ color: COLORS.redPrimary }}
              onPress={() => setReadMore(true)}
            >
              {' '}
              read more
            </Text>
          </Text>
        ) : message.message.length > 100 && readMore ? (
          <Text
            style={[
              { ...FONTS.body3, ...{ margin: 10 } },
              user.id === message.senderId ? { color: COLORS.white } : {},
            ]}
          >
            {message.message}
            <Text
              style={{ color: COLORS.redPrimary }}
              onPress={() => setReadMore(false)}
            >
              {' '}
              read less
            </Text>
          </Text>
        ) : (
          <Text
            style={[
              { ...FONTS.body3, ...{ margin: 10 } },
              user.id === message.senderId ? { color: COLORS.white } : {},
            ]}
          >
            {message.message}
          </Text>
        )}
        <View>
          {message.isFound ? (
            <TouchableOpacity
              style={styles.btn_active}
              onPress={() => {
                setShowMapView(true);
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: SIZES.h3,
                  fontWeight: '600',
                }}
              >
                <FontAwesome
                  name="location-arrow"
                  size={20}
                  color={COLORS.black}
                />{' '}
                <Text> See on map</Text>
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      {showMapView && (
        <BottomModal
          height={'90%'}
          backgroundFilter={true}
          isVisible={true}
          effect={'fade'}
          onClose={closeMapView}
          iconName={'close'}
        >
          <ShowMapComponent
            latitude={message.latitude}
            longitude={message.longitude}
          />
        </BottomModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    backgroundColor: COLORS.white,
    overflow: 'scroll',
    borderRadius: 10,
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
    margin: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  btn_active: {
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 10,
  },
});
export default SingleMessageComponent;
