'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform, Image } from 'react-native';
import {
  Paragraph,
  SubmitButton,
  Verified,
  Preloader,
  Icons,
} from 'components';
import {
  getProfile,
  fetchToken,
  UpdateProfileEndpoint,
  AddProfileFieldEndpoint,
} from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import colors from 'assets/colors';
import DropdownAlert from 'react-native-dropdownalert';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_FOLDER,
  CLOUDINARY_ACCOUNT_NAME,
  GOOGLE_CLOUD_VISION_API_KEY,
} from 'react-native-dotenv';
class DocumentUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'LogicalAddress',
      data: [],
      token: '',
      showLoading: false,
      image: require('assets/images/upload.png'),
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let data = {};
    let payload = await getProfile();
    let response = await fetchToken();
    return this.setState({});
  };

  formatProfileKey = key => {
    let nLabel = key.charAt(0).toUpperCase() + key.slice(1);
    return nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });
  handleProfileLink = () => this.props.navigation.navigate('Profile');

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  updateProfile = async body => {
    const { token } = this.state;
    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ fields: [body] }),
    };

    try {
      const response = await fetch(UpdateProfileEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error);
      }
      return true;
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  handleCreateField = async body => {
    const { token } = this.state;
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ fields: [body] }),
    };

    try {
      const response = await fetch(AddProfileFieldEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error);
      }
      return true;
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  gotoMap = () => this.props.navigation.navigate('Map');
  showEdit = () => this.props.navigation.navigate('Profile');

  launchCamera = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA,
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );

    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        // base64: true,
      });

      if (!pickerResult.cancelled) {
        // this.setState({ image: { uri: pickerResult.uri } });
        this.setState({ image: pickerResult.uri });
        this.submitToGoogle();
      }
      //this.uploadImageAsync(pickerResult.uri);
    } else {
      return this.showNotification(
        'info',
        'Message',
        'Permission to access camera is required',
      );
    }
  };

  getImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      return this.showNotification(
        'info',
        'Message',
        'Permission to access device directory is required',
      );
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      //base64: true,
    });
    if (!result.cancelled) {
      const { uri, base64 } = result;
      //this.showLoadingDialogue();
      // this.setState({ image: { uri } });
      this.setState({ image: uri });

      // this.submitToGoogle();

      return this.uploadImage(uri, base64);
    }
    return;
  };

  uploadImage = async (uri, base64) => {
    const { profileItemIds } = this.state;
    const uriArr = uri.split('.');
    const fileType = uriArr[uriArr.length - 1];
    const file = `data:${fileType};base64,${base64}`;

    const body = new FormData();
    body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    body.append('uri', uri);
    body.append('cloud_name', CLOUDINARY_ACCOUNT_NAME);
    body.append('file', file);
    body.append('folder', CLOUDINARY_FOLDER);

    const settings = {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, settings);
      const res = await response.json();
      if (typeof res.secure_url === 'undefined') {
        return this.showNotification('error', 'Message', res.error.message);
      }
      let data = {
        fieldId: profileItemIds.profilePhoto,
        value: res.secure_url,
      };
      // this.updateProfile(data).then(res => {
      //   if (res) {
      //     return this.setState({ photo: res.secure_url });
      //   }
      // });
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  submitToGoogle = async () => {
    try {
      //this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'FACE_DETECTION', maxResults: 5 },
              { type: 'LOGO_DETECTION', maxResults: 5 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
            ],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      let response = await fetch(
        `${'https://vision.googleapis.com/v1/images:annotate?key='}${'AIzaSyDxmgYB3yO_HCeR5x8CGuG_5iL85keiMyA'}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        googleResponse: responseJson,
        showLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { params, firstName, photo, showLoading, image } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />
        <View style={styles.editIconWrapper}>
          <Icons
            name={Platform.OS === 'ios' ? 'angle-left' : 'long-arrow-left'}
            iconColor={colors.blue}
            iconSize={25}
            onPress={this.handleProfileLink}
            iconStyle={styles.editIcon}
          />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.uploadLayout}>
            <Image style={styles.imageLayout} source={image} />

            <View style={styles.documentMsgLayout}>
              <Paragraph
                styles={[styles.headerText, { paddingBottom: '6%' }]}
                text={
                  'Upload a non expired goverment issued identity card or passport.'
                }
              />

              <View style={styles.btnView}>
                <SubmitButton
                  title={'Use Camera'}
                  onPress={this.launchCamera}
                  // imgSrc={require('assets/images/loginIcon.png')}
                  btnStyle={styles.button}
                  // imgStyle={styles.btnIcon}
                  titleStyle={[styles.buttonTxt, { color: colors.blue }]}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
            <View style={styles.altLinkLayout}>
              <View style={styles.horizontalRule} />
              <Paragraph text={'or'} styles={styles.headerText} />
              <View style={styles.horizontalRule} />
            </View>

            <SubmitButton
              title={'Use Gallery'}
              onPress={this.getImage}
              btnStyle={styles.button2}
              titleStyle={styles.buttonTxt}
              disabled={false}
            />
          </View>
          <Preloader modalVisible={showLoading} animationType='fade' />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // program: state.ProgramReducer.program,
  };
};

export default connect(mapStateToProps)(DocumentUpload);

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyMzQ3MDM3MzI0MzIzIiwiaWF0IjoxNTg2NjkyODYzLCJleHAiOjE1ODY2OTY0NjN9.UjJN18hRp6wf2MXJPggrNfOq3zLWOxkFBYJqaLPVLS0"
