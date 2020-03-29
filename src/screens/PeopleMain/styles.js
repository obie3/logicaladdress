import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
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

  searchView : {
    width : '100%',
    marginTop : 8,
    backgroundColor : theme.colorAccent,
    height : 50,
    borderRadius : 4,
    elevation : 1,
    flexDirection : 'row',
    paddingLeft : 16,
    alignItems : 'center'
  },
  viewBody : {
    alignItems : 'center',
    flex : 1,
    // padding : 20
  },
  wrapper: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 10,
    width : '100%',
    alignItems : 'center',
  },
  viewBody : {
    flex : 1,
    alignItems: 'center',
    width : '100%'
  },
  mainView : {
    flex : 1,
    padding : 20,
    alignItems : 'center',
  },
  roundImageView : {
    height : 120,
    width : 120,
    backgroundColor : theme.colorAccent,
    elevation : 2,
    shadowOffset : {height : 2, width : 0},
    shadowOpacity : 0.25,
    shadowColor : theme.primaryTextColor,
    shadowRadius : 2.56,
    borderRadius : (Platform.OS === 'ios') ? 100 : 100,
    marginTop : 16,
    justifyContent: 'center',
    alignItems : 'center',
    padding: 2
  },
  imageStyle : {
    width : 115,
    height : 115,
    borderRadius : (Platform.OS ==='ios') ? 55 : 100,
    resizeMode : 'cover'
  },
  cameraTouch : {
    width : 40,
    height : 40,
    borderRadius : 50,
    backgroundColor : theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    opacity : 0.5,
    position : 'absolute',
    left : 90,
    top : 60
  },
  cameraIcon : {
    width : 20,
    height : 20,
    resizeMode : 'contain'
  },
  profileNameTxt : {
    fontFamily : theme.semiBoldFont,
    fontSize :(Platform.OS === 'ios') ? theme.MediumFont : theme.SmallFont,
    marginTop : 8
  },
  line : {
    width : '100%',
    height : 0.5,
    backgroundColor : theme.formBorderColor,
    marginTop : 8
  },
  formHeaderTxt: {
    fontSize :(Platform.OS === 'ios') ? theme.MediumFont : theme.SmallFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont,
    marginTop : 8
  },
  aboutTxt: {
    fontSize :(Platform.OS === 'ios') ? theme.SmallerFont : theme.thinyFont,
    color : theme.secondaryTextColor,
    textAlign : 'justify',
    fontFamily : theme.inputHintFont,
  },
  socialMediaView : {
    flexDirection : 'column',
    marginTop : 25,
  },
  titleText : {
    fontSize :(Platform.OS === 'ios') ? theme.MediumFont : theme.SmallFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont
  },
  socialTitleText : {
    fontSize :(Platform.OS === 'ios') ? theme.MediumFont : theme.SmallFont,
    color : theme.textGray,
    fontFamily : theme.inputHintFont
  },
  
  textView : {
    width : '100%',
    flexDirection : 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,
    // paddingTop : 4,
    paddingBottom : 4,
    marginTop : 4,
  },
  textViewUserRole : {
    width : '100%',
    flexDirection : 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,
    // paddingTop : 4,
    paddingBottom : 4,
    marginTop : 16,
  },
  socialView : {
    flexDirection : 'row', 
    justifyContent : 'space-between'
  },
  bodyView : {
    flexDirection : 'column',
    padding : 20,
    paddingTop : 4,
    paddingLeft : 8
  },
  bodyViewPhone: {
    flexDirection : 'column',
    padding : 2,
    paddingTop : 4,
    paddingLeft : 8
  },
  dot : {
    height : 18,
    width : 18,
    backgroundColor : theme.primaryColor,
    borderRadius : 15,
    marginRight : 8
  },
  socialIcon : {
    width : 16,
    height : 16,
    resizeMode : 'contain',
    marginRight : 8,
    tintColor : theme.primaryColor,
    // marginTop : 8
  },
  hanlenameView : {
    flexDirection : 'row', 
    width : '100%',
  },
  jobName : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallFont,
    color : theme.secondaryTextColor
  },
  bioTxt : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    color : theme.textGray,
  },
  roleTitleText:{
    fontSize :(Platform.OS === 'ios') ? theme.SmallFont : theme.SmallFont,
    color : theme.textGray,
    fontFamily : theme.inputHintFont,
    marginTop: 8,
  },
});