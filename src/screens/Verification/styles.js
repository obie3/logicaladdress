import { StyleSheet } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';

export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  container: {
    ...theme.container,
  },

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
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  // =======================
  closeView: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navBar: {
    marginTop: 20,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  backView: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.label,
  },

  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  Verification: {
    fontSize: theme.smallFont,
    color: colors.darkSilver,
    marginTop: 15,
    fontFamily: theme.headerFont,
    alignSelf: 'center',
  },

  msgText: {
    fontSize: theme.smallFont,
    color: colors.darkSilver,
    marginTop: 8,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
  },

  msgText2: {
    fontSize: theme.smallFont,
    color: colors.darkSilver,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
  },

  resend: {
    fontSize: theme.smallFont,
    marginTop: 8,
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
    borderRadius: 25,
  },

  buttonTxt: {
    ...theme.buttonText,
    color: colors.blue,
  },

  optView: {
    justifyContent: 'center',
    padding: 10,
  },

  btnView: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },

  buttonStyle: {
    borderRadius: 30,
    width: '80%',
    height: 50,
    backgroundColor: theme.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    borderColor: colors.blue,
    borderWidth: 2,
    //paddingRight: 8,
  },

  iconDoor: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginLeft: 24,
  },

  alert: {
    ...theme.alertNotification,
  },
});

export default styles;
