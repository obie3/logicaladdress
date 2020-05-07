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
    paddingLeft: wp('3%'),
    paddingTop: hp('1%'),
    backgroundColor: '#ecf0f1',
  },

  nameText: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.headerTwoFont,
    color: theme.primaryTextColor,
  },

  fieldLabel: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerFourFont,
    color: '#00000055',
  },

  profileRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('9%'),
    justifyContent: 'space-between',
  },

  requestFieldNames: {
    fontSize: theme.headerFourFont,
    fontFamily: theme.secondaryFont,
    color: colors.primaryTextColor,
  },

  avatarIconLayout: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: wp('4%'),
  },

  listName: {
    //marginLeft: wp('5%'),
  },

  title: {
    color: colors.blue,
    fontFamily: theme.headerFont,
    fontSize: theme.smallFont,
    padding: 10,
  },

  contactsImage: {
    height: hp('50%'),
    width: wp('90%'),
  },

  connectMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
  },

  emptyListLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
