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
    backgroundColor: '#ecf0f1',
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  fieldLabel: {
    fontFamily: theme.secondaryFont,
    fontSize: hp('3%'),
    color: theme.primaryTextColor,
  },

  profileRowItem: {
    padding: hp('1.5%'),
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  numberItem: {
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: hp('52%') / 2,
    borderColor: colors.backgroundColor,
    borderWidth: 0,
  },

  deleteIcon: {
    height: hp('4%'),
    justifyContent: 'center',
  },

  dialIcon: {
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: hp('52%') / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },

  navBar: {
    width: '100%',
    height: hp('6%'),
    marginTop: hp('2%'),
    flexDirection: 'row',
  },

  backIconLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('5%'),
  },

  backIcon: {
    height: hp('5%'),
    width: wp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('36%') / 2,
    backgroundColor: colors.label,
  },

  phoneImage: {
    height: hp('20%'),
    width: wp('100%'),
    //resizeMode: 'cover',
  },

  requestMessage: {
    fontSize: hp('2.5%'),
    color: theme.primaryTextColor,
    fontFamily: theme.secondaryFont,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: hp('4%'),
  },

  formLayout: { flex: 1, justifyContent: 'flex-end' },
  textInput: {
    height: hp('8%'),
    //backgroundColor: '#ecf0f1',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
  },

  contentInputLayout: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '80%',
  },

  inputTextStyle: {
    fontSize: hp('3%'),
    fontFamily: theme.secondaryFont,
    color: theme.primaryTextColor,
    textAlign: 'center',
    justifyContent: 'center',
  },

  deleteIconView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '10%',
  },

  dialerLayout: { height: hp('50%'), alignItems: 'flex-end' },

  dialIconLayout: {
    height: hp('8%'),
    paddingBottom: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alert: {
    ...theme.alertNotification,
  },
});
