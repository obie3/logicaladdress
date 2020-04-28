import { StyleSheet } from 'react-native';
const IMAGE_SIZE = 50;
import theme from 'assets/theme';
import colors from 'assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 100,
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
    //fontWeight: 'bold',
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
  },
  panelButtonTitle: {
    ...theme.buttonText,
  },

  alert: {
    ...theme.alertNotification,
  },

  backView: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.label,
  },

  navBar: {
    marginTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  locationButton: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.background,
    elevation: 5,
    textShadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    textShadowOffset: { width: 5, height: 2 },
  },
});
