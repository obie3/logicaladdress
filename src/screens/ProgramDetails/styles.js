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
    fontSize: theme.MediumFont,
    color: theme.primaryTextColor,
    marginLeft: 16,
    alignSelf: 'center',
    
  },
  programView : {
    flex : 1,
    width : '100%',
    // alignItems : 'center',
    padding : 20
  },
  blueCard : {
    width : '99%',
    backgroundColor : theme.primaryColor,
    borderRadius : 8,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingHorizontal : 16,
    paddingVertical : 20,
    marginLeft : 2
  },
  headerCardTxt : {
    fontSize : (Platform.OS === 'ios') ? theme.MediumFont : theme.MediumFont,
    fontFamily : theme.semiBoldFont,
    color : theme.colorAccent,
    textAlign : 'left',
    lineHeight : 20,
    paddingTop : 4
  },
  cardDate : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    color : theme.colorAccent,
  },
  cardSpeaker : {
    width : '99%',
    borderRadius : 8,
    marginTop : 16,
    //height : 50,
    paddingHorizontal : 8,
    paddingVertical : 4,
    elevation : 1,
    shadowOffset : { height : 1, width : 0 },
    shadowOpacity : 0.25,
    shadowColor : theme.primaryTextColor,
    shadowRadius : 2.56,
    backgroundColor : theme.colorAccent,
    marginLeft : 2

  },
  cardCategory : {
    width : '99%',
    borderRadius : 8,
    marginTop : 16,
    // height : 50,
    paddingHorizontal : 8,
    paddingVertical : 4,
    elevation : 1,
    shadowOffset : { height : 1, width : 0 },
    shadowOpacity : 0.25,
    shadowColor : theme.primaryTextColor,
    shadowRadius : 2.56,
    backgroundColor : theme.colorAccent,
    marginLeft : 2,
    marginBottom : 8

  },
  sponser : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    color : theme.secondaryTextColor,
  },
  sponserName : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallFont,
    color : theme.textGray,
  },
  typeTxt : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.thinyFont,
    color : theme.textGray,
  },
  catTypeView : {
    flexDirection : 'row',
    flexWrap : 'wrap',
  },
  cartType : {
    color : theme.colorAccent,
    padding : 4,
  },
  textCont : {
    borderRadius : 8,
    backgroundColor : theme.primaryColor,
    marginBottom : 8,
    paddingHorizontal: 4
  },
  blueButton : {
    width : '99%',
    backgroundColor : theme.primaryColor,
    borderRadius : 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : 2,
    height : 45,
    marginTop : 16
  },
  buttonTxt : {
    fontSize : (Platform.OS === 'ios') ? theme.SmallFont : theme.SmallerFont,
    fontFamily : theme.headerFont,
    color : theme.colorAccent,
  },
  attendyView : {
    flexDirection : 'row',
    paddingTop : 16,
    alignItems : 'center',
    marginBottom : 16,

  },
  imageView : {
    width : 50,
    height : 50,
    borderRadius : (Platform.OS === 'ios') ? 30 : 30,
    elevation : 1,
    shadowOffset : { height : 1, width : 0 },
    shadowOpacity : 0.25,
    shadowColor : theme.primaryTextColor,
    shadowRadius : 2.56,
    backgroundColor : theme.colorAccent,
    justifyContent: 'center',
    alignItems : 'center',
  },
  headerIcon : {
    width : 45,
    height : 45,
    borderRadius : (Platform.OS === 'ios') ? 20 : 30,
  },
  attendyTxt : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.thinyFont,
    color : theme.textGray,
    marginLeft : 8
  },
  imageViewPlus : {
    width : 50,
    height : 50,
    borderRadius : (Platform.OS === 'ios') ? 30 : 30,
    elevation : 1,
    shadowOffset : { height : 1, width : 0 },
    shadowOpacity : 0.25,
    shadowColor : theme.primaryTextColor,
    shadowRadius : 2.56,
    backgroundColor : theme.colorAccent,
    justifyContent: 'center',
    alignItems : 'center',
  },
  rating: {
    flex:1, 
    alignItems:'flex-start'
  }
});