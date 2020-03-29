'use strict';
import React, {Component} from 'react';
import { View, ScrollView, FlatList, Switch, Modal, TextInput, KeyboardAvoidingView, 
  TouchableWithoutFeedback,SafeAreaView, StatusBar, Image, TouchableOpacity, Text, StyleSheet,} from 'react-native';
import {DisplayText, InputField, ErrorAlert, SubmitButton, Preloader } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import data from '../../utils/Countries';
import { isEmpty,  putRoute, ProfileUpdateEndpoint, getProfile, updateOnBoarding} from '../../utils';
import {connect} from 'react-redux'
import colors from '../../assets/colors';


const defaultFlag = data.filter(
  obj => obj.name === 'Afghanistan'
  )[0].flag

class OnboardingSocial extends Component {
  constructor(props) {
    super(props);
    this.state ={
      flag : defaultFlag,
      phone : '',
      modalVisible : false,
      nationalityModalVisible : false,

      facebook_visible : false,
      twitter_visible : false,
      linkedin_visible : false,
      instagram_visible : false,

      title : '',
      message : '',
      showAlert : false,
      showLoading : false,

      isPhoneFocused:false,
      isWebsiteFocused:false,
      isFacebookFocused:false,
      isTwitterFocused:false,
      isLinkedInFocused:false,
      isInstagramFocused:false,

      website:'',
      facebook:'',
      twitter:'',
      linkedin:'',
      instagram:'',
      phone :'',

      _id: '',
      token: '',
    }
  }
  componentWillMount () {
    // Default render of country flag
    const {profile} = this.props; 
    const defaultFlag =  data.filter(obj => obj.name === profile.country ? profile.country: 'Afghanistan')[0].flag;
    this.setState({
      flag :defaultFlag,
    })

  }


  async componentDidMount(){
    let asyncProfile = await getProfile();  
    const {profile} = this.props; 
    
    try {
      return await this.setState({
        '_id' : asyncProfile.id,
        'token' : asyncProfile.sessionToken,
        'website': profile.website,
        'facebook':profile.facebook,
        'twitter': profile.twitter,
        'linkedin': profile.linkedin,
        'instagram': profile.instagram,
        'facebook_visible' : profile.facebook_visible,
        'twitter_visible' : profile.twitter_visible,
        'linkedin_visible' : profile.linkedin_visible,
        'instagram_visible ': profile.instagram_visible,
        'phone':  profile.phone
  
      })
    }
    catch(e){
      console.log({'erroroor': e})
      return await this.setState({
        '_id' : asyncProfile.id,
        'token' : asyncProfile.sessionToken
      })
    }
    
  }
 
  handleOnboardSocial = () => {
    return this.props.navigation.navigate('AllDone')
  }

  handlePhoneChange = (text) => {
    if(text.length > 0) {
      this.setState({
        isValidPhoneNumber: true,
        phone : text
      });
    }
    else {
      if (text.length < 1) {
        this.setState({
          isValidPhoneNumber : false
        });
      }
    }
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }
  // phone number onchage text
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  async selectCountry(country) {
    // Get data from Countries.js  
    const countryData = await data
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag

      this.setState({ 
        phone: countryCode, 
        flag: countryFlag, 
      })
      await this.hideModal()
    }
    catch (err) {
     // console.log(err)
    }
  }

  showModal() {
    this.setState({ 
      modalVisible: true 
    })
  }
  hideModal() {
    this.setState({ 
      modalVisible: false 
    })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()
  }

  handleOnboard = () => {
    // return this.props.navigation.navigate('OnboardingProfile');
  }
  // Switch Functions Facebook
  _handleToggleFbSwitch = () =>{
      this.setState(prevState => ({
       facebook_visible: !prevState.facebook_visible,
      })
    );
  }
  //Twigger toggle function
  _handleToggleTwitSwitch = () =>{
    this.setState(prevState => ({
      twitter_visible: !prevState.twitter_visible,
     })
    );
  }
  // Linkedin Toggle function
  _handleToggleLinkedInSwitch = () =>{
    this.setState(prevState => ({
      linkedin_visible: !prevState.linkedin_visible,
     })
    );
  }
  // Instagram function
  _handleToggleInstaSwitch = () =>{
    this.setState(prevState => ({
      instagram_visible: !prevState.instagram_visible,
     })
    );
  }

  handleSubmitButton =async()=> {

    const {phone, website, facebook, twitter, linkedin, instagram,  facebook_visible,
      twitter_visible, linkedin_visible, instagram_visible,  _id, token} = this.state;

      const {profile} = this.props; 
      let title = profile.title || null,
        name = profile.name,
        job_title = profile.job_title,
        gender = profile.gender,
        company_name = profile.company_name,
        country = profile.country,
        short_bio = profile.short_bio,
        interest = profile.interest;

    if(isEmpty(phone)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Phone Number'
      })
    }

    this.setState({
      showLoading: true,
    });

    let body = await JSON.stringify({
      'query':{_id},
      'update' : {title, name, job_title, company_name, gender, country, short_bio, interest, 
        phone, website, facebook, twitter, linkedin, instagram, facebook_visible, twitter_visible, 
        linkedin_visible, instagram_visible,}   
    });

    await putRoute (ProfileUpdateEndpoint, body, token)
      .then((res) => {
       // console.log({res})
        this.setState({ 
          showLoading : false, 
        });

        if(res.status == 'success') {
          this.setState({ 
            showLoading : false, 
          });
          updateOnBoarding();
          return this.props.navigation.navigate('AllDone')        
        } 
        else {
          return this.setState({ 
           showLoading : false, 
           message: res.message,
           showAlert: true,
           title: 'Hello'
         });
       }
      });
  }
  
  render () {
    const { message, showAlert, flag, isPhoneFocused,isWebsiteFocused, isFacebookFocused,
      isTwitterFocused, isLinkedInFocused,isInstagramFocused, facebook_visible, twitter_visible,
      linkedin_visible, instagram_visible, website, facebook, twitter, linkedin, phone, instagram } = this.state;

    const countryData = data;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colorAccent}/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          style = {styles.headerImage}
          onPress={()=>this.props.navigation.navigate('OnboardingBio')}
        >
          
          <Image
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text={'SOCIAL'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior = 'padding'> 
          <ScrollView 
          style={{flex:1,}}
          showsVerticalScrollIndicator={false}>
          
        {/* Phone input with country code */}
        <View style = {styles.formView}>
          <DisplayText
            text={'Phone Number'}
            styles = {styles.formHeaderTxt}
          /> 
          <View style = {[styles.phoneView, { 
            borderBottomColor: isPhoneFocused ? colors.green
            :theme.secondaryTextColor}]}>
            {/* <View style = {styles.flag}> */}
            <TouchableOpacity 
              style = {styles.modalTp}
              onPress={() => this.showModal()}>
              <Text
                style = {styles.flagstyles} 
                onPress={() => this.showModal()}>
                {flag}
              </Text>
              <Image
                onPress={() => this.showModal()}
                source = {require('../../assets/images/down_arrow.png')}
                style = {StyleSheet.flatten(styles.downArrow)}
              />
            </TouchableOpacity>
            {/* </View> */}
            <TextInput
              style={styles.input}
              //placeholder='+234'
              placeholderTextColor='#adb4bc'
              keyboardType={'phone-pad'}
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={false}
              ref={(input) => { this.PhoneInput = input; }}
              value={phone ? phone.toString() : ''}
              defaultValue={phone ? phone.toString() : ''}
              editable={true}
              blurOnSubmit={false}
              onFocus={()=>this.setState({isPhoneFocused:true})}
              onBlur={()=>this.setState({isPhoneFocused:false})}
              onSubmitEditing={() => { 
                this.websiteRef && this.websiteRef.focus()
              }}
              onChangeText={(val) => {
                if (phone === ''){
                  // render NIG phone code by default when Modal is not open
                  this.onChangeText('phone', '+93' + val)
                } else {
                  // render country code based on users choice with Modal
                  this.onChangeText('phone', val)
                }}
              }
            />
            <TouchableOpacity 
              style = {{paddingLeft : 8}}
              onPress = {()=>{}}>
              <Image
                onPress = {()=>{}}
                source = {require('../../assets/images/edit.png')}
                style = {StyleSheet.flatten(styles.penIcon)}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Modal for country code and flag */}
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={this.hideModal}
          visible={this.state.modalVisible}>
          <View style={{ flex : 1, paddingLeft : 20, paddingRight : 20}}>
            <View style={{ flex: 7, marginTop: 10 }}>
              {/* Render the list of countries */}
              <FlatList
                data={countryData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                  ({ item }) =>
                  <TouchableWithoutFeedback onPress={() => this.selectCountry(item.name)}>
                    <View style={styles.countryStyle}>
                      <Text style={styles.textStyle}>
                        {item.flag} {item.name} ({item.dial_code})
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                }
              />
            </View>
            <View style={styles.closeButtonStyle}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => this.hideModal()}>
              <Text style={styles.textBtn}>
                Close
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* website link */}
        <View style = {[styles.nameInputView, { 
              borderBottomColor: isWebsiteFocused ? colors.green
              :theme.secondaryTextColor}]}>
          <DisplayText
            styles={StyleSheet.flatten(styles.titleText)}
            text = {'Website URL'}
          />
          <View style = {{flexDirection : 'row', width : '75%'}}>
            <View style = {styles.circleView}></View>
            <InputField
              placeholder={'www.ciromahassan.com'}
              placeholderTextColor = {theme.secondaryTextColor}
              textColor={theme.primaryTextColor}
              inputType={'default'}
              keyboardType={'website'}
              onChangeText = {(website)=>{this.setState({website})}}
              autoCapitalize = "words"
              height = {30}
              width = {'100%'}
              borderBottomWidth = {0}
              refs={(input) => { this.websiteRef = input; }}
              borderColor = {theme.colorAccent}
              defaultValue={website}
              editable = {true}
              returnKeyType = {"next"}
              blurOnSubmit={false}
              onFocus={()=>this.setState({isWebsiteFocused:true})}
              onBlur={()=>this.setState({isWebsiteFocused:false})}
              onSubmitEditing={() => { 
                this.facebookRef && this.facebookRef.focus()
              }}

              /> 
              <TouchableOpacity 
                style = {{paddingLeft : 8, paddingTop : 8}}
                onPress = {this.handleWebsiteStatus}>
              <Image
                onPress = {this.handleWebsiteStatus}
                source = {require('../../assets/images/edit.png')}
                style = {StyleSheet.flatten(styles.penIcon)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style = {styles.socialMediaView}>
          <View style = {styles.headerTxt}>
            <DisplayText
              styles={StyleSheet.flatten(styles.titleText)}
              text = {'Social Media'}
            />
            <DisplayText
              styles={StyleSheet.flatten(styles.publicText)}
              text = {'Public'}
            />
          </View>
          {/*  facebook */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {[styles.textInputView, { 
                    borderBottomColor: isFacebookFocused ? colors.green
                    :theme.secondaryTextColor}]}>
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/facebook.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'ciromahas'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {(facebook)=>{this.setState({facebook})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      defaultValue={facebook}
                      borderColor = {theme.colorAccent}
                      editable = {true}
                      returnKeyType = {"next"}
                      blurOnSubmit={false}
                      refs={(input) => { this.facebookRef = input; }}
                      onFocus={()=>this.setState({isFacebookFocused:true})}
                      onBlur={()=>this.setState({isFacebookFocused:false})}
                      onSubmitEditing={() => { 
                        this.twitterRef && this.twitterRef.focus()
                      }}

                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {()=>{}}>
                      <Image
                        onPress = {()=>{}}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleFbSwitch}
                    value={facebook_visible}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
            {/* Twitter input */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {[styles.textInputView, { 
                    borderBottomColor: isTwitterFocused ? colors.green
                    :theme.secondaryTextColor}]}>
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/twitter.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'ciromahassan'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'twitter'}
                      onChangeText = {(twitter)=>{this.setState({twitter})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      borderColor = {theme.colorAccent}
                      editable={true}
                      defaultValue={twitter}
                      returnKeyType = {"next"}
                      blurOnSubmit={false}
                      refs={(input) => { this.twitterRef = input; }}
                      onFocus={()=>this.setState({isTwitterFocused:true})}
                      onBlur={()=>this.setState({isTwitterFocused:false})}
                      onSubmitEditing={() => { 
                        this.linkedInRef && this.linkedInRef.focus()
                      }}
                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {()=>{}}>
                      <Image
                        onPress = {()=>{}}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleTwitSwitch}
                    value={twitter_visible}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
            {/* linked in */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
                <View style = {[styles.textInputView, { 
                    borderBottomColor: isLinkedInFocused ? colors.green
                    :theme.secondaryTextColor}]}>
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/linkedin.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'Hassan_Ciroma'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {(linkedin)=>{this.setState({linkedin})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      borderColor = {theme.colorAccent}
                      editable={true}
                      defaultValue={linkedin}
                      returnKeyType = {"next"}
                      blurOnSubmit={false}
                      refs={(input) => { this.linkedInRef = input; }}
                      onFocus={()=>this.setState({isLinkedInFocused:true})}
                      onBlur={()=>this.setState({isLinkedInFocused:false})}
                      onSubmitEditing={() => { 
                        this.instagramRef && this.instagramRef.focus()
                      }}
                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {()=>{}}>
                      <Image
                        onPress = {()=>{}}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleLinkedInSwitch}
                    value={linkedin_visible}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
            {/* Instagram */}
            <View style = {styles.bodyView}>
              <View style={styles.socialView}>
              <View style = {[styles.textInputView, { 
                    borderBottomColor: isInstagramFocused ? colors.green
                    :theme.secondaryTextColor}]}>   
                  <View style = {{flexDirection : 'row', width : '75%'}}>
                    <Image
                      source = {require('../../assets/images/instagram.png')}
                      style = {StyleSheet.flatten(styles.socialIcon)}
                    />               
                    <InputField
                      placeholder={'CiromaHassan'}
                      placeholderTextColor = {theme.secondaryTextColor}
                      textColor={theme.primaryTextColor}
                      inputType={'name'}
                      keyboardType={'default'}
                      onChangeText = {(instagram)=>{this.setState({instagram})}}
                      autoCapitalize = "words"
                      height = {30}
                      width = {'100%'}
                      borderBottomWidth = {0}
                      borderColor = {theme.colorAccent}
                      defaultValue={instagram}
                      editable={true}
                      returnKeyType = {"done"}
                      blurOnSubmit={false}
                      refs={(input) => { this.instagramRef = input; }}
                      onFocus={()=>this.setState({isInstagramFocused:true})}
                      onBlur={()=>this.setState({isInstagramFocused:false})}
                      onSubmitEditing={() => { 
                        this.handleSubmitButton();
                      }}
                      
                      /> 
                    <TouchableOpacity 
                      style = {{paddingLeft : 8, paddingTop : 8}}
                      onPress = {()=>{}}>
                      <Image
                        onPress = {()=>{}}
                        source = {require('../../assets/images/edit.png')}
                        style = {StyleSheet.flatten(styles.penIcon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {styles.toggleButtonView}>
                  <Switch
                    onValueChange={this._handleToggleInstaSwitch}
                    value={instagram_visible}
                    trackColor = {theme.secondaryTextColor}
                    thumbColor = {theme.colorAccent}
                    />
                </View>
              </View>
            </View>
          </View>
          <View style = {styles.btnView}>
            <SubmitButton
              title={'Complete'}
              disabled={false}
              onPress={this.handleSubmitButton}
              imgSrc={require('../../assets/images/resume.png')}
              btnStyle={styles.buttonWithImage}
              imgStyle={StyleSheet.flatten(styles.iconDoor)}
              titleStyle={StyleSheet.flatten(styles.buttonTxt)}
            />
 
            <Preloader
              modalVisible={this.state.showLoading}
             animationType="fade"
            />

            <ErrorAlert
              title = {'Error!'} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            />
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    
   )
  }
} 



const mapStateToProps = (state, ownProps) =>{
  return{
     //this profile is updated when a new user fills the onboarding form
    profile: state.ProfileReducer.profile,
   // this is used to store user payload upon login
    //profile: state.loginReducer.profile

  }
}

export default connect(mapStateToProps)(OnboardingSocial)


