import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width / 6;
import colors from 'assets/colors';
import theme from 'assets/theme';

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
  },

  wrapper: {
    ...theme.wrapper,
    //justifyContent: 'space-evenly',
  },

  btnView: {
    ...theme.buttonView,
  },
  signupLinkView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  signupText: {
    ...theme.buttonText,
  },

  signupLink: {
    fontSize: 15,
    color: colors.gold,
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },

  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: null,
  },
  createAccount: {
    fontSize: theme.SmallFont,
    color: theme.primaryColor,
    fontFamily: theme.secondaryFont,
    alignSelf: 'center',
  },

  signupText: {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    fontFamily: theme.secondaryFont,
    alignSelf: 'center',
    marginBottom: 4,
  },
  signupWith: {
    color: theme.primaryTextColor,
    marginBottom: 8,
    fontFamily: theme.subHeaderFont,
    fontSize: theme.thinyFont,
  },
  signWithView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 16,
  },
  socialIconView: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  socialIcons: {
    height: 24,
    width: 24,
    tintColor: theme.primaryTextColor,
    marginLeft: 2,
  },
  logoTxt: {
    fontFamily: 'Poppins-ExtraBold',
    color: colors.white,
    fontSize: 55,
    alignSelf: 'center',
    marginTop: '25%',
  },

  textInputView: {
    ...theme.inputField,
  },

  iconForm: {
    ...theme.formIcon,
  },

  buttonWithImage: {
    ...theme.button,
    borderRadius: 30,
    width: '60%',
    height: 45,
    marginTop: 25,
  },

  buttonTxt: {
    ...theme.buttonText,
  },

  iconDoor: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginLeft: 24,
  },

  logoIcon: {
    width: '60%',
    height: '50%',
    resizeMode: 'contain',
  },

  imageView: {
    width: '90%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  termCondition: {
    fontSize: theme.thinyFont,
    color: theme.darkGray,
    // marginTop: 8,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
    position: 'absolute',
    right: Platform.OS === 'ios' ? 75 : 65,
  },

  LogoLayout: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  alert: {
    ...theme.alertNotification,
  },
});
