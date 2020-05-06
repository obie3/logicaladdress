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

  avatarLayout: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20%',
    marginTop: '5%',
  },

  cameraButton: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.background,
    elevation: 5,
    textShadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    textShadowOffset: { width: 5, height: 2 },
    position: 'absolute',
    right: '10%',
    bottom: '0%',
  },

  sectionHeader: {
    fontFamily: theme.secondaryFont,
    color: colors.blue,
    fontSize: theme.headerFourFont,
  },

  sectionHeaderView: {
    height: hp('6%'),
    paddingLeft: wp('5%'),
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  green: {
    color: '#075e54',
    fontSize: 10,
  },

  headerIcons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
  },

  panel: {
    height: hp('60%'),
    padding: wp('3%'),
    // backgroundColor: '#f7f5eee8',
    backgroundColor: colors.white,
  },

  header: {
    width: '100%',
    //height: hp('20%'),
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: colors.white,
    height: hp('10%'),
    justifyContent: 'center',
  },
  panelHandle: {
    width: wp('10%'),
    height: hp('1%'),
    borderRadius: wp('2%'),
    backgroundColor: '#00000040',
    marginBottom: hp('1%'),
  },
  // panelTitle: {
  //   color: theme.primaryTextColor,
  //   fontFamily: theme.secondaryFont,
  //   fontSize: theme.smallFont,
  //   height: hp('5%'),
  //   textAlign: 'left',
  // },

  panelButton: {
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
  },

  panelButtonTitle: {
    fontSize: 12,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
});
