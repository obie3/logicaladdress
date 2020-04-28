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
    //justifyContent: 'center',
  },

  nameText: {
    fontSize: theme.headerFourFont,
    fontFamily: theme.headerFont,
    color: colors.blue,
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

  contactsImage: {
    height: hp('50%'),
    width: wp('90%'),
  },

  connectMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.SmallFont,
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
    fontSize: theme.SmallFont,
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
