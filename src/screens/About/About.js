'use strict';
import React, {Component} from 'react';
import { View, ScrollView, ImageBackground, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { DrawerActions } from "react-navigation";



export default class About extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
    }
  }
  

  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  handleAboutConference = () => {
    return this.props.navigation.navigate('AboutConference');
  }
  handleAboutVenue = () => {
    return this.props.navigation.navigate('Venue');
  }
  handleOrganisers = () => {
    return this.props.navigation.navigate('Organisers');
  }
  handleSponsor = () => {
    return this.props.navigation.navigate('Sponsor')
  }

  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default"/>
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
      <View style = {styles.aboutView}>
        <View style = {styles.aboutGridView}>
          {/* first grid */}
          <ImageBackground 
            onPress = {this.handleAboutConference}
            style={[styles.gridBox]} 
            blurRadius={0.1}
            imageStyle={{resizeMode: 'cover'}}
            source={require('../../assets/images/grid1.png')}>

            <TouchableOpacity 
              onPress = {this.handleAboutConference}
              style={styles.overlay}>
              <DisplayText
                text = {"CONFERENCE"}
                styles = {StyleSheet.flatten(styles.gridText)}
              />
              <Image
                onPress = {this.handleAboutConference}
                source = {require('../../assets/images/overflow.png')}
                style = {StyleSheet.flatten(styles.overflowIcon)}
              />
            </TouchableOpacity>
          </ImageBackground>
          {/* second grid */}
          <ImageBackground 
            onPress = {this.handleAboutVenue}
            style={[styles.gridBox]} 
            blurRadius={0.1}
            imageStyle={{resizeMode: 'cover'}}
            source={require('../../assets/images/grid2.png')}>

            <TouchableOpacity 
              onPress = {this.handleAboutVenue}
              style={styles.overlay}>
              <DisplayText
                text = {"VENUE"}
                styles = {StyleSheet.flatten(styles.gridText)}
              />
              <Image
                source = {require('../../assets/images/overflow.png')}
                style = {StyleSheet.flatten(styles.overflowIcon)}
              />
            </TouchableOpacity>
          </ImageBackground>
          {/* third grid */}
          <ImageBackground 
            onPress={this.handleOrganisers}
            style={[styles.gridBox]} 
            blurRadius={0.0}
            imageStyle={{resizeMode: 'cover'}}
            source={require('../../assets/images/grid3.png')}>

            <TouchableOpacity 
              onPress={this.handleOrganisers}
              style={styles.overlay}>
              <DisplayText
                text = {"ORGANISERS"}
                styles = {StyleSheet.flatten(styles.gridText)}
              />
              <Image
                source = {require('../../assets/images/overflow.png')}
                style = {StyleSheet.flatten(styles.overflowIcon)}
              />
            </TouchableOpacity>
          </ImageBackground>
          {/* fourth grid */}
          <ImageBackground 
            onPress = {this.handleSponsor}
            style={[styles.gridBox]} 
            blurRadius={0.1}
            imageStyle={{resizeMode: 'cover'}}
            source={require('../../assets/images/grid4.png')}>

            <TouchableOpacity 
              onPress = {this.handleSponsor}
              style={styles.overlay}>
              <DisplayText
                text = {"SPONSORS"}
                styles = {StyleSheet.flatten(styles.gridText)}
              />
              <Image
                source = {require('../../assets/images/overflow.png')}
                style = {StyleSheet.flatten(styles.overflowIcon)}
              />
            </TouchableOpacity>
          </ImageBackground>
          
        </View>
      </View>
    </SafeAreaView>
    )
  }
} 
