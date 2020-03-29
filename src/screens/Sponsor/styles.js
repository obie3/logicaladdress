import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import theme from '../../assets/theme';
import { Platform } from '@unimodules/core';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : 60,
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
    shadowColor : theme.primaryTextColor,
    shadowOpacity : 0.25,
    shadowRadius : 2.56,
    shadowOffset : {height : 1, width : 0},
    flexDirection : 'row',
    paddingLeft : 16,
    alignItems : 'center'
  },
  viewBody : {
    // alignItems : 'center',
    flex : 1,
    padding : 20
  },
  searchIcon : {
    width : 20,
    height : 20,
  },
  listViewItem : {
    alignItems : 'center',
    width : '100%',
    justifyContent: 'center',
    // paddingLeft : 20,
    // paddingRight : 20,
  },
  cardView:{
    width: '99%',
    height : 110,
    backgroundColor: theme.colorAccent,
    borderRadius : 8,
    marginVertical: 8,
    shadowColor: theme.primaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 1 
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection : 'row',
    alignItems : 'center'
  },
  sponsorImageView : {
    width : '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : (Platform.OS === 'ios') ? 8 : 10,

  },  
  sponsorImage : {
    resizeMode : 'cover',
    height : '80%',
    width : '100%',
    borderRadius : (Platform.OS === 'ios') ? 8 : 10
    
  },
  txtView : {
    flexDirection : 'column',
    height : '100%',
    width : '70%',
    paddingLeft : 8,
    paddingTop: 1,
  },
  headerText : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.MediumFont,
    color : theme.primaryTextColor,
    marginTop : 4
  },
  subHeaderText : {
    // marginTop : 4,
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,
    color : theme.textGray,
    height : 40
  },
  moreText : {
    marginTop : 0,
    fontFamily : theme.secondaryFont,
    fontSize : theme.thinyFont,
    color : theme.primaryColor
  },
  iconView : {
    justifyContent: 'center',
    alignItems: 'center',
    width : 40,
  },
  buttonMoreView : {
    // paddingHorizontal: 4,
    justifyContent: 'space-between',
    flexDirection : 'row'
  },
  plusIcon : {
    height : 25,
    width : 30,
    resizeMode : 'contain',
    marginBottom : 4

  }

});