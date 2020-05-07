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
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: wp('6%'),
  },

  welcomeTextLayout: {
    flex: 1,
    justifyContent: 'center',
    marginTop: hp('20%'),
  },

  introText: {
    fontFamily: theme.headerFont,
    color: theme.primaryTextColor,
    fontSize: 36,
  },

  formLayout: {
    height: '100%',
    marginTop: '25%',
  },

  labelText: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: '#00000033',
  },

  buttonStyle: {
    ...theme.button,
    borderRadius: 30,
    width: '80%',
    height: 50,
    marginTop: 25,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: '#00000055',
    alignSelf: 'center',
  },

  buttonTxt: {
    ...theme.buttonText,
    color: '#00000055',
  },

  footerImageLayout: {
    height: '30%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
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
