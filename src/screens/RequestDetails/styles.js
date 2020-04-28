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
  },

  wrapper: {
    padding: wp('3%'),
    flex: 1,
  },

  buttonTxt: {
    ...theme.buttonText,
    fontSize: hp('2%'),
  },

  flatListName: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  introMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
  },

  bottomSheetRowItem: {
    flexDirection: 'row',
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    alignItems: 'center',
  },

  bottomSheetListItem: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: hp('8%'),
  },

  flatListName: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  requestFieldNames: {
    fontSize: theme.headerFourFont,
    fontFamily: theme.secondaryFont,
    color: colors.primaryTextColor,
  },

  buttonLayout: {
    borderColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },

  panelButtonTitle: {
    fontSize: 12,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    height: hp('5%'),
    borderColor: 'white',
    //borderWidth: 3,
  },
});
