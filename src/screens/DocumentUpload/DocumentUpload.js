'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform, Image } from 'react-native';
import { Paragraph, SubmitButton, Preloader, Navbar } from 'components';
import { fetchToken, AddDocumentEndpoint } from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import colors from 'assets/colors';
import DropdownAlert from 'react-native-dropdownalert';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { addDocument } from 'redux/actions/DocumentActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SwitchSelector from 'react-native-switch-selector';

import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_FOLDER,
  CLOUDINARY_ACCOUNT_NAME,
} from 'react-native-dotenv';
class DocumentUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'LogicalAddress',
      data: [],
      token: '',
      showLoading: false,
      type: 'idCard',
      image: require('assets/images/upload.png'),
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let { token } = await fetchToken();
    return this.setState({ token });
  };

  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });
  handleBackPress = () => this.props.navigation.navigate('Profile');

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

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
        base64: true,
      });

      if (!pickerResult.cancelled) {
        const { uri, base64 } = pickerResult;
        this.showLoadingDialogue();
        return this.uploadImageToCloudinary(uri, base64);
      }
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
      base64: true,
    });
    if (!result.cancelled) {
      const { uri, base64 } = result;
      this.showLoadingDialogue();
      return this.uploadImageToCloudinary(uri, base64);
    }
    return;
  };

  uploadImageToCloudinary = async (uri, base64) => {
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
      let cloudinaryUrl = res.secure_url;
      return this.uploadDocumentAsync(cloudinaryUrl);
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  uploadDocumentAsync = async url => {
    const { token, type } = this.state;
    let that = this;
    let body = JSON.stringify({ url, type });
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body,
    };

    try {
      const response = await fetch(AddDocumentEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error.message);
      }
      that.showNotification('success', 'Message', 'Success');
      that.setState({ image: { uri: url } });
      that.props.addDocument(res.data);
      return setTimeout(() => {
        that.handleBackPress();
      }, 3000);
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  render() {
    const { showLoading, image } = this.state;
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
        <Navbar
          size={hp('4%')}
          layoutSize={3}
          leftIconName={'keyboard-arrow-left'}
          rightIconName={null}
          rightIconColor={colors.blue}
          leftIconColor={colors.iconColor}
          headerTitle={null}
          leftIconOnPress={this.handleBackPress}
          rightIconOnPress={null}
        />

        <View style={styles.wrapper}>
          <View style={styles.uploadLayout}>
            <Image style={styles.imageLayout} source={image} />

            <View style={styles.documentMsgLayout}>
              <Paragraph
                styles={[styles.headerText, { paddingBottom: '6%' }]}
                text={
                  'Upload a non expired goverment issued identity card or passport \n to verify your personal details \n and any utility bill or postcard \nto verify physicaal address'
                }
              />

              <SwitchSelector
                initial={0}
                onPress={value => this.setState({ type: value })}
                textColor={colors.blue}
                selectedColor={colors.white}
                buttonColor={colors.blue}
                borderRadius={4}
                height={50}
                hasPadding
                selectedTextStyle={[styles.buttonTxt]}
                textStyle={[styles.buttonTxt, { color: colors.blue }]}
                options={[
                  { label: 'Identity Card', value: 'idCard' },
                  { label: 'utitlity | PostCard', value: 'postCard' },
                ]}
              />

              <View style={styles.btnView}>
                <SubmitButton
                  title={'Use Camera'}
                  onPress={this.launchCamera}
                  btnStyle={styles.button}
                  disabled={false}
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addDocument: document => {
      dispatch(addDocument(document));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUpload);
