import { StyleSheet } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  headerTextView: {
    backgroundColor: 'transparent',
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    paddingBottom: hp('4%'),
  },

  headerTextViewTitle: {
    fontSize: 35,
    color: 'white',
    fontWeight: '300',
    //paddingBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.secondaryFont,
    color: theme.primaryTextColor,
  },
  headerTextViewSubtitle: {
    fontSize: 20,
    color: colors.blue,
    fontFamily: theme.secondaryFont,
  },

  sectionHeader: {
    fontFamily: theme.secondaryFont,
    color: colors.blue,
    fontSize: theme.headerThreeFont,
  },

  sectionHeaderView: {
    height: hp('6%'),
    paddingLeft: wp('5%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '600',
    marginTop: 270,
    padding: 20,
  },
  card: {
    elevation: 3,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
  },
  row: {
    height: 50,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: colors.white,
    elevation: 1,
  },
  encrypt: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: colors.white,
  },
  number: {
    height: 50,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: theme.smallFont,
    color: theme.primaryTextColor,
    fontFamily: theme.secondaryFont,
    fontWeight: '400',
  },
  subText: {
    fontSize: theme.smallFont,
    color: colors.label,
    fontFamily: theme.inputHintFont,
  },

  headerIcons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
  },

  button: {
    ...theme.button,
    borderRadius: 30,
    width: '60%',
    height: 50,
    marginTop: 25,
    backgroundColor: '#ecf0f1',
    borderWidth: 2,
    borderColor: colors.blue,
    alignSelf: 'center',
  },

  buttonTxt: {
    ...theme.buttonText,
    color: colors.blue,
  },
});
