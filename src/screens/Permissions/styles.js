import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    justifyContent: 'center',
    alignContent: 'center',
  },

  wrapper: {
    flex: 1,
  },

  avatarLayout: {
    alignSelf: 'center',
    alignItems: 'center',
  },

  nameText: {
    fontSize: theme.SmallFont,
    fontFamily: theme.headerFont,
    color: colors.blue, //colors.headerFontColor,
  },

  fieldLabel: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerFourFont,
    color: colors.label,
  },

  profileRowItem: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    alignItems: 'center',
    alignContent: 'center',
  },

  headerStyle: {
    fontFamily: theme.headerFont,
    color: colors.blue,
    fontSize: 14,
  },

  title: {
    color: colors.blue,
    fontFamily: theme.headerFont,
    fontSize: theme.SmallFont,
    padding: 10,
  },

  iconLayout: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: wp('4%'),
  },

  contactsImage: {
    height: hp('50%'),
    width: wp('90%'),
  },

  connectMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
  },

  emptyListLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
