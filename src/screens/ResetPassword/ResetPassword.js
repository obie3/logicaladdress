'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert , Preloader} from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import styles from './styles';
import LockSvg from './LockSvg';
import { sendRoute, ResetPassword, isEmpty} from '../../utils';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      password : '',
      isPasswordValid : false,
      showAlert : false,
      message : '',
      refreshing: false,
      showLoading: false,
    }
  }

  handleLoginRoute = () => {
    this.props.navigation.navigate('Login')
  };
  handleResetPassword = () => {
    this.props.navigation.navigate('LinkExpire');
  };


  handlePasswordChange = (password) => {
    if (password.length > 0) {
      this.setState({
        isPasswordValid : true,
        password: password
      });
    }
    else {
      if ( password.length < 1 ) {
        this.setState({
          isPasswordValid : false
        })
      }
    }
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
   }

  toggleButtonState = () => {
    const { isEmailValid, } = this.state;

    if (isEmailValid) {
      return true;
    } 
    else {
      return false;
    }
  }


  handleResetPassword = async()=>{
    const { password} = this.state;
    let email = this.props.navigation.getParam('email');
    let token = this.props.navigation.getParam('token');

     if(isEmpty(password)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Password'
      })
    }
    
    this.setState({
      showLoading: true,
    });

    let data = await JSON.stringify({
      password, 
      token,
      email, 
    });

     await sendRoute (ResetPassword, data)
      .then((res) => {
       // console.log({res})
        if (res.status !== 'success') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Hello',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          this.setState({ 
            showLoading : false, 
          });
          //return this.resetNavigationStack(res.message);    
        }
      });
  }

  render () {
    const {showLoading, showAlert, message} = this.state;
    return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.navBar}>
        <TouchableOpacity   
          onPress = {this.handleLoginRoute}
          style = {styles.backView}>
          <Image
            onPress = {this.handleLoginRoute}
            source={require('../../assets/images/back.png')}
            style={StyleSheet.flatten(styles.backIcon)}/> 
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior = 'padding'> 
          <LockSvg/>
          <View style = {styles.titleTxtView}>
            <DisplayText
              styles = {StyleSheet.flatten(styles.topTxt)}
              text = {'Forgot password?'}
            />
            <DisplayText
              styles = {StyleSheet.flatten(styles.bottomTxt)}
              text = {'Enter your Registered Email Address '}
            />
          </View>
          
          <View style = {styles.textInputView}> 
            <Image
              source={require('../../assets/images/padlock.png')}
              style={StyleSheet.flatten(styles.iconForm)}/> 
            <InputField
              placeholder={'New Password'}
              placeholderTextColor = {colors.blackShade}
              textColor={colors.blackShade}
              inputType={'password'}
              onChangeText = {this.handlePasswordChange}
              autoCapitalize = "none"
              height = {40}
              width = {'90%'}
              borderWidth = {1}
              borderColor = {colors.white}/> 
          </View>
      
          <View style = {styles.btnView}>
            <TouchableOpacity 
              onPress={this.handleResetPassword}
              style = {styles.buttonWithImage}>
              <DisplayText
                styles = {StyleSheet.flatten(styles.buttonTxt)}
                text = {'Reset'}
                onPress={this.handleResetPassword}
              />
              <Image
                source={require('../../assets/images/settings.png')}
                style={StyleSheet.flatten(styles.iconDoor)}/> 
            </TouchableOpacity>

           
            <Preloader
              modalVisible={showLoading}
             animationType="fade"
            />
            <SingleButtonAlert
              title = {'Hello'} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    
   )
  }
} 
