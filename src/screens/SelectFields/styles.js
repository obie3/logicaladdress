import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import colors from 'assets/colors';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ecf0f1',
  },

  profileRowItem: {
    //padding: hp('1.5%'),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },

  flatListItem: {
    //backgroundColor: '#ecf0f1',
    justifyContent: 'space-around',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('8%'),
    borderWidth: 0,
  },

  flatListText: {
    fontFamily: theme.secondaryFont,
    fontSize: hp('2.5%'),
    color: theme.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioButtonLayout: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorAccent,
  },

  radioButton: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    borderRadius: 10,
  },

  btnView: {
    ...theme.buttonView,
    marginBottom: hp('2%'),
  },

  buttonWithImage: {
    ...theme.button,
    borderRadius: 30,
    width: '45%',
    height: 50,
    marginTop: 25,
    backgroundColor: theme.backgroundColor,
    borderColor: colors.blue,
    borderWidth: 2,
  },

  buttonTxt: {
    ...theme.buttonText,
    color: colors.blue,
    //fontSize: hp('2%'),
  },

  flatListName: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  hrLine: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.label,
  },

  introMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
  },

  flatListLayout: {
    flex: 1,
  },
});
