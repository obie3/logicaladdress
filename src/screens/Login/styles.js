import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width / 10;

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    justifyContent: 'center',
  },

  wrapper: {
    ...theme.wrapper,
    justifyContent: 'center',
  },

  btnView: {
    ...theme.buttonView,
  },
  signupLinkView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
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

  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: '20%',
    width: '100%',
  },

  alert: {
    ...theme.alertNotification,
  },
});
