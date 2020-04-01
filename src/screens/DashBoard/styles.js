import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  navBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
    shadowColor: theme.secondaryTextColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  viewBody: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-evenly',
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  verificationIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  verificationText: {
    fontSize: theme.headerOneFont,
    color: colors.label,
    fontWeight: 'bold',
    paddingRight: 6,
  },

  phoneText: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerOneFont,
    color: colors.headerFontColor,
    fontWeight: 'bold',
  },

  nameText: {
    fontSize: theme.headerFourFont,
    color: colors.headerFontColor,
    fontWeight: 'bold',
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
    marginTop: 25,
  },

  avatarLayout: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
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
  },

  buttonTxt: {
    fontFamily: theme.headerFont,
    color: theme.colorAccent,
    fontSize: theme.SmallFont,
  },
});
