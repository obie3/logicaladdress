import { StyleSheet, Dimensions,Platform } from 'react-native';
const window = Dimensions.get('window');
import colors from '../../assets/colors';
import theme from '../../assets/theme';

 let styles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: 'center'
    
    // paddingTop: 40,
    paddingBottom: 10, 

  },

  headerItem: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight:16,
    marginBottom: 16,
    marginTop: 16,
    width: '100%',
    justifyContent: 'space-between'
  },
  formView : {
    flex : 1,
    padding : 20,
    backgroundColor : theme.buttonSecondry
  },

  textinputCont :{},
  iconForm: {
    height : 20,
    width : 20,
    resizeMode : 'contain',
    marginRight: 8,
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
  wrapper: {
    flex: 1,
    paddingLeft: (Platform.OS === 'ios') ? 30 : 30,
    paddingRight: (Platform.OS === 'ios') ? 30 : 30,
    // marginTop: 15,
    // paddingTop: 8,
    justifyContent: 'center',
    alignItems : 'center',
  },
  btnView: {
    alignItems : 'center',
    width : '100%',
  },
  buttonWithImage : {
    borderRadius : 30,
    width : '60%',
    height : 45,
    backgroundColor : theme.buttonPrimary,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    marginTop : 25,
    paddingRight : 8,
  },
  footerView : {
    width : '100%',
    position : 'absolute',
    bottom : -35,
    right :30
  },
  footerIcon : {},
  signupLinkView : {
    flexDirection : 'row',
    marginTop : 8,
  },
  createAccount : {
    fontSize: theme.SmallFont,
    color: theme.primaryColor,
    // marginTop: 15,
    fontFamily: theme.secondaryFont,
    alignSelf: 'center',
  },
  signupText : {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    // marginTop: 15,
    fontFamily: theme.secondaryFont,
    alignSelf: 'center',
    marginBottom : 4
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
    paddingTop: 4
  },
  socialIcons : {
    height : 24,
    width : 24,
    tintColor : theme.primaryTextColor,
    marginLeft : 2
  },
  signupWith : {
    color : theme.primaryTextColor,
    marginBottom : 8,
    fontFamily : theme.subHeaderFont,
    fontSize : theme.thinyFont
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
  logoIcon : {
    width : 150,
    height : 100,
    resizeMode : 'contain',
   },
  
   LogoLayout: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green'
  },

});

export default styles;