'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView,TouchableOpacity, 
  StyleSheet, Linking} from 'react-native';
import {DisplayText, ErrorAlert } from '../../components';
import styles from './styles';

export default class PeopleMain extends Component {
  constructor(props) {
    super(props);
    this.state ={
      photo : '',
      showErrorAlert:false,
      errorMessage:'',
    }
  }


  handleGoBack = () => {
    return this.props.navigation.goBack();
  }

  handleCloseNotification = () => {
    return this.setState({
       showErrorAlert : false
     })
   }

   headerStatus() {
    const item = this.props.navigation.getParam('item');
    if(item.profile.profile.facebook_visible || item.profile.profile.twitter_visible || item.profile.profile.instagram_visible || item.profile.profile.linkedin_visible ) {
      return(
        <DisplayText
          styles={StyleSheet.flatten(styles.titleText)}
          text = {'Social Media'}
        />
      )
    }
  }
  webSiteLink(){
    const item = this.props.navigation.getParam('item');
    if(item.profile.profile.website) {
      return(
        <View style = {styles.bodyView}>
        <View style={styles.socialView}>
          <View style = {styles.textView}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Website'}
            />
            <View style = {styles.hanlenameView}>                    
            <View style = {styles.dot}></View>               
              <DisplayText
                styles={[StyleSheet.flatten(styles.socialTitleText), {color:'blue' }]}
                text = {item.profile.profile.website}
                onPress={() => Linking.openURL(`${item.profile.profile.website}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}
              />
            </View>
          </View>
        </View>
      </View> 
      )
    }
  }

  render () {
    const item = this.props.navigation.getParam('item');
    const {errorMessage, showErrorAlert} = this.state;
    let photo = item.profile.profile.photo;
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
            text = {"PEOPLE"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      <View style = {styles.mainView}>
      <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
        <ScrollView style={{flex:1, width : '100%'}}  
          showsVerticalScrollIndicator={false}>
          <View style = {styles.viewBody}>

            <View style={styles.roundImageView}>
            { 
               photo && photo.length > 0 ?
              <Image 
                resizeMode = 'cover'
                source={{ uri: photo }} 
                style={styles.imageStyle} 
                /> 
                : 
              <Image
                resizeMode = 'cover'
                style = {styles.imageStyle}
                source = {require('../../assets/images/name.png')}
                />
                
              }
            </View>
            <DisplayText
              styles={StyleSheet.flatten(styles.profileNameTxt)}
              text = {item.profile.profile.name}
            />
             <DisplayText
              styles={StyleSheet.flatten(styles.jobName)}
              text = {item.profile.profile.job_title}
            />
            <View style = {styles.line}></View>

            {/*  User Role */}
            {
              item.profile.profile.event.length ?
                <View style = {styles.textViewUserRole}>
                  <DisplayText
                    styles={StyleSheet.flatten(styles.formHeaderTxt)}
                    text = {'Role'}
                  />
                  <View style = {styles.hanlenameView}>
                    <DisplayText
                      styles={StyleSheet.flatten(styles.roleTitleText)}
                      text = {item.role}
                    />             
                  </View>
                </View>
              : null
            }
            
            {/* Short Bio */}
            { item.profile.profile.short_bio ?
              <View style = {styles.textViewUserRole}>
              <DisplayText
                styles={StyleSheet.flatten(styles.formHeaderTxt)}
                text = {'Bio'}
              />
              <View style = {styles.hanlenameView}>
                <DisplayText
                  text = {item.profile.profile.short_bio}
                  styles = {StyleSheet.flatten(styles.bioTxt)}
                />            
              </View>
            </View>
              : null
            }
            
            <View style = {styles.socialMediaView}>
              {this.headerStatus()}
              {/*  facebook */}
              { item.profile.profile.facebook_visible ?
                <View style = {styles.bodyView}>
                <View style={styles.socialView}>
                  <View style = {styles.textView}>
                    <View style = {styles.hanlenameView}>
                      <Image
                        source = {require('../../assets/images/facebook.png')}
                        style = {StyleSheet.flatten(styles.socialIcon)}
                      />               
                      <DisplayText
                        styles={[StyleSheet.flatten(styles.socialTitleText), {color:'blue'}]}
                        text = {`${item.profile.profile.facebook_visible ? item.profile.profile.facebook: '*******'}`}
                        onPress={() => Linking.openURL(`${item.profile.profile.facebook}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                      />
  
                    </View>
                  </View>
              
                </View>
              </View>
                : null
              }
              
              {/* Twitter */}
              { item.profile.profile.twitter_visible ?

                <View style = {styles.bodyView}>
                  <View style={styles.socialView}>
                    <View style = {styles.textView}>
                      <View style = {styles.hanlenameView}>
                        <Image
                          source = {require('../../assets/images/twitter.png')}
                          style = {StyleSheet.flatten(styles.socialIcon)}
                        />               
                        <DisplayText
                          styles={[StyleSheet.flatten(styles.socialTitleText), {color:'blue'}]}
                          text = {`${item.profile.profile.twitter_visible ? item.profile.profile.twitter: '*******'}`}
                          onPress={() => Linking.openURL(`${item.profile.profile.twitter}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                        />

                      </View>
                    </View>

                  </View>
                </View> 
                : null
              }
              
              {
                 item.profile.profile.linkedin_visible ? 
                <View style = {styles.bodyView}>
                <View style={styles.socialView}>
                  <View style = {styles.textView}>
                    <View style = {styles.hanlenameView}>
                      <Image
                        source = {require('../../assets/images/linkedin.png')}
                        style = {StyleSheet.flatten(styles.socialIcon)}
                      />               
                      <DisplayText
                        styles={[StyleSheet.flatten(styles.socialTitleText), {color:'blue'}]}
                        text = {`${item.profile.profile.linkedin_visible ? item.profile.profile.linkedin: '*******'}`}
                        onPress={() => Linking.openURL(`${item.profile.profile.linkedin}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                      />

                    </View>
                  </View>
              
                </View>
              </View>
              : null

              }
                {/* Instagram */}
               {
                 item.profile.profile.instagram_visible ? 
                  <View style = {styles.bodyView}>
                  <View style={styles.socialView}>
                    <View style = {styles.textView}>
                      <View style = {styles.hanlenameView}>
                        <Image
                          source = {require('../../assets/images/instagram.png')}
                          style = {StyleSheet.flatten(styles.socialIcon)}
                        />               
                        <DisplayText
                          styles={[StyleSheet.flatten(styles.socialTitleText), {color:'blue'}]}
                          text = {`${item.profile.profile.instagram_visible ? item.profile.profile.instagram: '*******'}`}
                          onPress={() => Linking.openURL(`${item.profile.profile.instagram}`).catch(err => {this.setState({errorMessage:err.toString(), showErrorAlert:true})})}

                        />
                      </View>
                    </View>
                  </View>
                </View>
                : null


               }
              {/* phone */}
               {
                 item.profile.profile.phone ?
                 <View style = {styles.bodyViewPhone}>
                 <View style={styles.socialView}>
                   <View style = {styles.textView}>
                     {/* <DisplayText
                       styles={StyleSheet.flatten(styles.titleText)}
                       text = {'Phone Number'}
                     /> */}
                     <View style = {styles.hanlenameView}>
                       <Image
                         source = {require('../../assets/images/call.png')}
                         style = {StyleSheet.flatten(styles.socialIcon)}
                       />               
                       <DisplayText
                         styles={StyleSheet.flatten(styles.socialTitleText)}
                         text = {item.profile.profile.phone? item.profile.profile.phone.toString(): ''}
                       />
                     </View>
                   </View>
                 </View>
               </View>
               : null
               }
              {/* website */}
              {this.webSiteLink()}

            </View>
          </View>
          <ErrorAlert
            title = {'Error!'} 
            message = {errorMessage}
            handleCloseNotification = {this.handleCloseNotification}
            visible = {showErrorAlert}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  
    )
  }
} 
