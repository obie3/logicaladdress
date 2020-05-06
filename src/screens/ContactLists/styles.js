import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
  },

  wrapper: {
    flex: 1,
    paddingLeft: wp('3%'),
    marginTop: hp('1%'),
  },

  nameText: {
    fontSize: theme.headerTwoFont,
    fontFamily: theme.headerFont,
    color: theme.primaryTextColor,
  },

  fieldLabel: {
    fontFamily: theme.inputHintFont,
    fontSize: theme.headerFourFont,
    color: '#00000055',
  },

  profileRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('9%'),
    justifyContent: 'space-between',
    //marginTop:10
  },

  avatarIconLayout: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //paddingRight: wp('4%'),
  },

  listName: {
    marginLeft: wp('5%'),
  },

  iconLayout: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: wp('3%'),
  },

  contactsImage: {
    height: hp('50%'),
    width: wp('90%'),
  },

  connectMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
  },

  btnView: {
    ...theme.buttonView,
  },

  button: {
    ...theme.button,
    borderRadius: 10,
    width: '60%',
    height: hp('6%'),
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },

  buttonTxt: {
    ...theme.buttonText,
    fontFamily: theme.headerFont,
    color: theme.colorAccent,
    fontSize: theme.smallFont,
  },

  scrollViewStyle: {
    flex: 1,
  },

  emptyListLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
