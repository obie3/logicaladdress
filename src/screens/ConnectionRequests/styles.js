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
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignContent: 'center',
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  avatarLayout: {
    alignSelf: 'center',
    alignItems: 'center',
  },

  nameText: {
    fontSize: theme.headerOneFont,
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
    marginTop: hp('2%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    alignItems: 'center',
  },

  requestFieldNames: {
    fontSize: theme.headerFourFont,
    fontFamily: theme.secondaryFont,
    color: colors.primaryTextColor,
  },

  iconLayout: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: wp('4%'),
  },

  title: {
    color: colors.blue,
    fontFamily: theme.headerFont,
    fontSize: theme.SmallFont,
    padding: 10,
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

  introMessage: {
    marginTop: hp('1%'),
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
  },

  scrollViewStyle: {
    flex: 1,
  },

  emptyListLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  panel: {
    height: hp('55%'),
    padding: wp('3%'),
    backgroundColor: '#f7f5eee8',
  },

  header: {
    width: '100%',
    height: hp('20%'),
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: colors.white,
    height: hp('20%'),
    justifyContent: 'center',
  },
  panelHandle: {
    width: wp('10%'),
    height: hp('1%'),
    borderRadius: wp('2%'),
    backgroundColor: '#00000040',
    marginBottom: hp('1%'),
  },
  panelTitle: {
    color: theme.primaryTextColor,
    fontFamily: theme.secondaryFont,
    fontSize: theme.SmallFont,
    height: hp('5%'),
    textAlign: 'left',
  },

  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  panelButton: {
    ...theme.buttonView,
  },

  button: {
    ...theme.button,
  },
  panelButtonTitle: {
    ...theme.buttonText,
  },

  flatListItem: {
    justifyContent: 'space-around',
    paddingRight: wp('10%'),
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('4%'),
    borderWidth: 0,
  },

  flatListText: {
    fontFamily: theme.secondaryFont,
    fontSize: hp('2.5%'),
    color: theme.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioButtonLayout: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorAccent,
  },

  radioButton: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    borderRadius: 10,
  },

  flatListName: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
