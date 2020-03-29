import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import theme from '../../assets/theme';
import { Platform } from '@unimodules/core';
import colors from '../../assets/colors';

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
  filePreview: {
    flex: 1,
    padding: 10,
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
    marginVertical : 6
  },
  cardView:{
    width: '99%',
    // height : 110,
    backgroundColor: theme.colorAccent,
    borderRadius : 8,
    marginTop: 4,
    marginBottom : 4,
    shadowColor: theme.primaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 1 
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    // paddingHorizontal: 8,
    paddingVertical: 8,
    // flexDirection : 'row',
    // alignItems : 'center'
  },
  ImageView : {
    width : 40,
    height : 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : (Platform.OS === 'ios') ? 20 : 30,
    marginTop : 4
  },  
  personImage : {
    resizeMode : 'cover',
    height : 39,
    width : 39,
    borderRadius : (Platform.OS === 'ios') ? 20 : 30
  },
  resouceView : {
    flexDirection : 'row',
    width : '98%',
    paddingHorizontal : 8,
  },
  resourceTxt : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    color : theme.textGray,
    paddingHorizontal: 8,
  },
  bioDetailTxt : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.thinyFont,
    color : theme.primaryTextColor,
    paddingLeft : 8
  },

  pdfIcon : {
    height : 20,
    width : 20,
    marginTop : 8
  },
  line : {
    width : '100%',
    height : 8,
    marginVertical : 4,
    backgroundColor : "#f5f5f5",
  },
  buttonMoreView : {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection : 'row'
  },
  downloadtxt : {
    fontFamily : theme.subHeaderFont,
    color : theme.colorAccent,
    fontSize : theme.SmallFont,
    marginTop : (Platform.OS === "ios") ? 4 : 0
  },
  downloadBtn : {
    width : '25%',
    borderRadius : 8,
    paddingHorizontal : 8,
    backgroundColor : theme.primaryColor,
    justifyContent: 'center',
    alignItems : 'center',
    marginStart : 4,
    marginVertical : 2,
    paddingVertical : 2,
    marginHorizontal : 8,
    alignSelf : 'flex-end'
    
  },
    bioTextView : {
    width : '95%',
    marginBottom : 8
  },
  imageText : {
    flexDirection : 'row',
  },
  datebutton : {
    width : '20%',
    height : 30,
    borderRadius : 4,
    backgroundColor : theme.primaryColor,
    justifyContent: 'center',
    alignItems : 'center',
    marginBottom : 4
  },
  txtDate : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallerFont,
    color : theme.colorAccent,
    marginTop : (Platform.OS === 'ios') ? 4 : 0
  },
  txtFilter : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,
    color : theme.textGray,
    marginRight : 16,

  },
  dateView : {
    flexDirection : 'row',
    marginTop : (Platform.OS === 'ios') ? 10 : 8,
    alignItems :  'center'
  },
  titleText : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallFont,
    color : theme.primaryTextColor,
    marginHorizontal : 8,
  },
});