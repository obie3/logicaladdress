'use strict';
import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Paragraph, Preloader, StatusIcon } from 'components';
import {
  UpdateProfileEndpoint,
  fetchToken,
  DeleteProfileFieldEndpoint,
} from 'utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from 'assets/colors';
let no_image =
  'https://gravatar.com/avatar/02bf38fddbfe9f82b94203336f9ebc41?s=200&d=retro';
import DialogInput from 'react-native-dialog-input';
import moment from 'moment';
import UserAvatar from 'react-native-user-avatar';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_FOLDER,
  CLOUDINARY_ACCOUNT_NAME,
} from 'react-native-dotenv';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameArray: [],
      addressArray: [],
      phoneArray: [],
      emailArray: [],
      profileData: [],
      logicalAddress: 'Logical Address',
      isDialogVisible: false,
      showLoading: false,
      token: '',
      fieldName: '',
      fieldId: '',
      label: '',
      dob: {},
      homeLocation: {},
      currentValue: '',
      showDate: false,
      date: moment()
        .subtract(18, 'years')
        .valueOf(),
    };
  }

  async componentDidMount() {
    let { token } = await fetchToken();
    this.setState({ token });
    this.initData();
  }

  showLoadingDialogue = () =>
    this.setState({
      isDialogVisible: false,
      showDate: false,
      showLoading: true,
    });
  hideLoadingDialogue = () => this.setState({ showLoading: false });

  handleBackPress = () => this.props.navigation.goBack();

  formatProfileKey = key => {
    let nLabel = key.charAt(0).toUpperCase() + key.slice(1);
    return nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  showDatepicker = (fieldId = null) => {
    this.setState({
      showDate: true,
      fieldId,
    });
  };

  showMap = (fieldId = null) => this.props.navigation.navigate('Map');

  hideDatePicker = () => {
    this.setState({
      showDate: false,
    });
  };

  onChange = (event, selectedDate) => {
    let { type } = event;
    if (type === 'set') {
      return this.submitForm(selectedDate);
    }
    return;
  };

  getImage = async item => {
    let message = {};
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
        return this.uploadImage(uri, base64, item);
      } else {
        message = {
          handle: 'info',
          title: 'Message',
          message: 'Profile picture update cancelled',
        };
        return this.props.showResponse(message);
      }
    } else {
      message = {
        handle: 'info',
        title: 'Message',
        message: 'Permission to access camera is required',
      };
      return this.props.showResponse(message);
    }
  };

  uploadImage = async (uri, base64, item) => {
    const uriArr = uri.split('.');
    const fileType = uriArr[uriArr.length - 1];
    const file = `data:${fileType};base64,${base64}`;
    const { img } = this.state;
    let message = {};

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
        message = {
          handle: 'error',
          title: 'Message',
          message: res.error.message,
        };
        this.hideLoadingDialogue();
        return this.props.showResponse(message);
      }
      let value = res.secure_url;
      let data = {
        fieldId: item.id,
        value,
      };
      this.updateProfile(data).then(res => {
        if (res) {
          message = {
            handle: 'success',
            title: 'Message',
            message: 'Success',
          };
          this.hideLoadingDialogue();
          img.value = value;
          this.setState({ img });
          return this.props.showResponse(message);
        }
      });
    } catch (error) {
      message = {
        handle: 'error',
        title: 'Message',
        message: error.toString(),
      };
      this.hideLoadingDialogue();
      return this.props.showResponse(message);
    }
  };

  updateProfile = async body => {
    const { token } = this.state;
    let message = {};
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
        message = {
          handle: 'error',
          title: 'Message',
          message: res.error,
        };
        this.hideLoadingDialogue();
        return this.props.showResponse(message);
      }
      return true;
    } catch (error) {
      message = {
        handle: 'error',
        title: 'Message',
        message: error.toString(),
      };
      this.hideLoadingDialogue();
      return this.props.showResponse(message);
    }
  };

  initData = () => {
    const { profile } = this.props;
    let { profileFields, logicalAddress } = profile;
    let phoneArray = [],
      nameArray = [],
      emailArray = [],
      addressArray = [],
      profileImage = null,
      dob = {},
      homeLocation = {};

    profileFields.map(profile => {
      let { key, value, id, isVerified } = profile;
      let label = this.formatProfileKey(key);
      let val = {};

      if (key.includes('Name')) {
        val['id'] = id;
        val['key'] = label;
        val['value'] = value;
        val['status'] = isVerified;
        val['isEditable'] = false;
        nameArray.push(val);
      } else if (key === 'phone') {
        val['id'] = id;
        val['key'] = label;
        val['value'] = value;
        val['icon'] = 'phone';
        val['status'] = isVerified;
        val['isEditable'] = false;
        phoneArray.push(val);
      } else if (key === 'email') {
        val['id'] = id;
        val['key'] = label;
        val['value'] = value;
        val['icon'] = 'message';
        val['status'] = isVerified;
        val['isEditable'] = false;
        emailArray.push(val);
      } else if (key.includes('Address')) {
        val['id'] = id;
        val['key'] = label;
        val['icon'] = 'location-city';
        val['value'] = value;
        val['status'] = isVerified;
        val['isEditable'] = false;
        addressArray.push(val);
      } else if (key === 'dob') {
        dob = { value, key, id, status: isVerified };
      } else if (key === 'profilePhoto') {
        profileImage = { value, id, key };
      } else if (key === 'homeLocation') {
        homeLocation = { value, key, id, status: isVerified };
      }
    });
    this.setState({
      nameArray,
      addressArray,
      phoneArray,
      emailArray,
      dob,
      homeLocation,
      logicalAddress,
      img: profileImage,
      profileFields,
      showDate: false,
    });
  };

  renderRow = item => {
    let { id, key, value } = item;
    return (
      <View key={id} style={styles.encrypt}>
        <View style={{ width: '70%' }}>
          <Paragraph text={key} styles={styles.subText} />
          <Paragraph text={value} styles={styles.text} />
        </View>
        {this.renderIcon(item)}
      </View>
    );
  };

  emptyItem = () => {
    return (
      <View style={styles.encrypt}>
        <View>
          <Paragraph text={'Not Available'} styles={styles.text} />
        </View>
        <Icon name='lock' color='#075e54' size={20} style={{ padding: 5 }} />
      </View>
    );
  };

  showInputDialog = (isDialogVisible, fieldId, label, currentValue) => {
    return this.setState({ isDialogVisible, fieldId, label, currentValue });
  };

  showDialog(isShow) {
    return this.setState({ isDialogVisible: isShow, showLoading: isShow });
  }

  renderIcon = item => {
    let { isEditable } = this.props;
    let { id, key, value, status } = item;
    if (isEditable) {
      if (key === 'Phone') {
        return (
          <TouchableOpacity onPress={() => this.deletePhone(item)}>
            <Icon
              name={'delete-forever'}
              color={'#c0392b'}
              size={20}
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onPress={() => this.showInputDialog(true, id, key, value)}
        >
          <Icon
            name={'edit'}
            color='#075e54'
            size={20}
            style={{ padding: 5 }}
          />
        </TouchableOpacity>
      );
    } else if (status) {
      return <StatusIcon name={'ios-checkmark-circle'} color={'#075e54'} />;
    }
  };

  submitForm = async value => {
    this.showLoadingDialogue();
    const { fieldId, token } = this.state;
    let request = { fieldId, value, action: 'update' };
    let body = {
      fields: [request],
    };
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
      const response = await fetch(UpdateProfileEndpoint, settings);
      const res = await response.json();
      let message = {};
      if (typeof res.data === 'undefined') {
        message = {
          handle: 'error',
          title: 'Message',
          message: res.error.message,
        };
        this.hideLoadingDialogue();
        return this.props.showResponse(message);
      }
      message = { handle: 'success', title: 'Message', message: 'Success' };
      let result = res.data[0];
      let tempData = res.data[0].value;
      result.value = JSON.parse(tempData);
      this.props.editProfile(result);
      this.initData();
      this.showDialog(false);
      return this.props.showResponse(message);
    } catch (error) {
      let message = {
        handle: 'error',
        title: 'Message',
        message: error.toString(),
      };
      this.hideLoadingDialogue();
      return this.props.showResponse(message);
    }
  };

  deletePhone = async item => {
    this.showLoadingDialogue();
    const { token } = this.state;
    let { id, value } = item;
    const settings = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    fetch(`${DeleteProfileFieldEndpoint}${id}`, settings)
      .then(res => {
        let message = {};
        if (res.status === 204) {
          this.hideLoadingDialogue();
          this.props.deleteItem(id);
          this.initData();
          message = { handle: 'success', title: 'Message', message: 'Success' };
          return this.props.showResponse(message);
        }
        return res.json();
      })
      .then(res => {
        this.hideLoadingDialogue();
        let message = {
          handle: 'error',
          title: 'Message',
          message: res.error.message,
        };
        return this.props.showResponse(message);
      })
      .catch(error => {
        let message = {
          handle: 'error',
          title: 'Message',
          message: error.toString(),
        };
        this.hideLoadingDialogue();
        return this.props.showResponse(message);
      });
  };

  render() {
    const {
      nameArray,
      phoneArray,
      addressArray,
      logicalAddress,
      dob,
      emailArray,
      img,
      isDialogVisible,
      showLoading,
      label,
      currentValue,
      showDate,
      date,
      homeLocation,
    } = this.state;
    let { isEditable } = this.props;

    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#ecf0f1',
          paddingLeft: wp('3%'),
          paddingRight: wp('3%'),
          paddingBottom: hp('3%'),
        }}
      >
        <View style={styles.avatarLayout}>
          <View
            style={{
              marginTop: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <UserAvatar
              size='200'
              name={'Logical Address'}
              color={colors.buttonBlue}
              src={img ? img.value : no_image}
            />
            {img ? (
              <View style={styles.cameraButton}>
                <Icon
                  name={'linked-camera'}
                  color={colors.blue}
                  size={20}
                  style={styles.shadow}
                  onPress={() => this.getImage(img)}
                />
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.sectionHeaderView}>
          <Paragraph text={'Logical Address'} styles={styles.sectionHeader} />
        </View>

        <View style={styles.card}>
          <View style={styles.encrypt}>
            <View>
              <Paragraph text={'Logical Address'} styles={styles.subText} />
              <Paragraph text={logicalAddress} styles={styles.text} />
            </View>
            <Icon
              name='place'
              color='#075e54'
              size={20}
              style={{ padding: 5 }}
            />
          </View>
        </View>

        <View style={styles.sectionHeaderView}>
          <Paragraph text={'Initials'} styles={styles.sectionHeader} />
        </View>

        <View style={styles.card}>
          {nameArray.length > 0
            ? nameArray.map(item => this.renderRow(item))
            : this.emptyItem()}
        </View>

        <View style={styles.sectionHeaderView}>
          <Paragraph text={'Contacts'} styles={styles.sectionHeader} />
        </View>
        <View style={styles.card}>
          {phoneArray.length > 0
            ? phoneArray.map(item => this.renderRow(item))
            : this.emptyItem()}
        </View>
        <View style={styles.sectionHeaderView}>
          <Paragraph text={'Emails'} styles={styles.sectionHeader} />
        </View>
        <View style={styles.card}>
          {emailArray.length > 0
            ? emailArray.map(item => this.renderRow(item))
            : this.emptyItem()}
        </View>
        <View style={styles.sectionHeaderView}>
          <Paragraph text={'Physical Address'} styles={styles.sectionHeader} />
        </View>

        <View style={styles.card}>
          {addressArray.length > 0
            ? addressArray.map(item => this.renderRow(item))
            : this.emptyItem()}
        </View>

        <View style={styles.sectionHeaderView}>
          <Paragraph text={'DOB'} styles={styles.sectionHeader} />
        </View>

        <View style={styles.card}>
          {dob.value ? (
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'DOB'} styles={styles.subText} />
                <Paragraph
                  text={moment(dob.value).format('MMMM Do, YYYY')}
                  styles={styles.text}
                />
              </View>
              {isEditable ? (
                <TouchableOpacity onPress={() => this.showDatepicker(dob.id)}>
                  <Icon
                    name={'edit'}
                    color='#075e54'
                    size={20}
                    style={{ padding: 5 }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            this.emptyItem()
          )}
        </View>

        <View style={styles.sectionHeaderView}>
          <Paragraph text={'Home Location'} styles={styles.sectionHeader} />
        </View>

        <View style={styles.card}>
          {homeLocation.value ? (
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'Home Location'} styles={styles.subText} />
                <View style={{ flexDirection: 'row' }}>
                  <Paragraph text={'Latitude: '} styles={styles.text} />
                  <Paragraph
                    text={homeLocation.value.latitude}
                    styles={[styles.text, { paddingLeft: 25 }]}
                  />
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Paragraph text={'Longitude: '} styles={styles.text} />
                  <Paragraph
                    text={homeLocation.value.longitude}
                    styles={[styles.text, { paddingLeft: 10 }]}
                  />
                </View>
              </View>
              {isEditable ? (
                <TouchableOpacity onPress={() => this.showMap(homeLocation.id)}>
                  <Icon
                    name={'edit'}
                    color='#075e54'
                    size={20}
                    style={{ padding: 5 }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            this.emptyItem()
          )}
        </View>

        {showDate && (
          <DateTimePicker
            testID='dateTimePicker'
            timeZoneOffsetInMinutes={0}
            value={date}
            maximumDate={date}
            mode={'date'}
            is24Hour={true}
            display='default'
            onChange={this.onChange}
          />
        )}
        <DialogInput
          isDialogVisible={isDialogVisible}
          title={`${'Edit '}${label}`}
          hintInput={`${'Enter '}${label}`}
          initValueTextInput={currentValue}
          submitInput={inputText => this.submitForm(inputText)}
          closeDialog={() => {
            this.showDialog(false);
          }}
        />
        <Preloader modalVisible={showLoading} animationType='fade' />
      </ScrollView>
    );
  }
}
