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
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    justifyContent: 'center',
  },

  avatarLayout: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  verificationIndicators: {
    marginTop: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  verificationText: {
    fontSize: theme.headerThreeFont,
    fontFamily: theme.secondaryFont,
    color: colors.label,
  },

  addressText: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.headerOneFont,
    color: theme.primaryTextColor,
    textAlign: 'center',
  },

  nameText: {
    fontSize: theme.headerFourFont,
    color: theme.primaryTextColor,
    fontFamily: theme.secondaryFont,
  },

  fieldLabel: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerFourFont,
    color: colors.label,
  },

  profileRowItem: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },

  iconLayout: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'flex-end',
  },

  buttonLayout: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button: {
    ...theme.button,
    width: '50%',
    height: hp('6%'),
    marginTop: '2%',
  },

  buttonTxt: {
    fontFamily: theme.headerFont,
    color: theme.colorAccent,
    fontSize: theme.SmallFont,
  },

  tabsContainerStyle: {
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 2,
    borderWidth: 0,
  },

  tabStyle: {
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
    borderColor: 'transparent',
  },

  firstTabStyle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  lastTabStyle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  tabTextStyle: {
    fontFamily: theme.headerFont,
    color: colors.blue,
    fontSize: 14,
  },

  activeTabStyle: {
    backgroundColor: colors.green,
    marginTop: hp('0.5%'),
  },

  activeTabTextStyle: {
    fontFamily: theme.headerFont,
    color: colors.blue,
    fontSize: 14,
  },

  profileLayout: {
    flexDirection: 'column',
    elevation: 0,
    borderRadius: 2,
    borderWidth: 0,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 5,
  },

  tabView: {
    height: '15%',
  },
});
