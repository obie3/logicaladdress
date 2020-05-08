import { StyleSheet } from 'react-native';
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

  wrapper: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    paddingHorizontal: wp('3%'),
  },

  introMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },

  cardLayout: {
    height: hp('8%'),
    backgroundColor: colors.white,
    elevation: 1,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
    marginBottom: 3,
  },

  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
    alignItems: 'center',
  },

  cardText: {
    fontFamily: theme.secondaryFont,
    color: theme.primaryTextColor, //'#95a5a6',
    fontSize: theme.smallFont,
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
    bottom: hp('1%'),
    alignSelf: 'flex-end',
  },

  forwardIcon: {
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});
