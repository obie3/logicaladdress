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
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignContent: 'center',
  },

  navBg: {
    backgroundColor: theme.backgroundColor,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 1,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  icon: {
    position: 'absolute',
    top: 0,
    left: 35,
  },
  img: {
    width: 375,
    height: 550,
  },
  title: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: theme.headerFont,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: wp('6%'),
    paddingLeft: wp('6%'),
    alignItems: 'center',
  },

  navIcon: {
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
