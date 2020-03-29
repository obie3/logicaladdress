import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import colors from '../../assets/colors';
import theme from '../../assets/theme';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : "center",
    
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
     
  },
  headerIcon: {
    height: 16,
    width: 16,
    tintColor : theme.primaryColor,
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
    width: '100%'
  },
  nameView: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    marginRight : 16
  },
  txtHeader: {
    fontSize: 18,
    color: theme.primaryTextColor,
    width : '100%'
  },
  firstTxt: {
    marginTop : 16,
    fontSize: theme.LargeFont,
    color: theme.primaryTextColor,
    fontFamily: theme.headerFont,
    textAlign : 'center'
  },
  secondText :{
    fontSize: theme.LargeFont,
    color: theme.primaryTextColor,
    fontFamily: theme.headerFont,
    position : 'absolute',
    right : -70,
    bottom : -29,
  },
  textView : {
    width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgView : {
    justifyContent: 'center',
    marginTop : 70,
  },
  // button
  btnViewNext : {
    width : '100%',
    alignItems : "center",
    justifyContent: 'center',
    marginTop : 60
  },
  buttonView :{
    flexDirection : 'row',
    width : '30%',
    height : 40,
    marginTop : 16,
    justifyContent: 'center',
    alignItems : 'center',
  },
  txtNext : {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,

  },
  nextIcon : {
    width : 14,
    height : 14,
    resizeMode : 'contain',
    marginLeft : 4,
    tintColor : theme.primaryColor
  },
});