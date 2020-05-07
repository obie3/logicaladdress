import { StyleSheet, Platform } from 'react-native';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors';

let styles = StyleSheet.create({
  container: {
    ...theme.container,
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: wp('6%'),
  },

  buttonTxt: {
    ...theme.buttonText,
    color: '#00000055',
  },

  buttonStyle: {
    ...theme.button,
    borderRadius: 30,
    width: '80%',
    height: 50,
    marginTop: 25,
    alignSelf: 'center',
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: '#00000055',
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
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: '20%',
    width: '100%',
  },

  welcomeTextLayout: {
    height: '10%',
    justifyContent: 'center',
    marginTop: hp('10%'),
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
    marginVertical: '1%',
  },

  footerImageLayout: {
    //flex:1,
    height: '30%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  footerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  labelLayout: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '4%',
    justifyContent: 'space-between',
  },

  formLayout: {
    backgroundColor: 'white',
    marginTop: '15%',
    flex: 2,
  },
});

export default styles;
