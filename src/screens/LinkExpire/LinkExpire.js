'use strict';
import React, {Component} from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar, Image, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton , Preloader,  ErrorAlert} from '../../components';
import styles from './styles';
import ExpireSvg from './ExpireSvg';
import { sendRoute, RequestNewTokenEndpoint, getEmail} from '../../utils';
import { NavigationActions, StackActions } from 'react-navigation';


export default class LinkExpire extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email: '',
      message: '',
      showAlert: false,
      showLoading: false,
    }
  }

  async componentDidMount() {
    let email = await getEmail();
    this.setState({
      email
    });
    //logout();
  }


  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }

  resetNavigationStack = () => {
    const navigateAction =  StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: 'Verification',
           params:  'LinkExpire'
         }),
       ],
     });
     this.props.navigation.dispatch(navigateAction);
   }

   handleRequestToken = async() => {
    this.setState({
      showLoading: true,
      resolved: true,
    });

    let data = await JSON.stringify({
      'email' : this.state.email.toLowerCase(), 
    });

     await sendRoute (RequestNewTokenEndpoint, data)
      .then((res) => {
        if (res.status == 'success') { 
          if(res.message.includes('verification mail has been sent'))   {
            return this.resetNavigationStack(); 
          }
          return this.setState({ 
            showLoading : false,
            title : 'Hello',
            message: res.message,
            showAlert: true
          }); 
        }
        else {
          this.setState({ 
            showLoading : false, 
            showAlert: true,
            title : 'Hello',
            message: res.message,
            showAlert: true
          });
        }
      });
  }

  render () {
    const {showAlert, showLoading, message} = this.state;

   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.navBar}>
        {/* <TouchableOpacity   
          onPress = {this.handleBack}
          style = {styles.backView}>
          <Image
            onPress = {this.handleBack}
            source={require('../../assets/images/back.png')}
            style={StyleSheet.flatten(styles.backIcon)}/> 
        </TouchableOpacity> */}
      </View>
      <View
        style={styles.wrapper}
        behavior = 'padding'> 
          <ExpireSvg/>
          <View style = {styles.titleTxtView}>
            <DisplayText
              styles = {StyleSheet.flatten(styles.topTxt)}
              text = {'Token Expired!'}
            />
            <DisplayText
              styles = {StyleSheet.flatten(styles.bottomTxt)}
              text = {'Click to resend New verification \ntoken '}
            />
          </View>

          <View style = {styles.btnView}>
            <SubmitButton
              title={'Resend'}
              onPress={this.handleRequestToken}
              imgSrc={require('../../assets/images/settings.png')}
              btnStyle={styles.buttonWithImage}
              imgStyle={StyleSheet.flatten(styles.iconDoor)}
              titleStyle={StyleSheet.flatten(styles.buttonTxt)}
              disabled={false}
            />
          </View>

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
      </SafeAreaView>
    )
  }
} 