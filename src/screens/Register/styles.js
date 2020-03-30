import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import colors from 'assets/colors';
import theme from 'assets/theme';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },

  iconForm: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },

  buttonTxt: {
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    fontSize: 18,
    alignSelf: 'center',
  },
  iconDoor: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginLeft: 24,
  },
  textInputView: {
    width: '100%',
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: theme.secondaryTextColor,
  },

  wrapper: {
    flex: 1,
    paddingLeft: Platform.OS === 'ios' ? 30 : 30,
    paddingRight: Platform.OS === 'ios' ? 30 : 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnView: {
    alignItems: 'center',
    width: '100%',
  },

  buttonWithImage: {
    borderRadius: 30,
    width: '60%',
    height: 45,
    backgroundColor: theme.buttonPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    paddingRight: 8,
  },

  footerView: {
    width: '100%',
    position: 'absolute',
    bottom: -35,
    right: 30,
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
});

export default styles;
