import { StyleSheet, Dimensions } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },

  navBg: {
    backgroundColor: theme.backgroundColor,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 1,
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: wp('6%'),
    paddingLeft: wp('6%'),
    alignItems: 'center',
  },

  headerText: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: theme.headerFont,
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
  },

  cardLayout: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    elevation: 2,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
    marginTop: hp('1%'),
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
    alignItems: 'center',
  },

  cardText: {
    fontFamily: theme.secondaryFont,
    color: colors.label,
    fontSize: theme.smallFont,
  },

  messageLayout: {
    paddingRight: wp('4%'),
    paddingLeft: wp('4%'),
    paddingBottom: wp('4%'),
  },

  messageTitle: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.headerThreeFont,
    color: theme.primaryTextColor,
  },

  messageBody: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
    textAlign: 'justify',
  },

  buttonStyle: {
    backgroundColor: colors.white,
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: hp('52%') / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
    elevation: 3,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
  },

  logoutLayout: {
    position: 'absolute',
    bottom: hp('5%'),
    alignSelf: 'flex-end',
  },

  forwardIcon: {
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
