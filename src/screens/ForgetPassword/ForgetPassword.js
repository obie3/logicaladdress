'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton, Preloader } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import styles from './styles';
import LockSvg from './LockSvg';
import {isEmailValid, sendRoute, Forgetpassword} from '../../utils';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email : '',
      isEmailValid : false,  
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

  handleEmailChange = (email) => {
    if(email.length > 0) {
      this.setState({
        isEmailValid: true,
        email : email
      });
    }
    else {
      if (email.length < 1) {
        this.setState({
          isEmailValid : false
        });
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
    const {email, } = this.state;

    if(!isEmailValid(email)) {
      return this.setState({
        showAlert:true,
        message: 'Invalid Email Address'
      })
    }
    
    this.setState({
      showLoading: true,
    });

    let data = await JSON.stringify({
      'email' : email.toLowerCase(), 
    });

     await sendRoute (Forgetpassword, data)
      .then((res) => {
      //  console.log({res})
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
          return this.props.navigation.navigate('ResetPassword', {
            'token' : res.token,
            'email' : email
          });    
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
              source={require('../../assets/images/email.png')}
              style={StyleSheet.flatten(styles.iconForm)}/> 
            <InputField
              placeholder={'Email'}
              placeholderTextColor = {colors.blackShade}
              textColor={colors.blackShade}
              inputType={'email'}
              onChangeText = {this.handleEmailChange}
              autoCapitalize = "none"
              height = {40}
              width = {'90%'}
              borderWidth = {1}
              borderColor = {colors.white}/> 
          </View>

          <View style = {styles.btnView}>
            <SubmitButton
              title={'Log in'}
              disabled={!this.toggleButtonState()}
              onPress={this.handleResetPassword}
              imgSrc={require('../../assets/images/settings.png')}
              btnStyle={styles.buttonWithImage}
              imgStyle={StyleSheet.flatten(styles.iconDoor)}
              titleStyle={StyleSheet.flatten(styles.buttonTxt)}
            />

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
