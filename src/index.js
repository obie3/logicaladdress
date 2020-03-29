'use strict';

import React, {Component} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import * as Font  from 'expo-font';
import Navigator from './routes';
import colors from './assets/colors';
import { Provider } from 'react-redux';
import store from './redux/store';
TextInput.defaultProps.selectionColor = colors.green;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontsLoaded : false,
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'Orkney-Light' : require('../src/assets/fonts/OrkneyLight.otf'),
      'Orkney-Medium' : require('../src/assets/fonts/OrkneyMedium.otf'),
      'Poppins-Bold' : require('../src/assets/fonts/PoppinsBold.ttf'),
      'Poppins-ExtraBold' : require('../src/assets/fonts/PoppinsExtraBold.ttf'),  
      'Poppins-ExtraLight' : require('../src/assets/fonts/PoppinsExtraLight.ttf'),
      'Poppins-Light' : require('../src/assets/fonts/PoppinsLight.ttf'),
      'Poppins-Medium' : require('../src/assets/fonts/PoppinsMedium.ttf'),
      'Poppins-Regular' : require('../src/assets/fonts/PoppinsRegular.ttf'),    
      'Poppins-Thin' : require('../src/assets/fonts/PoppinsThin.ttf'),  
      'Poppins-SemiBold' : require('../src/assets/fonts/PoppinsSemiBold.ttf'),
    });    
    this.setState({ fontsLoaded: true });
  }
  
  render() {
    const { fontsLoaded } = this.state
    return (
      
      <View style={styles.container}>
        <Provider store={store}>
          {fontsLoaded ?
            <Navigator/>
            :
            null }
        </Provider> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    elevation: 4,
  },
});