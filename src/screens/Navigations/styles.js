import { StyleSheet, Platform } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  drawerImageView: {
    flexDirection: 'column',
    backgroundColor: colors.blue,
    alignItems: 'center',
    height: Platform.OS === 'ios' ? '30%' : '25%',
    justifyContent: 'center',
  },

  userDetailView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  txtuser: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerFourFont,
    color: colors.white,
    //marginTop: 15,
  },

  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundColor,
  },

  draweIcon: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    tintColor: theme.primaryColor,
  },

  sidebarView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 4,
  },

  sidebarText: {
    fontSize: 15,
    fontFamily: theme.headerFont,
  },

  badgeLayout: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

  bottomTab: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    shadowOffset: { width: 5, height: 3 },
    shadowColor: 'gray',
    shadowOpacity: 0.2,
    elevation: 4,
    height: hp('7%'),
  },
});
