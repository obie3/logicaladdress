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
  },

  nameText: {
    fontSize: theme.SmallFont,
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

  emptyListLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  flatListName: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
