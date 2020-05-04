import colors from '../colors';
import Constants from 'expo-constants';

export default defaultTheme = {
  // Font Sizes
  XlargeFont: 35,
  LargeFont: 24,
  MediumFont: 20,
  smallFont: 16,
  SmallerFont: 14,
  thinyFont: 12,

  headerOneFont: 24,
  headerTwoFont: 22,
  headerThreeFont: 18,
  headerFourFont: 16,
  headerFiveFont: 14,
  tinyFont: 12,

  //Colors
  primaryTextColor: colors.darkText,
  secondaryTextColor: colors.gray,
  buttonPrimary: colors.buttonBlue,
  buttonSecondry: colors.yellow,
  bgColorPrimary: colors.white,
  colorAccent: colors.white,
  primaryColor: colors.blue,
  toolBarColor: colors.white,
  backgroundColor: colors.background,
  tintColor: colors.buttonBlue,
  formBorderColor: colors.gray,
  textGray: colors.textGray,
  iconColor: colors.iconColor,
  activeIconColor: colors.activeIconColor,
  disabledIconColor: colors.disabledIconColor,

  // Font Type
  primaryFont: 'Poppins-Bold',
  secondaryFont: 'Poppins-Regular',
  semiBoldFont: 'Poppins-SemiBold',
  LightPoppins: 'Poppins-Light',
  headerFont: 'Poppins-Medium',
  subHeaderFont: 'Orkney-Light',
  inputHintFont: 'Orkney-Medium',

  button: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    width: '60%',
    height: 45,
    //marginTop: 25,
  },

  inputField: {
    width: '100%',
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: colors.gray,
  },

  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  wrapper: {
    height: '80%',
    paddingLeft: Platform.OS === 'ios' ? 30 : 30,
    paddingRight: Platform.OS === 'ios' ? 30 : 30,
    // justifyContent: 'flex-end',
    //backgroundColor: 'green'
  },

  formIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },

  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    fontSize: 18,
    alignSelf: 'center',
  },

  buttonIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginLeft: 24,
  },

  buttonView: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },

  alertNotification: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
  },
};

// POPPINS: for Headers
// ORKNEY: for subs
