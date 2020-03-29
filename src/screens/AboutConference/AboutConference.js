'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet, Animated, Dimensions} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import {connect} from 'react-redux';

const deviceWidth = Dimensions.get('window').width;

class AboutConference extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }
  animVal = new Animated.Value(0);

  handleGoBack = () => {
    return this.props.navigation.goBack();
  }

  render () {
    const {data} = this.props;

    let imageArray = [],
      // barArray = [],
       images = data.header_image;

      images.forEach((image, i) => {
        const thisImage = (
          <Image
            key={`image${i}`}
            source={{uri: image}}
            style={{ width: deviceWidth, marginTop:0, height:200 }}
          />
        )
        imageArray.push(thisImage) 
      });

   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.green_background}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={this.handleGoBack} 
          style = {styles.headerImage}>
          <Image
            onPress={this.handleGoBack} 
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text = {"ABOUT"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
        
      <View style={styles.viewBody}>
        <ScrollView 
            style={{flex:1}}
            showsVerticalScrollIndicator={false}>
          <View style = {styles.sliderView}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              pagingEnabled
              onScroll={
                Animated.event(
                  [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                )
              }
            >

              {imageArray}

            </ScrollView>
        
          </View>
            <View style={styles.srollContent}>
              <DisplayText
                text = {data.title}
                styles = {StyleSheet.flatten(styles.aboutHeaderTxt)}
              />
              <DisplayText
                text = {data.description}
                styles = {StyleSheet.flatten(styles.aboutBodyTxt)}
              />
          </View>
        </ScrollView>
      </View>
      
    </SafeAreaView>
    
   )
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return{
    
    data: state.EventReducer.eventProfile
  }
}

export default connect(mapStateToProps)(AboutConference)

