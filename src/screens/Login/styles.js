import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width /6;
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: 'center'
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 40,
    // paddingBottom: 10, 

  },
  wrapper: {
    flex: 1,
    paddingLeft: (Platform.OS === 'ios') ? 20 : 20,
    paddingRight: (Platform.OS === 'ios') ? 20 : 20,
    marginTop: 15,
    paddingTop: 8,
    justifyContent: 'center',
  },
  
  
  btnView: {
    alignItems : 'center',
    width : '100%',
  },
  signupLinkView: {
    justifyContent : 'center',
    flexDirection : 'row',
    // marginBottom : 8,
    marginTop : 16
  },
  signupText: {
    fontSize: 16,
    color: colors.button_border,
    marginTop: 15,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },

  signupLink: {
    fontSize: 15,
    color: colors.gold,
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },

  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20,
    alignSelf: 'center',

  },
  backgroundImage: {
		flex: 1,
		width: '100%',
		height: null,
	},
  forgotPwd : {
    color : theme.primaryTextColor,
    marginBottom : 8,
    fontFamily : theme.subHeaderFont
  },
  signupWith : {
    color : theme.primaryTextColor,
    marginBottom : 8,
    fontFamily : theme.subHeaderFont,
    fontSize : theme.thinyFont
  },
  signWithView : {
    width : '100%',
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : "column",
    marginTop : 16
  },  
  socialIconView : {
    flexDirection : "row",
    paddingTop: 8
  },
  socialIcons : {
    height : 24,
    width : 24,
    tintColor : theme.primaryTextColor,
    marginLeft : 2
  },
  logoTxt : {
    fontFamily : 'Poppins-ExtraBold',
    color : colors.white,
    fontSize : 55,
    alignSelf : 'center',
    marginTop : '25%'
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
  textinputCont :{},
  iconForm: {
    height : 20,
    width : 20,
    resizeMode : 'contain',
    marginRight: 8,
  },
  buttonWithImage : {
    borderRadius : 30,
    width : '60%',
    height : 45,
    backgroundColor : colors.blue,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    marginTop : 25,
    paddingRight : 8,
  },
  buttonTxt : {
    fontFamily : 'Poppins-Regular',
    color : colors.white,
    fontSize : 18,
    alignSelf : 'center',
  },
  iconDoor : {
    height : 18,
    width : 18,
    resizeMode : 'contain',
    marginLeft: 24,
  },
  logoIcon : {
    width : '60%',
    height : '50%',
    resizeMode : 'contain'
  },
  imageView : {
    width : '90%',
    height : '30%',
    alignItems : 'center',
    justifyContent: 'center',
    marginTop : 30
  },
  checkBoxView : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'center',
    marginLeft : (Platform.OS === 'ios') ? 40 : 40,
    // alignItems : 'center',
    paddingTop : 8,
  },
  checkBox : {
    flex: 1, 
    // padding: 10
  },
  termCondition : {
    fontSize: theme.thinyFont,
    color: theme.darkGray,
    // marginTop: 8,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
    position : 'absolute',
    right : (Platform.OS === 'ios') ? 75 : 65,
  },

  LogoLayout: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green'
  },
});