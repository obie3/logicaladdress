import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
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
  navBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 40 : 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
    shadowColor: theme.secondaryTextColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  headerIcon: {
    height: 18,
    width: 18,
    tintColor: theme.primaryColor,
  },
  headerLogoIcon: {
    height: 35,
    width: 80,
  },
  headerImage: {
    borderRadius: 30,
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  balanceTxtView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '50%',
  },
  nameView: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHeader: {
    fontSize: 18,
    color: theme.primaryTextColor,
    marginLeft: 16,
    alignSelf: 'center',
    fontFamily: theme.secondaryFont,
  },

  profileRowItem: {
    //padding: hp('1.5%'),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },

  flatListItem: {
    backgroundColor: '#ecf0f1',
    justifyContent: 'space-around',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),

    flexDirection: 'row',
    width: wp('100%'),

    height: hp('8%'),
    //borderRadius: 52 / 2,
    // borderColor: colors.backgroundColor,
    borderWidth: 0,
  },

  flatListText: {
    fontFamily: theme.inputHintFont,
    fontSize: hp('2.5%'),
    color: colors.blue,
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
    //...elevation,
    backgroundColor: theme.colorAccent,
  },

  radioButton: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    borderRadius: 10,
  },

  btnView: {
    ...theme.buttonView,
  },

  buttonWithImage: {
    ...theme.button,
    borderRadius: 30,
    width: wp('45%'),
    height: hp('6%'),
    marginTop: 25,
  },

  buttonTxt: {
    ...theme.buttonText,
    fontSize: hp('2%'),
  },

  flatListName: { width: '50%', alignItems: 'center', flexDirection: 'row' },

  hrLine: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
});
