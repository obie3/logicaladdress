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
    color: '#fff',
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
    backgroundColor: '#fff',
    elevation: 1,
  },
  encrypt: {
    height: hp('10%'),
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  number: {
    height: 50,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    fontFamily: theme.secondaryFont,
    fontWeight: '400',
  },
  subText: {
    fontSize: theme.SmallFont,
    color: colors.label,
    fontFamily: theme.inputHintFont,
  },

  green: {
    color: '#075e54',
    fontSize: 10,
  },
});
