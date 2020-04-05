import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from 'assets/theme';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width / 10;

let styles = StyleSheet.create({
  container: {
    ...theme.container,
  },

  wrapper: {
    ...theme.wrapper,
    //backgroundColor: 'green'
  },

  iconForm: {
    ...theme.formIcon,
  },

  buttonTxt: {
    ...theme.buttonText,
  },
  iconDoor: {
    ...theme.buttonIcon,
  },
  textInputView: {
    ...theme.inputField,
  },

  btnView: {
    ...theme.buttonView,
  },

  buttonWithImage: {
    ...theme.button,
    marginTop: 25,
  },

  footerView: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  signupLinkView: {
    flexDirection: 'row',
    marginTop: 8,
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

  signWithView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 16,
  },

  socialIconView: {
    flexDirection: 'row',
    paddingTop: 4,
  },

  socialIcons: {
    height: 24,
    width: 24,
    tintColor: theme.primaryTextColor,
    marginLeft: 2,
  },

  signupWith: {
    color: theme.primaryTextColor,
    marginBottom: 8,
    fontFamily: theme.subHeaderFont,
    fontSize: theme.thinyFont,
  },

  termCondition: {
    fontSize: theme.thinyFont,
    color: theme.darkGray,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
    position: 'absolute',
    right: Platform.OS === 'ios' ? 75 : 65,
  },

  logoIcon: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },

  LogoLayout: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alert: {
    ...theme.alertNotification,
  },

  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: '20%',
    width: '100%',
  },
});

export default styles;
