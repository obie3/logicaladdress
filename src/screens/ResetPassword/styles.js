import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import theme from '../../assets/theme';
import { Platform } from '@unimodules/core';

export default styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    flexDirection : 'row',
    marginTop : (Platform.OS === "ios") ? 20 : 20,
    height : 60,
    backgroundColor: 'transparent',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
  }, 
  backView : {
    height : 30,
    width : 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : 30
  },
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    // marginTop: 15,
    paddingTop: 8,
    justifyContent: 'center',
    alignItems : 'center',
  },
  textInputView : {
    width : '90%',
    height : 45,
    backgroundColor : theme.bgColorPrimary,
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
  buttonTxt : {
    fontFamily : 'Poppins-Regular',
    color : theme.colorAccent,
    fontSize : 18,
    alignSelf : 'center',
  },
  iconDoor : {
    height : 18,
    width : 18,
    resizeMode : 'contain',
    marginLeft: 24,
  },
  titleTxtView : {
    justifyContent: 'center',
    alignItems : 'center',
    padding : 8,
  },
  topTxt : {
    fontSize: defaultTheme.MediumFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    // marginBottom: 16,
    paddingTop : 40,
    fontFamily: defaultTheme.primaryFont
  },
  bottomTxt : {
    fontSize: defaultTheme.thinyFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: defaultTheme.secondaryFont,
    paddingRight: 10,
    paddingLeft: 10,
  },
  backIcon : {
    width : 18,
    height : 18,
    tintColor : theme.primaryTextColor,
    
  }


});