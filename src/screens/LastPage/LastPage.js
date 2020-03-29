'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import LastPageSvg from './LastPageSvg';

export default class LastPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }
  handleSwipe = () => {
    return this.props.navigation.navigate('OnboardingSocial');
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colorAccent}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          style = {styles.headerImage}
          onPress={()=>this.props.navigation.goBack()}>
          <Image
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
            onPress={()=>this.props.navigation.goBack()}
          />
        </TouchableOpacity>
      </View>

      <View style = {styles.svgView}>
      <LastPageSvg/>
      </View>
      <View style = {styles.textView}>
        <DisplayText
          styles={StyleSheet.flatten(styles.firstTxt)}
          text = {'Last Page'}
        />  
         <DisplayText
          styles={StyleSheet.flatten(styles.secondText)}
          text = {'We Promise'}
        />
      </View>
      <View style = {styles.btnViewNext}> 
        <TouchableOpacity 
          onPress = {this.handleSwipe}
          style = {styles.buttonView}>
          <DisplayText
            onPress = {this.handleSwipe}
            text={'Next'}
            styles = {StyleSheet.flatten(styles.txtNext)}
          />
          <Image
            onPress = {this.handleSwipe}
            source = {require('../../assets/images/foward_arrow.png')}
            style = {StyleSheet.flatten(styles.nextIcon)}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
   )
  }
} 
