import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import theme from '../../assets/theme';

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
    shadowColor : theme.primaryTextColor,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset : {height : 1, width : 0},
    elevation : 1,
    flexDirection : 'row',
    paddingLeft : 8,
    alignItems : 'center',
    marginBottom : 8,
  },
  iconBotton : {
    width : 25,
    height : 25,
    justifyContent: 'center',
    alignItems : 'center',
  },
  iconBottonSearch : {
    width : 25,
    height : 25,
    justifyContent: 'center',
    alignItems : 'center',
    marginLeft : 4,
  },
  viewBody : {
    alignItems : 'center',
    flex : 1,
    padding : 20
  },
  searchIcon : {
    width : 18,
    height : 18,
    resizeMode : 'contain'
  },
  checklistIcon : {
    width : 18,
    height : 18,
    marginRight : 4
  },
  filterIcon : {
    width : 16,
    height : 16,
    
  },
  iconBottonFilter : {
    width : 25,
    height : 25,
    justifyContent: 'center',
    alignItems : 'center',
    marginLeft : 4,
    position : 'absolute',
    right : 8,
  },
  // listItems : {
  //   marginTop : 8,
  //   width : '90%',
  //   elevation : 1,
  //   borderRadius : 8,
  //   height : 100,
  // },
  cardView:{
    width: '100%',
    // height : 110,
    backgroundColor: theme.colorAccent,
    borderRadius : 8,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 1 
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.62,
    elevation: 1,
    paddingLeft : 8,
    flexDirection : 'column',
  },
  sponsorImageView : {
    width : '30%',
    // backgroundColor : 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : 20,
  },  
  cardHeaderView : {
    width : '98%',
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingTop : 8,
    alignItems : 'center'
  },

  headerText : {
    fontFamily : theme.inputHintFont,
    fontSize : theme.SmallFont,
    color : theme.primaryTextColor
  },
  subHeaderText : {
    // marginTop : 4,
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,
    color : theme.secondaryTextColor,
    height : 40
  },
  moreText : {
    marginTop : 4,
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
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection : 'row',
  },
  btnText : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.thinyFont,
    color : theme.colorAccent
  },
  titleView : {
    width : '70%'
  },
  buttonView : {
    backgroundColor : theme.primaryColor,
    width : '25%',
    height : 30,
    borderRadius : 10,
    justifyContent: 'center',
    alignItems : 'center'
  },
  timeText : {
    fontFamily : theme.primaryFont,
    fontSize : theme.thinyFont,
    color : theme.primaryColor,
  },
  nameText : {
    fontFamily : theme.inputHintFont,
    fontSize : 15,
    color : theme.textGray,
    marginLeft : 4
  },
  cardEventNames : {
    flexDirection :  'row',
    alignItems : 'center',
  },
  maleIcon : {
    height : 20,
    width : 20,
    resizeMode : 'contain',
    borderRadius : 30,
    tintColor : theme.secondaryTextColor,
    marginRight : 4
  },
  cardTxtBody : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.thinyFont,
    color : theme.secondaryTextColor,
    marginLeft : 4,
    marginTop : 4,
  },
  tagsView : {
    flexDirection : 'row',
    padding : 8,
    width : '100%'
  },
  buttonView : {
    backgroundColor : theme.primaryColor,
    width : '25%',
    height : 25,
    borderRadius : 10,
    justifyContent: 'center',
    alignItems : 'center',
    marginRight : 4
  },
  plusBtn : {
    height : 24,
    width : 24,
    justifyContent: 'center',
    alignItems: 'center',
    position : 'absolute',
    right : 8,
    top :14
  },
  plusIcon : {
    height : 20,
    width : 20,
    resizeMode : 'contain'
  },

});