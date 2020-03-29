import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../assets/theme';
import colors from '../../assets/colors';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  navBar: {
    flexDirection : 'row',
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
    flex: 1,
    alignContent: 'center',
    //justifyContent: 'center',
    //padding: 5,
    justifyContent: 'space-evenly' ////spaced here initially
  },
 
  cardLayout : {
    flexDirection: 'column',
    borderRadius: 4,
    shadowColor : theme.primaryTextColor,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
   // elevation : 1,
  },

  LogoLayout: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //backgroundColor: 'green'
  },

  cardContents: {
    minHeight: 40,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: -20,
  },

  cardIconLayout: {
    width: 100,
    height: 100,
    alignSelf: 'center',
   // backgroundColor: 'yellow'
  },

  cardIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  verificationStatusLayout: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',// 'flex-end'
    alignSelf: 'center',
  },

  verificationIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  headerText : {
    fontFamily : theme.inputHintFont,
    fontSize : theme.SmallFont,
    color : theme.primaryTextColor,
  },

  verificationText : {
    fontFamily : theme.inputHintFont,
    fontSize : 24,
    color: colors.label,
    paddingRight: 6,
  },

  headerTwo: {
    fontSize : 26,
    color:  '#4A5459', //theme.primaryTextColor,
    fontWeight: 'bold',
    //paddingRight: 6,
    
  },

  headerThree: {
    fontSize : 16,
    color:  '#4A5459', //theme.primaryTextColor,
    fontWeight: 'bold',
    //paddingRight: 6,
    
  },

  headerTwoLabel: {
     fontFamily : theme.inputHintFont,
     fontSize : 16,
     color: colors.label
  },

  headerThreeLabel: {
    fontFamily : theme.inputHintFont,
    fontSize : 16,
    color: colors.label,
 },

  profileItem: {
    flex: 2,
    justifyContent: 'center',
    marginTop: 2
  },

  profileIconLayout: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileRowItem: { 
    flexDirection: 'row',
    marginTop: 25,
  },

  avatarLayout: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },

  iconLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width:20,
    height:20,
    backgroundColor: '#2ecc71',
    marginTop: 5,
    marginRight: 15,
  },

  buttonLayout: {
    //paddingBottom: 15,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    //backgroundColor: 'green'
  },

  button : {
    borderRadius : 5,
    width : '50%',
    height : 35,
    backgroundColor : colors.buttonBlue, //theme.buttonPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    //alignSelf: 'center',
    flexDirection : 'row',
  },

  buttonTxt : {
    fontFamily : theme.headerFont,
    color : theme.colorAccent,
    fontSize: theme.SmallFont,
  },
});