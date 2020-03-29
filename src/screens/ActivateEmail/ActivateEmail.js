'use strict';
import React, {Component} from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar, Image, StyleSheet, Linking} from 'react-native';
import {DisplayText, Preloader} from '../../components';
import styles from './styles';
import ExpireSvg from './ExpireSvg';
import { sendRoute, getEmail, VerificationStatusEndpoint} from '../../utils';
import { NavigationActions, StackActions } from 'react-navigation';


export default class ActivateEmail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email :'',
      showLoading: false,
      resolved: false,
    }
  }

   async componentDidMount() {
    let email = await getEmail();
    this.setState({
      email
    });
    let { params } = this.props.navigation.state;
    if(params == undefined) {
      this.checkEmailVerification();
    }
    //logout();
  }

  resetNavigationStack = () => {
    const navigateAction =  StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: 'Profile',
         }),
       ],
     });
     this.props.navigation.dispatch(navigateAction);
 
   }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  checkEmailVerification = async() => {
    this.setState({
      showLoading: true,
      resolved: true,
    });

    let data = await JSON.stringify({
      'email' : this.state.email.toLowerCase(), 
    });

     await sendRoute (VerificationStatusEndpoint, data)
      .then((res) => {
        if (res.status !== 'success') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          if(res.verified) {
            this.setState({ 
              showLoading : false, 
              resolved: true
            });
            return this.resetNavigationStack(); 
          }
          else {
            return this.setState({ 
              showLoading : false, 
              resolved: true

            });
          }
             
        }
      });
  }

  render () {
    const { showLoading, email, resolved } = this.state;
    if(showLoading && resolved) {
      return (
        <SafeAreaView style={styles.container}> 
          <StatusBar barStyle="default" /> 
       
          <Image
            source={require('../../assets/images/splash.png')}
            style={{ resizeMode:'center' }}
          />
    
      </SafeAreaView>
      );
    }
    else {
    
      return( 
        <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity   
            onPress = {this.handleBack}
            style = {styles.backView}>
            <Image
              onPress = {this.handleBack}
              source={require('../../assets/images/back.png')}
              style={StyleSheet.flatten(styles.backIcon)}/> 
          </TouchableOpacity>
        </View>
        <View
          style={styles.wrapper}
          behavior = 'padding'> 
            <ExpireSvg/>
            <View style = {styles.titleTxtView}>
              <DisplayText
                styles = {StyleSheet.flatten(styles.topTxt)}
                text = {'Success!'}
              />
              <DisplayText
                styles = {StyleSheet.flatten(styles.bottomTxt)}
                text = {`Activation link has been sent to \n${email}!`}
              />
              <Preloader
                modalVisible={showLoading}
                animationType="fade"
              />

              <ErrorAlert
                title = {'Error!'} 
                message = {errorMessage}
                handleCloseNotification = {this.handleCloseNotification}
                visible = {showAlert}
              />
            </View>

            <View style = {styles.btnView}>
              <TouchableOpacity 
                onPress={this.handleReset}
                style = {styles.buttonWithImage}>
                <DisplayText
                  styles = {StyleSheet.flatten(styles.buttonTxt)}
                  text = {'Activate'}
                />
                <Image
                  source={require('../../assets/images/settings.png')}
                  style={StyleSheet.flatten(styles.iconDoor)}/> 
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )
    }
  }
} 