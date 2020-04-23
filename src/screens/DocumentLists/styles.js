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
    height: hp('30%'),
    backgroundColor: '#ecf0f1',
    borderRadius: wp('2%'),
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },

  editIconLayout: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'flex-end',
  },

  tabView: {
    flex: 1,
  },

  card: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: '3%',
    borderWidth: 0,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
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

  ImageLayout: {
    height: hp('50%'),
    width: wp('90%'),
  },

  upladMessage: {
    textAlign: 'center',
    fontFamily: theme.secondaryFont,
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
  },

  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,.9)',
    height: '100%',
    width: '100%',
    borderRadius: 6,
    padding: '4%',
    //marginTop: '30%',
  },

  cardImage: {
    borderRadius: 6,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  flatListItem: {
    width: '100%',
    borderRadius: 4,
    height: hp('33%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: '3%',
    padding: 0,
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardText1: {
    fontFamily: theme.secondaryFonts,
    color: theme.primaryTextColor,
    fontSize: theme.SmallFont,
  },

  cardText2: {
    fontFamily: theme.secondaryFonts,
    color: theme.primaryTextColor,
    fontSize: theme.SmallFont,
    paddingRight: wp('3%'),
  },

  cardTextLayout: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    padding: '4%',
    borderRadius: 6,
  },

  cardTextRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cardTextRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
