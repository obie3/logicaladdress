import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';
import Constants from 'expo-constants';

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    marginTop: 20 + Constants.statusBarHeight,
    //paddingBottom: Constants.statusBarHeight,
  },

  cardLayout: {
    flexDirection: 'column',
    borderRadius: 4,
    shadowColor: theme.primaryTextColor,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
  },

  cardContents: {
    minHeight: 40,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: -20,
  },

  cardIconLayout: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },

  cardIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verificationStatusLayout: {
    flexDirection: 'column',
    //padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
  },

  verificationIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    //justifyContent: 'space-around',
  },

  verificationText: {
    fontSize: theme.headerThreeFont,
    color: colors.label,
    fontWeight: '500',
    paddingRight: 6,
  },

  addressText: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerOneFont,
    color: colors.headerFontColor,
    fontWeight: 'bold',
    paddingLeft: '2%',
    paddingRight: '2%',
    //marginTop: '30%'
  },

  nameText: {
    fontSize: theme.headerFourFont,
    color: colors.headerFontColor,
    // fontWeight: 'bold',
  },

  fieldLabel: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerFourFont,
    color: colors.label,
  },

  profileItem: {
    flex: 2,
    justifyContent: 'center',
    marginTop: 2,
  },

  profileIconLayout: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileRowItem: {
    flexDirection: 'row',
    marginTop: 15,
  },

  avatarLayout: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5,
  },

  iconLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 20,
    height: 20,
    backgroundColor: '#2ecc71',
    marginTop: 5,
    marginRight: 15,
  },

  buttonLayout: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button: {
    ...theme.button,
    width: '50%',
    height: 40,
    marginTop: '2%',
  },

  buttonTxt: {
    fontFamily: theme.headerFont,
    color: theme.colorAccent,
    fontSize: theme.SmallFont,
  },
  overlay: {
    flex: 1,
    opacity: 0.9,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },

  profileHeader: {
    //backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
  },
});
