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

  navBg: {
    backgroundColor: colors.blue,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    elevation: 1,
  },

  title: {
    color: colors.background,
    fontSize: 24,
    fontFamily: theme.headerFont,
    paddingLeft: wp('5%'),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp('3.5%'),
  },

  navIcon: {
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    flex: 1,
    paddingLeft: wp('3%'),
  },

  avatarLayout: {
    alignSelf: 'center',
    alignItems: 'center',
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
    height: hp('10%'),
    justifyContent: 'space-between',
  },

  avatarIconLayout: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  listName: {
    marginLeft: wp('5%'),
  },

  iconLayout: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: wp('3%'),
  },

  headerStyle: {
    fontFamily: theme.headerFont,
    color: colors.blue,
    fontSize: 14,
  },

  // title: {
  //   color: colors.blue,
  //   fontFamily: theme.headerFont,
  //   fontSize: theme.smallFont,
  //   padding: 10,
  // },

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
