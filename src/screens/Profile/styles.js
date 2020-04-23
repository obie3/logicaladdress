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
    justifyContent: 'flex-start',
    alignContent: 'center',
  },

  navBg: {
    backgroundColor: theme.backgroundColor,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 1,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  icon: {
    position: 'absolute',
    top: 0,
    left: 35,
  },
  img: {
    width: 375,
    height: 550,
  },
  title: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: theme.headerFont,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: wp('6%'),
    paddingLeft: wp('6%'),
    alignItems: 'center',
  },

  navIcon: {
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },

  uploadLayout: {
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imageLayout: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    resizeMode: 'contain',
  },

  documentMsgLayout: {
    marginTop: '30%',
    height: '40%',
    justifyContent: 'flex-end',
  },

  headerText: {
    fontFamily: theme.inputHintFont,
    color: colors.blue, //colors.headerFontColor,
    fontWeight: 'bold',
    paddingLeft: '2%',
    paddingRight: '2%',
    //paddingBottom : '4%',
    textAlign: 'center',
    fontSize: theme.headerThreeFont,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },

  btnView: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35%',
  },

  btnIcon: {
    ...theme.buttonIcon,
    marginLeft: 4,
  },

  altLinkLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  tabView: {
    flex: 1,
  },

  card: {
    flex: 1,
    borderWidth: 1,
    borderWidth: 0,
    justifyContent: 'center',
  },

  cardLayout: {
    flexDirection: 'column',
    borderRadius: 4,
    shadowColor: theme.primaryTextColor,
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
    alignItems: 'center',
  },

  verificationIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
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
    marginTop: 25,
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

  overlay: {
    flex: 1,
    opacity: 0.9,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },

  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
  },

  imageButton: {
    marginTop: 25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    width: '30%',
    height: 45,
    borderWidth: 0.5,
    borderColor: colors.blue,
  },

  button: {
    ...theme.button,
    marginTop: 25,
  },

  buttonTxt: {
    ...theme.buttonText,
  },
  btnIcon: {
    ...theme.buttonIcon,
  },
});
