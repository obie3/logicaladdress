'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, 
   Animated,Dimensions, Linking, Platform} from 'react-native';
import {DisplayText, ErrorAlert} from '../../components';
import styles from './styles';
import {connect} from 'react-redux';


const deviceWidth = Dimensions.get('window').width;

class Organisers extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      showErrorAlert:false,
      errorMessage:'',
      message : '',
      contactAddress : '',
      phoneNumber : '',
      isContactAddressValid : false,
      isPhoneNumberValid : false,
      data: this.props.data,
    }
    this.contact_address = React.createRef();
    this.phone_number = React.createRef();

  }
  animVal = new Animated.Value(0);

  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  contactAddressChange = (contactAddress) => {
    if(contactAddress.length > 0) {
      this.setState({
        isContactAddressValid: true,
        contactAddress
      });
    }
    else {
      if (contactAddress.length < 1) {
        this.setState({
          isCsontactAddressValid : false
        });
      }
    }
  }

  handleCloseNotification = () => {
    return this.setState({
       showErrorAlert : false
     })
   }
  handlePhoneNumberChange = (phoneNumber) => {
    if(phoneNumber.length > 0) {
      this.setState({
        isPhoneNumberValid: true,
        phoneNumber
      });
    }
    else {
      if (phoneNumber.length < 1) {
        this.setState({
          isPhoneNumberValid : false
        });
      }
    }
  }


  dialCall=()=> {
 
    let phoneNumber = '',
    number = this.state.data.company.phone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    }
    else {
      phoneNumber = `telprompt:${number}`;
    }
 
    Linking.openURL(phoneNumber);
  };


  webSiteLink(){
    const {data} = this.state
    if(data.company.website) {
      return(
        <View style = {styles.formView}>
          <DisplayText
            styles={StyleSheet.flatten(styles.titleText)}
            text = {'Website'}
          />
          <DisplayText
            styles={[StyleSheet.flatten(styles.textInfo), {color:'blue' }]}
            text = {data.company.website}
            onPress={() => Linking.openURL(`${data.company.website}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}
          />
        </View>
      )
    }
    else  {
      return(
          <DisplayText
            styles={StyleSheet.flatten(styles.textInfo)}
            text = {''}
          />
      )
    }
    
  }

  headerStatus() {
    const item = this.props.data;
    if(item.facebook_visible || item.twitter_visible || item.instagram_visible || item.linkedin_visible ) {
      return(
        <DisplayText
          styles={StyleSheet.flatten(styles.titleText)}
          text = {'Social Media'}
        />
      )
    }
  }


  render () {
    const { data, showErrorAlert, errorMessage} = this.state;
    let d = data.company.phone ? false : true;
    let emailStatus = data.company.email ? false : true;
    //console.log({data})


    let imageArray = [],
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
            text = {"ABOUT ORGANISERS"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
        
      <View style={styles.viewBody}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior = 'padding'> 
        <ScrollView 
          style={{flex:1}}
          showsVerticalScrollIndicator={false}
          >
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
                text = {data.company.name ? data.company.name : '' }
                styles = {StyleSheet.flatten(styles.aboutHeaderTxt)}
              />
              <DisplayText
                text = {data.company.short_bio ? data.company.short_bio : ''}
                styles = {StyleSheet.flatten(styles.aboutBodyTxt)}
              />
          </View>
            <View style = {styles.formContainer}>         
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Contact Address'}
                />
                <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {data.company.address ? data.company.address : ''}
                />

              </View>
              {/* Phone number */}
              <View style = {styles.formView}>
                <DisplayText
                  styles={StyleSheet.flatten(styles.titleText)}
                  text = {'Phone Number'}
                />
                <DisplayText
                  styles={StyleSheet.flatten(styles.textInfo)}
                  text = {data.company.phone ? data.company.phone.toString() : ''}
                />
              </View>
              {/* Email Address Texf */}
              {
                data.company.email ?
                  <View style = {styles.formView}>
                  <DisplayText
                    styles={StyleSheet.flatten(styles.titleText)}
                    text = {'Email Address'}
                  />
                  <DisplayText
                    styles={StyleSheet.flatten(styles.textInfo)}
                    text = {data.company.email ? data.company.email : ''}
                  />
                </View>
                : null
              }
              
              {/* Website text */}
                {this.webSiteLink()}
              {/* Social Media */}
                {/* {this.headerStatus()} */}
                {data.company.facebook_visible ?
                  <View style = {styles.formView}>

                      <DisplayText

                      styles={[StyleSheet.flatten(styles.textInfo), {color:'blue'}]}
                      onPress={() => Linking.openURL(`${data.company.facebook}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                    />
                  </View>
                : null
                }
                
                {data.company.instagram_visible ?
                  <View style = {styles.formView}>

                    <DisplayText
                      styles={[StyleSheet.flatten(styles.textInfo), {color:'blue'}]}
                      onPress={() => Linking.openURL(`${data.company.instagram}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                    />
                  </View>
                 : null
                }
                
                { data.company.twitter_visible ?
                  <View style = {styles.formView}>

                    <DisplayText
                    styles={[StyleSheet.flatten(styles.textInfo), {color:'blue'}]}
                    onPress={() => Linking.openURL(`${data.company.twitter}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                  />
                   </View>
                 : null
                }
                
                { data.company.linkedin_visible ? 
                  <View style = {styles.formView}>

                    <DisplayText
                      styles={[StyleSheet.flatten(styles.textInfo), {color:'blue'}]}
                      onPress={() => Linking.openURL(`${data.company.linkedin}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                    />
                  </View>
                  : null
                }
               <View style = {styles.buttonView}>
                
                
                <TouchableOpacity
                  style = {[{opacity: d ? 0.2 : null}]}
                  disabled = {d}
                  onPress ={this.dialCall}
                >
                  <Image
                    source = {require('../../assets/images/call.png')}
                    style = {StyleSheet.flatten(styles.buttonCall)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style = {[{opacity: emailStatus ? 0.2 : null}]}
                  disabled = {emailStatus}
                  onPress={() => Linking.openURL(`mailto:${data.company.email}`) }
                    title="support@example.com"
                  >
                  <Image
                    source = {require('../../assets/images/message.png')}
                    style = {StyleSheet.flatten(styles.buttonIcon)}
                  />
                </TouchableOpacity> 
                <ErrorAlert
                  title = {'Error!'} 
                  message = {errorMessage}
                  handleCloseNotification = {this.handleCloseNotification}
                  visible = {showErrorAlert}
                />
              </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default connect(mapStateToProps)(Organisers)
