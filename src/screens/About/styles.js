import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 40 : 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
    shadowColor: theme.secondaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,  
  },
  headerIcon: {
    height: 18,
    width: 18,
    tintColor : theme.primaryColor,
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
    marginLeft : 8,
  },
  balanceTxtView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '50%'
  },
  nameView: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems : 'center'
  },
  txtHeader: {
    fontSize: 18,
    color: theme.primaryTextColor,
    marginLeft: 16,
    alignSelf: 'center',
    fontFamily : theme.secondaryFont
  },
  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Poppins-Regular',
    marginLeft: 16
  },
  aboutView : {
    flex : 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding : 16,
    // backgroundColor : colors.black

  },
  aboutGridView : {
    width : '100%',
    height : '65%',
    flexDirection : 'row',
    flexWrap : 'wrap',
    marginTop : '15%',
    justifyContent : 'space-between',
    // backgroundColor : theme.colorAccent
  },
  gridBox :{
    width : "49%",
    height : "50%",
    borderRadius : 2,
    marginTop : '2%'

  },
  overlay : {
    height : '100%',
    width : '100%',
    backgroundColor : 'rgba(3,31,38,0.5)',
    flexDirection : 'row',
    justifyContent : 'space-between',
    padding : 8,
    paddingRight : 4

  },
  gridText : {
    fontFamily : theme.headerFont,
    color : theme.colorAccent,
    fontSize : theme.SmallerFont,
  },
  overflowIcon : {
    tintColor : theme.colorAccent,
    height : 18,
    width : 18,
    marginTop : 2
  },
});