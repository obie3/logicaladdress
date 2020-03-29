import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width /6;
import defaultTheme from '../../assets/theme';


let styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    // paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    // padding : 20

  },

  slide: {
    flex: 1,
    paddingBottom: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  sliderText: {
    fontSize: defaultTheme.SmallFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: defaultTheme.secondaryFont,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: '5%'

  },
  sliderTitle: {
    fontSize: defaultTheme.MediumFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingTop : 40,
    fontFamily: defaultTheme.primaryFont
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  
  sliderDots : {
    backgroundColor: defaultTheme.primaryTextColor
  },

  activeDotStyle: {
    backgroundColor: defaultTheme.buttonPrimary
  },

  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: defaultTheme.buttonPrimary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  } 

});

export default styles;