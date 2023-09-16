import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, FONTS } from '../../../../constants/theme';
import { useGetMatchesQuery } from '../../../../redux/services/post-service';
import SingleCardComponent, { SingleCardProps } from './SingleCardComponent';

const SingleCardComponentWithMatch: React.FC<SingleCardProps> = props => {
  const { data, isLoading } = useGetMatchesQuery(props.item.id);
  const { item } = props;
  if (isLoading || (data && data.length === 0)) {
    return <SingleCardComponent {...props} />;
  }

  const handleMatchPress = () => {
    props.navigation.navigate('UserPostsRecommendation', {
      data,
    });
  };

  return (
    <View>
      <TouchableOpacity style={styles.banner_button} onPress={handleMatchPress}>
        <Text
          style={{
            color: COLORS.black,
            fontWeight: '800',
            alignSelf: 'center',
          }}>
          We have found
          <Text style={{ color: COLORS.bluePrimary }}>
            {' ' + data.length + ' '}
          </Text>
          matches for {item.isFounded ? '' : 'your'}
          <Text style={{ color: COLORS.bluePrimary }}>
            {' ' + item.itemName}
          </Text>
        </Text>

        <Text
          style={{
            ...FONTS.h4,
            alignSelf: 'center',
            paddingTop: 10,
            color: COLORS.GrayPrimary,
          }}>
          {' '}
          Click here to see them
        </Text>
      </TouchableOpacity>

      <SingleCardComponent {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner_button: {
    backgroundColor: COLORS.white,
    elevation: 20,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: -5,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default SingleCardComponentWithMatch;
