import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    justifyContent: 'center',
    alignContent: 'center',
  },

  wrapper: {
    flex: 1,
    paddingLeft: wp('3%'),
    paddingTop: hp('1%'),
    backgroundColor: '#ecf0f1',
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
    borderRadius: 30,
    width: '60%',
    height: 50,
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    borderWidth: 2,
    borderColor: colors.blue,
    backgroundColor: theme.backgroundColor,
  },

  buttonTxt: {
    ...theme.buttonText,
    color: colors.blue,
  },

  emptyListLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
