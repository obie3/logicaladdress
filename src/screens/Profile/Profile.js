'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import { Paragraph, SubmitButton, Line, BackIcon, Preloader } from 'components';
import { getProfile, UpdateProfileEndpoint, fetchToken } from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import colors from 'assets/colors';
import { TextField } from 'react-native-material-textfield';
import DropdownAlert from 'react-native-dropdownalert';
import * as ImagePicker from 'expo-image-picker';
import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_FOLDER,
  CLOUDINARY_ACCOUNT_NAME,
} from 'react-native-dotenv';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'LogicalAddress',
      params: {},
      profileData: [],
      token: '',
      showLoading: false,
      photo: null,
    };

    this.nameRef = this.updateRef.bind(this, 'name');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.phoneRef = this.updateRef.bind(this, 'phone');
  }

  componentDidMount() {
    this.getProfile();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  getProfile = async () => {
    let payload = await getProfile();
    let response = await fetchToken();
    let res = payload.data;
    return this.setState({
      params: res.params,
      profileData: res.params.profileData,
      token: response.token,
      photo: res.params.profilePhoto,
    });
  };

  handleBackPress = () => this.props.navigation.navigate('OnBoarding');

  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  onFocus = () => {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  };

  onChangeText = text => {
    ['name', 'phone', 'email']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  };

  onSubmitName = () => {
    this.email.focus();
  };

  onSubmitEmail = () => {
    this.phone.focus();
  };

  onSubmitPhone = () => {
    this.phone.blur();
  };

  updateRef(name, ref) {
    this[name] = ref;
  }

  onSubmit = () => {
    this.showLoadingDialogue();
    let errors = {},
      body = {};
    ['name', 'phone', 'email'].forEach(name => {
      let value = this[name].value();
      if (!value) {
        errors[name] = 'should not be empty';
      } else {
        if ('name' === name) {
          let ulteredName = value.split(' ');
          if (ulteredName.length < 2) {
            errors[name] = 'enter atleast 2 names';
          } else {
            if (ulteredName.length === 2) {
              body['firstName'] = ulteredName[0];
              body['lastName'] = ulteredName[1];
            } else {
              body['firstName'] = ulteredName[0];
              body['middleName'] = ulteredName[1];
              body['lastName'] = ulteredName[2];
            }
          }
        } else if ('phone' === name) {
          // console.log({ name });
          if (value.length !== 11) {
            errors[name] = 'phone number is invalid';
          } else {
            let nPhone = value.substring(1);
            body['phone'] = `${'+234'}${nPhone}`;
          }
        }
      }
    });
    if (Object.entries(errors).length > 0) {
      this.hideLoadingDialogue();
      return this.setState({ errors });
    } else {
      return this.updateProfile(body);
    }
  };

  updateProfile = async body => {
    const { token, params } = this.state;
    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(`${UpdateProfileEndpoint}${19}`, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error);
      }
      this.hideLoadingDialogue();
      return this.showNotification('success', 'Message', 'Success');
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  getImage = async () => {
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
      return this.uploadImage(uri, base64);
    }
    return;
  };

  uploadImage = async (uri, base64) => {
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
      let data = { value: res.secure_url };
      this.setState({ photo: res.secure_url });
      return this.updateProfile(data);
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  render() {
    let { params, firstName, errors = {}, showLoading, photo } = this.state;

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

        <BackIcon onPress={this.handleBackPress} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardLayout}>
            {/* <Paragraph
                text={'Profile Update'}
                styles={[styles.headerText, { fontWeight: 'bold' }]}
            /> */}
            <View style={styles.avatarLayout}>
              <UserAvatar
                size='150'
                name={firstName}
                color={colors.buttonBlue}
                src={photo}
              />
            </View>
            <View style={[styles.buttonLayout]}>
              <SubmitButton
                title={'Select'}
                onPress={this.getImage}
                btnStyle={[
                  styles.imageButton,
                  { height: '55%', marginTop: 50 },
                ]}
                imgSrc={require('assets/images/photo.png')}
                imgStyle={[styles.btnIcon, { marginLeft: -35 }]}
                disabled={false}
              />
            </View>
            <View style={styles.cardContents}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: '15%',
                }}
              ></View>

              <Line />

              <TextField
                ref={this.nameRef}
                defaultValue={params.firstName}
                value={params.firstName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitName}
                autoCapitalize='words'
                returnKeyType='next'
                label='Full Names'
                style={styles.nameText}
                //textColor={'rgba(0, 0, 0, 0)'}
                error={errors.name}
                titleTextStyle={styles.nameText}
              />

              <TextField
                ref={this.emailRef}
                defaultValue={params.email}
                value={params.email}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType='next'
                label='Email Address'
                style={styles.nameText}
                error={errors.email}
              />

              <TextField
                ref={this.phoneRef}
                defaultValue={params.phone}
                value={params.phone}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPhone}
                returnKeyType='done'
                label='Phone Number'
                title='use format: 08161730129'
                style={styles.nameText}
                error={errors.phone}
              />

              <View style={styles.btnView}>
                <SubmitButton
                  title={'Update'}
                  disabled={false}
                  onPress={this.onSubmit}
                  imgSrc={require('assets/images/add_peopl.png')}
                  btnStyle={styles.button}
                  imgStyle={styles.btnIcon}
                  titleStyle={styles.buttonTxt}
                />
              </View>

              <Preloader modalVisible={showLoading} animationType='fade' />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    program: state.ProgramReducer.program,
  };
};

export default connect(mapStateToProps)(Dashboard);
