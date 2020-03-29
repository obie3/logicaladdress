import { StyleSheet, Platform, Dimensions} from 'react-native';
import Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme'


export const CELL_SIZE = 50;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  cell: {
    margin: 0,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  closeView : {
    width : 40,
    height : 40,
    marginLeft : 10,
    marginTop : 10,
    backgroundColor : 'transparent',
    justifyContent: 'center',
    alignItems : 'center',
  }, 
  closeIcon : {
    width : 18,
    height : 18,
    tintColor : colors.green_background
  },
  wrapper : {
    
  },
  textView : {
    justifyContent: 'center',
    alignItems : 'center',
    padding : 20,
  },
  Verification : {
    fontSize: theme.SmallFont,
    color: colors.darkSilver,
    marginTop: 15,
    fontFamily: theme.headerFont,
    alignSelf: 'center',
  },
  msgText: {
    fontSize: theme.SmallFont,
    color: colors.darkSilver,
    marginTop: 8,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
  },
  msgText2: {
    fontSize: theme.SmallFont,
    color: colors.darkSilver,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
  },
  resend : {
    fontSize: theme.SmallFont,
    marginTop : 8,
    color: colors.green_background,
    fontFamily: theme.headerFont,
    alignSelf: 'center',
  },
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: 40,
    backgroundColor: colors.white,
    borderRadius : 25,
  },
  btnText : {
    fontSize: theme.MediumFont,
    color: colors.white,
    fontFamily: theme.headerFont,
    alignSelf: 'center',    
  },

  // otp design
  optView : { 
    marginTop : '20%',
    justifyContent: 'center',
    padding : 20,
  },
  btnView: {
    alignItems : 'center',
    width : '100%',
    marginTop : 30,
  },
  buttonWithImage : {
    borderRadius : 30,
    width : '60%',
    height : 45,
    backgroundColor : theme.buttonPrimary,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    marginTop : 25,
    paddingRight : 8,
  },
  iconDoor : {
    height : 18,
    width : 18,
    resizeMode : 'contain',
    marginLeft: 24,
  },
  buttonTxt : {
    fontFamily : theme.headerFont,
    color : theme.colorAccent,
    fontSize: theme.SmallFont,
    alignSelf : 'center',
  },

  tokenText: {
    fontFamily : theme.headerFont,
    color : theme.msgText,
    fontSize: theme.SmallFont,
  },
  alert: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    
  }

});

export default styles;
