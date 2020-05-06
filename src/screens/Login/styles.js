import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    justifyContent: 'center',
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingVertical: wp('6%'),
  },

  btnView: {
    ...theme.buttonView,
  },

  textInputView: {
    ...theme.inputField,
  },

  iconForm: {
    ...theme.formIcon,
  },

  buttonWithImage: {
    ...theme.button,
    borderRadius: 6,
    width: '100%',
    height: 45,
    marginTop: 25,
  },

  buttonTxt: {
    ...theme.buttonText,
  },

  logoLayout: {
    backgroundColor: 'green',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: '20%',
    resizeMode: 'contain',
    padding: 10,
  },

  welcomeTextLayout: {
    height: '30%',
    justifyContent: 'center',
    marginTop: hp('5%'),
  },

  introText: {
    fontFamily: theme.headerFont,
    color: theme.primaryTextColor,
    fontSize: 36,
  },

  labelText: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: '#00000033',
  },

  footerImageLayout: {
    flexDirection: 'row',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  footerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  alert: {
    ...theme.alertNotification,
  },
});
