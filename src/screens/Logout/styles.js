import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';
export default styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  navbarStyle: {
    backgroundColor: colors.green,
    borderBottomWidth: 1,
    borderBottomColor: colors.green,

  },
  headerItem: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight:16,
    alignItems: 'center',
    width: '100%',
    paddingTop: 8,
    position : 'relative',
    bottom: 16
  },
  imageLogo: {
    height: 24,
    width: 24,
    tintColor: colors.white,
  },

  logoIcon: {
    height: 80,
    width: 80,
    resizeMode : 'contain',
    marginTop :16,
  },
  logoView: {
    paddingRight: 30,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTxt: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  MenuIcon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
    
  },
  text: {
    color: colors.gold,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    fontWeight: '200',
    marginLeft: 8,
  },
  profileView : {
    backgroundColor : colors.green,
    width : '100%',
    // height : '55%',
    paddingLeft : 16,
    paddingTop : 4,
    paddingBottom : 8,
    borderBottomLeftRadius : 30,
    borderBottomRightRadius : 30,
  },
  secondView : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems : 'center'
  },
  nameTxt : {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  othernameTxt : {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    marginLeft : 10
  },
  circle1 : {
    borderRadius : 100,
    backgroundColor : colors.bg1,
    width : 170,
    height : 170,
    position : 'absolute',
    top : 40,
    left : 260,
    opacity : 0.1
    
  },
  circle2 : {
    borderRadius : 100,
    backgroundColor : colors.bg1,
    width : 90,
    height : 90,
    position : 'absolute',
    bottom : 150,
    right : 300,
    opacity : 0.1
    
  },
  companyName : {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    textDecorationLine : 'underline',
  },
  phonenumber : {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  description : {
    width : '100%',
    justifyContent: 'center',
    // alignItems : 'center',
    paddingTop : 4,
    flexDirection : 'column',
  },
  descTxt : {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    borderRadius : 4,
    borderWidth: 0.5,
    padding: 16,
    marginRight : 16,
    alignSelf : 'center',
    marginTop : 8
    // marginLeft : 24,
    // backgroundColor : colors.bg1,
  },
  descHeader : {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  flatlistView : {
    flex: 1,
    paddingTop: 8,
    paddingBottom : 8,
    paddingLeft : 20,
    paddingRight : 20,
  },
});