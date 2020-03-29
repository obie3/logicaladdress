import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../assets/theme';
import colors from '../../assets/colors';

export default styles = StyleSheet.create({

  container: {
  flex : 1,
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
    paddingLeft : 20,
    paddingRight : 20,
  },
 
  cardLayout : {
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor : theme.colorAccent,
    borderRadius: 4,
    shadowColor : theme.primaryTextColor,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: { height: 1, width: 0 },
    elevation : 1,

  },

  cardContents: {
    minHeight: 40,
    padding: 5,
    margin: 5,
    backgroundColor: '#F8F8FF',
  },

  cardIconLayout: {
    width: 100,
    height: 100,
    alignSelf: 'center'
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
    flex: 1,
    flexDirection: 'column',
    padding: 20 
  },

  verificationIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center'
    //backgroundColor: 'white'
  },

  

  headerText : {
    fontFamily : theme.inputHintFont,
    fontSize : theme.SmallFont,
    color : theme.primaryTextColor,
  },

  verificationText : {
    fontFamily : theme.inputHintFont,
    fontSize : theme.SmallFont,
    color: '#bdc3c7',
    paddingRight: 6,
    paddingTop: 6,
  },

  nameText: {
    fontFamily : theme.inputHintFont,
    fontSize : 24,
    color: theme.primaryTextColor,
    fontWeight: 'bold',
    paddingRight: 6,
    
  },

  iconStyle: {
    marginRight: -2,
    marginTop: -2
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
    marginRight: 15
  },

  headerProgramView:{
    width : '60%',
    marginTop : 2,
  },

  button : {
    borderRadius : 5,
    width : '100%',
    height : 35,
    backgroundColor : theme.buttonPrimary,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    //paddingRight : 8,
  },

  buttonTxt : {
    fontFamily : theme.headerFont,
    color : theme.colorAccent,
    fontSize: theme.SmallFont,
    //alignSelf : 'center',
  },



  subHeaderText : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,
    color : theme.secondaryTextColor,
    height : 40
  },

});