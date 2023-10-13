import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '../../../../constants/icons';
import { COLORS } from '../../../../constants/theme';
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
        <View style={styles.txt}>
          <Text>
            We have found
            <Text style={{ color: COLORS.bluePrimary }}>
              {' ' + data.length + ' '}
            </Text>
            matches for {item.isFounded ? '' : 'your'}
            <Text style={{ color: COLORS.bluePrimary }}>
              {' ' + item.itemName}
            </Text>
          </Text>
        </View>
        <AntDesign
          name="arrowright"
          size={25}
          color={COLORS.black}
          style={styles.arrow_right}
        />
      </TouchableOpacity>

      <SingleCardComponent {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner_button: {
    backgroundColor: COLORS.lightGrayPrimary,
    elevation: 10,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: -5,
    padding: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txt: {
    width: '90%',
  },
  arrow_right: { position: 'absolute', right: 10 },
});

export default SingleCardComponentWithMatch;
