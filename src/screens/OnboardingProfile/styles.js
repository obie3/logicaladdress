import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import colors from '../../assets/colors';
import theme from '../../assets/theme';
import Constants from 'expo-constants'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === 'ios') ? 50 : 60,
    backgroundColor : theme.toolBarColor,
    width : '100%',
    alignItems : 'center',
    justifyContent: 'center',
    paddingBottom : 4,
    shadowColor : theme.primaryTextColor,
    shadowOffset : { 
      width : 0, 
      height : 1
    },
    shadowOpacity : 0.26,
    shadowRadius : 2.52,
    elevation : 1,  
    paddingTop : (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight    
  },
  
  headerIcon: {
    height: 18,
    width: 18,
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
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center',
    marginRight : 8,
  },
  txtHeader: {
    fontSize: 18,
    color: theme.primaryTextColor,
  },
  //body view
  viewBody : {
    flex : 1,
    padding: 20,
    alignItems: 'center',
  },
  imageView : {
    width : 100,
    height : 100,
    marginTop : 20,
    borderRadius : 100,
    shadowColor : theme.primaryTextColor,
    shadowRadius : 2.62,
    shadowOffset : {height : 2, width : 0},
    shadowOpacity : 0.25,
    elevation : 2,
    backgroundColor : theme.colorAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle : {
    width : 95,
    height : 95,
    borderRadius : (Platform.OS === 'ios') ? 46 : 60,
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
    left : 70,
    top : 45
  },
  cameraIcon : {
    width : 20,
    height : 20,
    resizeMode : 'contain'
  },

  profileNameTxt : {
    fontFamily : theme.semiBoldFont,
    fontSize : theme.MediumFont
  },
  userCathegoryView : {
    height : 50,
    color : theme.primaryTextColor,
    fontFamily : theme.subHeaderFont,
    // backgroundColor : theme.colorAccent,
    // marginBottom : 8

    // width: 200,
    // backgroundColor: '#FFF0E0',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  onePickerItem : {
    height: 30,
    color: 'red'
  },
  pickerView : {
    paddingBottom : 8,
    height: 40, 
    width:'90%', 
    justifyContent: 'center',
  },
  
  pickerImage : {
    width : 10,
    height : 10,
    tintColor : 'red'
  },
  downArrow : {
    width : 14,
    height : 14,
    resizeMode : 'contain',
    marginLeft : 8,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  userCathegoryTxt : {
    fontFamily : theme.LightPoppins,
    fontSize : theme.thinyFont,
    color : theme.primaryTextColor
  },

  // Modal Style 
  // modalview : {
  //   backgroundColor : colors.red,
  //   justifyContent: 'center',
  //   alignItems : 'center'
  // },
  modalContainer: {
    flex: 1, 
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? '35%' :'40%',

  },
  modalStyle: {
    backgroundColor: theme.colorAccent, 
    borderColor: theme.formBorderColor,
    height: '50%', 
    width: '90%',
    padding: 8,  
    borderRadius: 4,
    elevation : 4,
    shadowColor : theme.primaryTextColor,
    shadowRadius : 2.26,
    shadowOpacity : 0.25,
    shadowOffset : { height : 2, width : 0},
  },
  
 
  formHeaderTxt: {
    fontSize :(Platform.OS === 'ios') ? theme.MediumFont : theme.SmallFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont
  },
  textBoder: {
    backgroundColor : theme.colorAccent,
    height: 40,
    paddingLeft: 4,
    width:'100%',
    borderRadius : 4,
    paddingRight : 8,
    justifyContent : 'center',
  },
  viewTxtTitle : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'

  },
  titleText : {
    fontFamily: theme.subHeaderFont,
    color: theme.primaryTextColor,
    fontSize: 16,

  },

  

  titleText : {
    fontSize :theme.MediumFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont
  },
  modalTxt:{
    fontSize: 18,
    color: colors.text_color,
    marginTop: 6,
    marginBottom: 6,
    fontFamily: theme.secondaryFont,
  },
  wrapper: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 10,
    width : '100%',
  },

  titleView : {
    width : '100%',
    flexDirection : 'column',
    marginTop: (Platform.OS === 'ios') ? 16 : 4,
    borderBottomWidth : 0.5,
    borderBottomColor : theme.formBorderColor,
  }, 

  titleText : {
    fontSize :theme.SmallFont,
    color : theme.primaryTextColor,
    fontFamily : theme.subHeaderFont,
    // marginTop : (Platform.OS === 'ios') ? 20 : 2
    
  },
  nameInputView : {
    width : '100%',
    flexDirection : 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,
    marginTop : (Platform.OS === 'ios') ? 8 : 2,
  },
  nameText : {
    fontSize :(Platform.OS === 'ios') ? theme.MediumFont : theme.SmallFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont
  },
  jobtitleText : {
    fontSize :(Platform.OS === 'ios') ? theme.MediumFont : theme.SmallFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont   
  },
  pickerLabel : {
    fontSize :theme.SmallFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont,
  },
  textHeaderStyle : {
    fontSize :theme.MediumFont,
    color : theme.primaryTextColor,
    fontFamily : theme.inputHintFont
  },
  selectView : {
   flexDirection : 'row',
   justifyContent : 'space-between',
  },
  penIcon : {
    width : 16,
    height : 16,
    resizeMode : 'contain',
    marginLeft : 16,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  inputTxt : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.thinyFont,
    color : theme.primaryTextColor
  },
  userTitleView : {
    flexDirection : 'row',
    alignItems : 'center',
    
  },
 
  titleInputView : {
    width : '100%',
    flexDirection : 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,
    // paddingTop : 4,
    paddingBottom : 4,
    marginTop : (Platform.OS === 'ios') ? 8 : 2,
  },
  
  buttonView :{
    flexDirection : 'row',
    marginTop : 60,
  },
  txtNext : {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,

  },
  nextIcon : {
    width : 14,
    height : 14,
    resizeMode : 'contain',
    marginLeft : 8,
    marginTop : 4,
    tintColor : theme.primaryColor
  },

  textInputView : {
    width : '100%',
    height : 45,
    backgroundColor : colors.white,
    borderRadius : 4,
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 8,
    paddingLeft : 8,
    borderWidth : 1,
    borderColor : theme.secondaryTextColor,
  },
  
});