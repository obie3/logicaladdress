import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');
import Constants from 'expo';
export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignContent: 'center',
  },

  wrapper: {
    flex: 1,
    // paddingLeft: 20,
    // paddingRight: 20,
    justifyContent: 'center',
    //marginTop: 10 + Constants.statusBarHeight,
    //marginBottom: 10 + Constants.statusBarHeight,
  },

  avatarLayout: {
    alignSelf: 'center',
    alignItems: 'center',
    // marginTop: 10 + Constants.statusBarHeight,
  },

  verificationIndicators: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    //backgroundColor: 'blue'
  },

  verificationText: {
    fontSize: theme.headerThreeFont,
    color: colors.label,
    fontWeight: '500',
  },

  addressText: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerOneFont,
    color: colors.blue, //colors.headerFontColor,
    fontWeight: 'bold',
    paddingLeft: '2%',
    paddingRight: '2%',
  },

  nameText: {
    fontSize: theme.headerFourFont,
    fontFamily: theme.headerFont,
    color: colors.blue, //colors.headerFontColor,
  },

  fieldLabel: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerFourFont,
    color: colors.label,
  },

  profileRowItem: {
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 10,
  },

  editIconLayout: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'flex-end',
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

  tabsContainerStyle: {
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 2,
    borderWidth: 0, //StyleSheet.hairlineWidth,
    flex: 1,
  },

  tabStyle: {
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
    borderColor: 'transparent',
  },

  firstTabStyle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  lastTabStyle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  tabTextStyle: {
    fontFamily: theme.headerFont,
    color: colors.blue,
    fontSize: 14,
  },

  activeTabStyle: {
    backgroundColor: colors.green,
    marginTop: 2,
  },

  activeTabTextStyle: {
    fontFamily: theme.headerFont,
    color: colors.blue,
    fontSize: 14,
  },

  textInputView: {
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: colors.blue,
  },

  dialogContainer: {
    //backgroundColor : colors.blue
  },

  headerStyle: {
    fontFamily: theme.headerFont,
    color: colors.blue,
    fontSize: 14,
  },

  profileLayout: {
    flex: 1,
    flexDirection: 'column',
    elevation: 0,
    borderRadius: 2,
    borderWidth: 0,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 5,
  },

  segmentHeader: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  detailsTabView: {
    flexDirection: 'row',
    marginTop: 15,
    height: '20%',
  },

  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 35,
    width: 35,
    //marginTop: 16,
    //backgroundColor: 'skyblue',
  },

  editIconWrapper: {
    marginTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  title: {
    color: colors.blue,
    fontFamily: theme.headerFont,
    fontSize: theme.SmallFont,
    padding: 10,
  },
  buttonText: {
    color: 'rgba(231, 37, 156, 0.5)',
  },
  navGroup: {
    justifyContent: 'flex-end',
  },
  navButton: {
    flex: 0,
  },
  image: {
    width: 30,
    height: 25,
  },

  tabView: {
    flex: 1,
    //padding: 10,
    //height: 20,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#fff',
    // shadowColor: '#ccc',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    borderWidth: 0,
    justifyContent: 'center',
  },

  navBar: {
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // default iOS styles:
    backgroundColor: '#f5f5f5',
    height: Platform.OS === 'ios' ? StatusBar.currentHeight : null,
    paddingLeft: 8,
    paddingRight: 8,
    // default Android styles:
    // backgroundColor: 'white',
    // height: ANDROID_NAV_BAR_HEIGHT,
    //padding: 16,
  },

  contactsImage: {
    height: hp('50%'),
    width: wp('90%'),
    //resizeMode: 'cover',
  },

  connectMessage: {
    textAlign: 'center',
    fontFamily: theme.headerFont,
    fontSize: theme.SmallFont,
    color: colors.blue,
  },

  btnView: {
    ...theme.buttonView,
  },

  buttonWithImage: {
    ...theme.button,
    borderRadius: 10,
    width: '60%',
    height: hp('7%'),
    marginTop: hp('2%'),
  },

  buttonTxt: {
    ...theme.buttonText,
    fontFamily: theme.headerFont,
    color: theme.colorAccent,
    fontSize: theme.SmallFont,
  },

  iconDoor: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginLeft: 24,
  },
});
