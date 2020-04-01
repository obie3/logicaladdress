import { StyleSheet } from 'react-native';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
  },

  wrapper: {
    ...theme.wrapper,
    alignItems: 'center',
  },
  textInputView: {
    ...theme.inputField,
  },

  iconForm: {
    ...theme.formIcon,
  },
  btnView: {
    ...theme.buttonView,
  },

  buttonWithImage: {
    ...theme.button,
  },

  buttonTxt: {
    ...theme.buttonText,
  },

  iconDoor: {
    ...theme.buttonIcon,
  },

  titleTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

  topTxt: {
    fontSize: defaultTheme.MediumFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    // marginBottom: 16,
    paddingTop: 40,
    fontFamily: defaultTheme.primaryFont,
  },

  bottomTxt: {
    fontSize: defaultTheme.thinyFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: defaultTheme.secondaryFont,
    paddingRight: 10,
    paddingLeft: 10,
  },

  alert: {
    ...theme.alertNotification,
  },
});
