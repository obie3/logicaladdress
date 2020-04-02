import { StyleSheet } from 'react-native';
const IMAGE_SIZE = 50;
import theme from 'assets/theme';
import colors from 'assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 200,
    padding: 20,
    backgroundColor: '#f7f5eee8',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    //marginBottom: 10,
  },
  panelTitle: {
    fontSize: theme.headerThreeFont,
    color: colors.blue, //colors.headerFontColor,
    fontWeight: 'bold',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    ...theme.buttonView,
  },

  buttonWithImage: {
    ...theme.button,
    // marginBottom:25
  },
  panelButtonTitle: {
    ...theme.buttonText,
  },
});
