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
    justifyContent: 'center',
    alignContent: 'center',
  },

  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },

  uploadLayout: {
    flex: 3,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imageLayout: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignContent: 'center',
    resizeMode: 'contain',
  },

  documentMsgLayout: {
    height: '55%',
    justifyContent: 'flex-end',
  },

  headerText: {
    fontFamily: theme.secondaryFont,
    color: theme.primaryTextColor,
    paddingLeft: '2%',
    paddingRight: '2%',
    textAlign: 'center',
    fontSize: theme.SmallFont,
  },

  button: {
    ...theme.button,
    width: '100%',
    height: '80%',
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
    height: '35%',
    marginTop: '2%',
    //borderWidth: 1,
    borderRadius: 6,
  },

  buttonTxt: {
    fontFamily: theme.secondaryFont,
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
    height: '25%',
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
});
