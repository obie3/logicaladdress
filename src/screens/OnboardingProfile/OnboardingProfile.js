'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, KeyboardAvoidingView,StatusBar,Text, Modal,TouchableHighlight,Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField, ErrorAlert, Preloader } from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import theme from '../../assets/theme';
import {isEmpty, putRoute, sendRoute, ProfileUpdateEndpoint, ImageUploadEndpoint, getProfile} from '../../utils';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {connect} from 'react-redux';
import { addProfile } from '../../redux/actions/ProfileActions';


 class OnboardingProfile extends Component {
  constructor(props) { 
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      isValidCategory : false,
      catVisible : false,
      modalCategoryVisible : false,
      token: '',
      isValidTitle : false,
      titleVisible : false,
      modalTitleVisible : false,
      showLoading: false,
      title:'',
      modalTitleVisible: false,
      isValidTitle: false,
      isNameValid: false,
      name : '',
      job_title : '',
      isJobTitleValid : false,
      role:'',
      _id:'',
      name_title: 'Mr',
      token: '',
      name: '',
      namestatus: false,
      jobstatus: false,
      jobtitle: '',
      photo:'',
      isNameFocused:false,
      isJobTitleFocused:false,
    }
  }

  async componentDidMount(){
    //logout();
     let asyncProfile = await getProfile();  
    const {profile} = this.props;
      try {
        this.setState({
          'token':asyncProfile.sessionToken,
          '_id' : profile._id,
          'name': profile.name,
          'name_title': profile.title,
          'job_title': profile.job_title,
          'photo': profile.photo
        })
      }
      catch(e){
         this.setState({
          'token':asyncProfile.sessionToken,
          '_id' : asyncProfile.id
        })

    }
     
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images',
        quality:0.1,
        base64:true,
      });
      this._handleImagePicked(pickerResult);
    }
  }

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
       showLoading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await this.uploadImageAsync(pickerResult); 
      }
    } catch (e) {
     // console.log({'e..': e})
      this.setState({
        showAlert: true,
        message: 'Oops Something Went Wrong',
        title: 'Hello'
        });
    } finally {
     
    }
  }

  handleEdit = () => {
    this.props.navigation.navigate('OnboardingSocial')
  }

  uploadImageAsync = async(pickerResult) =>{
    this.setState({
      showLoading: true,
    });

    let uriParts = pickerResult.uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
    let data = await JSON.stringify({
      'photo' : pickerResult.base64 ,
      'name' : Math.floor(Date.now() / 1000).toString(),
      'type' : `${pickerResult.type}/${fileType}`
    });
    
     await sendRoute (ImageUploadEndpoint, data)
      .then((res) => {
        //console.log({'upload to s3 ': res})
        this.setState({ 
          showLoading : false, 
        });

        if(typeof res.Location !== 'undefined') {
          this.handleUpdateImageUri(res.Location); 
        } 
        else {
          this.setState({ 
            showLoading : false, 
            message: res.message,
            showAlert: true,
            title: 'Hello'
          });
        }
      });
    }
  


  handleUpdateImageUri =async(photo)=>{
     const {_id, token} = this.state
    let data = await JSON.stringify({
      'query':{_id},
      'update' : {photo}   
    });
     // console.log({data})
    await putRoute (ProfileUpdateEndpoint, data, token)
      .then((res) => {
       // console.log({'upload uri ': res})
        this.setState({ 
          showLoading : false, 
        });

        if(res.status == 'success') {
          let data = {'photo':res.data.photo};
          this.setState({ 
            showLoading : false, 
            photo:res.data.photo,
          });
         return this.props.setProfile(data);

        } 
        else {
          this.setState({ 
           showLoading : false, 
           message: res.message,
           showAlert: true,
           title: 'Hello'
         });
       }
      });
  }

  handleSubmitForm =async()=> {

    const {name, job_title, name_title} = this.state;
    if(isEmpty(name)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Name'
      })
    }
    else if(isEmpty(job_title)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Job Title'
      })
    }

    let data = await {
      title: name_title, name, job_title  
    };
    this.props.setProfile(data);
    this.props.navigation.navigate('OnboardingBio');
  }

  
  handleNameChange = (name) => {
    if(name.length > 0) {
      this.setState({
        isNameValid: true,
        name
      });
    }
    else {
      if (name.length < 1) {
        this.setState({
          isNameValid : false
        });
      }
    }
  }
  handleJobTitleChange = (job_title) => {
    if(job_title.length > 0) {
      this.setState({
        isJobTitleValid: true,
        job_title
      });
    }
    else {
      if (job_title.length < 1) {
        this.setState({
          isJobTitleValid : false
        });
      }
    }
  }

  setTitlePicker = (newValue) => {
    this.setState({
      name_title: newValue,
      isValidTitle: true
    });
    this.closeTitleModal();
  }

  handleTitle = () => {
    this.toggleTitleModal(true);
  };

  toggleTitleModal = (visible) => {
    this.setState({ modalTitleVisible : visible });
  };

  closeTitleModal = () => {
    this.toggleTitleModal(!this.state.modalTitleVisible);
  };



  render () {
    const {showLoading, name_title, title, message, showAlert, name, photo, job_title, isNameFocused, isJobTitleFocused} = this.state;
    const pickerTitle = [
      {title: 'Mr', value: 'Mr'},
      {title: 'Mrs', value: 'Mrs'},
      {title: 'Dr', value: 'Dr'},
      {title: 'Barr', value: 'Barr'},
      {title: 'Prof', value: 'Prof'},
      {title: 'Eng', value: 'Eng'},
      {title: 'Miss', value: 'Miss'},
      {title: 'Chief', value: 'Chief'},

    ];
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.navBar}>
       
        <View style = {styles.nameView}>
          <DisplayText
            text={'PROFILE'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      {/* End of Toolbar */}
      <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
        <ScrollView style={{flex:1,}} showsVerticalScrollIndicator={false}>
          <View style = {styles.viewBody}>

        <View style = {styles.imageView}>
          { 
            photo && photo.length > 0 ?
            <Image 
              resizeMode = 'contain'
              source={{ uri: photo }} 
              style={styles.imageStyle} 
              /> 
              : 
            <Image
              resizeMode = 'contain'
              style = {styles.imageStyle}
              source = {require('../../assets/images/name.png')}
              />
          }
          
          <TouchableOpacity 
            style = { styles.cameraTouch}
            onPress={this._pickImage}>
            <Image
              onPress={this._pickImage}
              source = {require('../../assets/images/camera.png')}
              style = {StyleSheet.flatten(styles.cameraIcon)}
            />
          </TouchableOpacity>
        </View>
        <DisplayText
          styles={StyleSheet.flatten(styles.profileNameTxt)}
          text = {name}
        />

          <View style = {styles.titleView}>
            <View style = {styles.formContainer}>
                <DisplayText
                  text={'Title *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  onPress = {this.handleTitle}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtTitle}>
                    <Text style = {styles.titleText}>
                      {name_title}
                    </Text>
                    <Image
                      source = {require('../../assets/images/down_arrow.png')}
                      style = {StyleSheet.flatten(styles.downArrow)}
                    />
                  </View>
                </TouchableOpacity>
                
              </View>
              <Modal
              animationType="slide"
              transparent={true}
              visible = {this.state.modalTitleVisible}
              onRequestClose={() => {console.log('Request was closed')}}>
              <View style={styles.modalContainer}> 
                <View style={styles.modalStyle}>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <DisplayText
                        style={styles.textHeaderStyle}
                        text ={' Title '} 
                        />
                        {pickerTitle.map((value, index) => {
                          return <TouchableHighlight key={index} onPress={() => this.setTitlePicker(value.value)}>
                            <Text style={styles.modalTxt}>{value.title}</Text>
                          </TouchableHighlight>;
                        })
                        }                    
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
          </View>
          {/* Name TextInput */}
          <View style = {[styles.nameInputView, { 
            borderBottomColor: isNameFocused ? colors.green
            :theme.secondaryTextColor,
              }]}>
            <DisplayText
              styles={StyleSheet.flatten(styles.nameText)}
              text = {'Name'}
            />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                placeholderTextColor = {colors.blackShade}
                textColor={theme.primaryTextColor}
                inputType={'name'}
                keyboardType={'default'}
                onChangeText = {this.handleNameChange}
                autoCapitalize = "words"
                height = {30}
                width = {'100%'}
                borderColor = {theme.colorAccent}
                defaultValue = {name}
                editable = {true}
                ref={this.fullname}
                returnKeyType = {"next"}
                blurOnSubmit={false}
                borderBottomWidth = {0}
                onFocus={()=>this.setState({isNameFocused:true})}
                onBlur={()=>this.setState({isNameFocused:false})}
                onSubmitEditing={() => { 
                  this.jobTitleRef && this.jobTitleRef.focus()
                }}
                /> 
                <TouchableOpacity onPress = {this.handleNametataus}>
                <Image
                  onPress = {this.handleNamestatus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>

          </View>

          <View style = {[styles.titleInputView, { 
            borderBottomColor: isJobTitleFocused ? colors.green
            :theme.secondaryTextColor,
              }]}>
            <DisplayText
              styles={StyleSheet.flatten(styles.jobtitleText)}
              text = {'Job Title'}
            />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                placeholderTextColor = {colors.blackShade}
                textColor={theme.primaryTextColor}
                inputType={'default'}
                keyboardType={'default'}
                onChangeText = {this.handleJobTitleChange}
                autoCapitalize = "words"
                height = {30}
                width = {'100%'}
                returnKeyType = {"done"}
                borderColor = {theme.colorAccent}
                defaultValue = {job_title}
                editable={true}
                borderBottomWidth = {0}
                returnKeyType = {"next"}
                blurOnSubmit={false}
                refs={(input) => { this.jobTitleRef = input; }}
                onFocus={()=>this.setState({isJobTitleFocused:true})}
                onBlur={()=>this.setState({isJobTitleFocused:false})}
                onSubmitEditing={() => { 
                  this.handleSubmitForm();
                }}
                
                /> 
                <TouchableOpacity onPress = {this.handleJobStataus}>
                <Image
                  onPress = {this.handleJobStataus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            onPress = {this.handleSubmitForm}
            style = {styles.buttonView}>
            <DisplayText
              onPress = {this.handleSubmitForm}
              text={'NEXT'}
              styles = {StyleSheet.flatten(styles.txtNext)}
            />
            <Image
              onPress = {this.handleSubmitForm}
              source = {require('../../assets/images/foward_arrow.png')}
              style = {StyleSheet.flatten(styles.nextIcon)}
            />
          </TouchableOpacity>

          <Preloader
              modalVisible={showLoading}
             animationType="fade"
            />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        
        <ErrorAlert
          title = {'Error!'} 
          message = {message}
          handleCloseNotification = {this.handleCloseNotification}
          visible = {showAlert}
        />
        
      </SafeAreaView>
    )
  }
} 


const mapStateToProps = (state, ownProps) =>{
  return{
    profile: state.ProfileReducer.profile
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      setProfile: (data) =>{dispatch(addProfile(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingProfile)


