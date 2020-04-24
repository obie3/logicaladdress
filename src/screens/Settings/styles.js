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
    backgroundColor: '#ecf0f1',
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
    marginTop: hp('3%'),
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
  },

  cardLayout: {
    height: hp('8%'),
    backgroundColor: colors.white,
    elevation: 2,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
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
    color: '#95a5a6',
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
    bottom: hp('5%'),
    alignSelf: 'flex-end',
  },

  forwardIcon: {
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
