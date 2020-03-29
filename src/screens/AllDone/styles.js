import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarStyle: {
    backgroundColor: colors.green,
    borderBottomWidth: 1,
    borderBottomColor: colors.green
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
  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Poppins-Regular',
    marginLeft: 16,
    marginTop : 50

  },
  firstTxt: {
    marginTop : 16,
    fontSize: theme.LargeFont,
    color: theme.primaryTextColor,
    fontFamily: theme.headerFont,
    textAlign : 'center'
  },
  secondText :{
    fontSize: theme.LargeFont,
    color: theme.primaryTextColor,
    fontFamily: theme.headerFont,
    position : 'absolute',
    right : -100,
    bottom : -28,
  },
  textView : {
    width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView : {
    marginTop : 80,
    justifyContent: 'center',
    alignItems : 'center',
    paddingLeft : 16
  },
  celebrateImage : {
    resizeMode : 'contain',
    width : 130,
    height : 130,
   }
});