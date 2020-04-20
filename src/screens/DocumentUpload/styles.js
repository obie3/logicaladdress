import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';
import Constants from 'expo-constants';

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    // backgroundColor: colors.blue,
    justifyContent: 'center',
    alignContent: 'center',
  },

  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    backgroundColor: 'green',
  },

  uploadLayout: {
    flex: 2,
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

  button: {
    ...theme.button,
    width: '100%',
    height: '100%',
    marginTop: '2%',
    borderColor: 'white',
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 6,
    backgroundColor: colors.backgroundColor,
    borderColor: colors.blue,
  },

  button2: {
    ...theme.button,
    width: '100%',
    height: '30%',
    marginTop: '2%',
    //borderWidth: 1,
    borderRadius: 6,
  },

  buttonTxt: {
    fontFamily: theme.headerFont,
    color: theme.colorAccent,
    fontSize: theme.SmallFont,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 35,
    width: 35,
  },

  editIconWrapper: {
    marginTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  horizontalRule: {
    alignSelf: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bdc3c7',
    width: '40%',
    marginBottom: 10,
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
    //padding: 10,
    //height: 20,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },

  card: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'black',
    // shadowColor: '#ccc',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    borderWidth: 0,
    justifyContent: 'center',
  },
});
