import { StyleSheet } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';

export default styles = StyleSheet.create({
  container: {
    ...theme.container,
    paddingTop: 15,
  },

  viewBody: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  overlay: {
    flex: 1,
    opacity: 0.9,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
});
