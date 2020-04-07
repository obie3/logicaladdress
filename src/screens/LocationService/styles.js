import { StyleSheet } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    paddingTop: 15,
  },

  wrapper: {
    ...theme.wrapper,
    // flex: 1,
    // justifyContent: 'center',
    // height:'50%',
    //  //alignContent: 'center',
    //  alignItems: 'center',
  },

  image: {
    width: 250,
    height: 250,
  },
  footerImage: {
    height: '20%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginBottom: 0,
    alignItems: 'flex-end',
    height: '20%',
  },

  messageText: {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: '5%',
  },
  greenButton: {
    ...theme.button,
    width: '50%',
    height: 40,
    backgroundColor: colors.green,
  },

  redButton: {
    ...theme.button,
    width: '50%',
    height: 40,
    backgroundColor: colors.errorRed,
  },

  buttonTxt: {
    ...theme.buttonText,
    fontSize: theme.SmallFont,
  },

  btnView: {
    ...theme.buttonView,
  },
});
