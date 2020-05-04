import { StyleSheet } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  wrapper: {
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
    flex: 1,
  },

  navBar: {
    marginTop: 15,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  backView: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.label,
  },

  buttonTxt: {
    ...theme.buttonText,
    fontSize: hp('2%'),
  },

  flatListName: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  introMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
  },

  cardLayout: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    // elevation: 2,
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // shadowOffset: { height: 1, width: 0 },
    // marginTop: hp('1%'),
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
    //marginHorizontal: wp('5%'),
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusLayout: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  cardText: {
    fontFamily: theme.secondaryFont,
    color: colors.label,
    fontSize: theme.smallFont,
  },

  statusIcon: {
    height: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageLayout: {
    paddingBottom: wp('2%'),
  },

  messageTitle: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.headerThreeFont,
    color: theme.primaryTextColor,
    fontWeight: '700',
    paddingVertical: '1.5%',
  },

  messageBody: {
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
    textAlign: 'justify',
  },

  buttonLayout: {
    borderColor: theme.primaryColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    //width: '50%',
  },

  panelButtonTitle: {
    fontSize: 15,
    color: '#00000055',
    fontFamily: theme.secondaryFont,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '45%',
    height: 45,
    borderColor: '#00000055',
    borderWidth: 2,
    borderRadius: 23,
  },
});
