'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Paragraph,
  SubmitButton,
  Line,
  StatusIcon,
  Preloader,
} from 'components';
import {
  getProfile,
  fetchToken,
  UpdateProfileEndpoint,
  AddProfileFieldEndpoint,
  isEmpty,
  isEmailValid,
} from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import colors from 'assets/colors';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DropdownAlert from 'react-native-dropdownalert';
import * as ImagePicker from 'expo-image-picker';
import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_FOLDER,
  CLOUDINARY_ACCOUNT_NAME,
} from 'react-native-dotenv';

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'LogicalAddress',
      params: {},
      profileData: [],
      data: [],
      token: '',
      showLoading: false,
      photo: '',
      selectedIndex: 0,
      profileItemIds: {},
      selectedIndices: [0],
      customStyleIndex: 0,
      nameArray: [],
      emailArray: [],
      phoneArray: [],
      profileData2: [],
      dialogVisible: false,
      defaultValue: {},
      newText: '',
      tabTitle: 'name',
      index: null,
    };
  }

  componentDidMount() {
    this.getProfile();
    console.log({ props: this.props.profile });
  }

  getProfile = async () => {
    let data = {};
    let payload = await getProfile();
    let response = await fetchToken();
    let res = payload.data.params;
    let phoneArray = [],
      nameArray = [],
      emailArray = [],
      filteredArray = res.profileData;
    res.profileData.map(profile => {
      data[profile.key] = profile.id;
      let label = this.formatProfileKey(profile.key);
      let val = {};
      if (profile.key === 'phone' || profile.key === 'email') {
        // console.log({ profile });
        let value =
          profile.key === 'phone' ? profile.value.substring(4) : profile.value;
        val['id'] = profile.id;
        val['key'] = label;
        val['isVerified'] = profile.isVerified;
        (val['value'] = profile.key === 'phone' ? `${'0'}${value}` : value),
          phoneArray.push(val);
      } else if (profile.key.includes('Name')) {
        val['id'] = profile.id;
        val['key'] = label;
        val['value'] = profile.value;
        val['isVerified'] = profile.isVerified;
        nameArray.push(val);
      }
      filteredArray = filteredArray.filter(record => {
        return (
          record.key !== 'homeLocation' &&
          record.key !== 'profilePhoto' &&
          record.id !== val.id
        );
      });
    });
    return this.setState({
      params: res,
      profileData2: filteredArray,
      profileData: nameArray,
      token: response.token,
      photo: res.profilePhoto,
      profileItemIds: data,
      nameArray,
      emailArray,
      phoneArray,
    });
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

  showDialog = (profile = null, index = null) => {
    return this.setState({
      dialogVisible: true,
      defaultValue: profile,
      newText: profile.value,
      index,
    });
  };

  closeInputDialogue = () => {
    return this.setState({ dialogVisible: false });
  };

  renderSeparator = () => {
    return <Line />;
  };

  renderRow = ({ item }) => {
    let label = this.formatProfileKey(item.key);
    const { isVerified, value } = item;

    return (
      <View style={styles.profileRowItem}>
        <View style={styles.profileItem}>
          <Paragraph text={label} styles={styles.fieldLabel} />
          <Paragraph text={value} styles={styles.nameText} />
        </View>
        <View style={styles.iconLayout}>
          {isVerified ? (
            <StatusIcon name={'ios-checkmark-circle'} color={colors.green} />
          ) : null
          //  <Pending layoutSize={30} size={20} />
          }
        </View>
        <Line />
      </View>
    );
  };

  handleFormValidation = () => {
    this.showLoadingDialogue();
    const { defaultValue, newText } = this.state;
    let value = newText;
    if (isEmpty(newText)) {
      return this.showNotification(
        'error',
        'Message',
        `${defaultValue.key}${' cannot be empty'}`,
      );
    }

    if (newText.length < 2) {
      return this.showNotification(
        'error',
        'Message',
        `${defaultValue.key}${' must be longer than 2 characters'}`,
      );
    }
    if (defaultValue.key === 'Phone') {
      if (newText.length !== 11) {
        return this.showNotification(
          'error',
          'Message',
          `${defaultValue.key}${' number is invalid'}`,
        );
      }
      value = newText.substring(1);
      value = `${'+234'}${value}`;
    }

    if (defaultValue.key === 'Email' && !isEmailValid(newText)) {
      return this.showNotification(
        'error',
        'Message',
        `${defaultValue.key}${' is invalid'}`,
      );
    }

    let data = {
      fieldId: defaultValue.id,
      value,
    };
    return this.updateProfile(data).then(res => {
      if (res) {
        return this.handleArrayUpdate();
      }
    });
  };

  handleArrayUpdate = async () => {
    const {
      index,
      newText,
      tabTitle,
      nameArray,
      emailArray,
      phoneArray,
    } = this.state;
    let field = {};
    if (tabTitle === 'phone') {
      field = await phoneArray[index];
      field.value = newText;
      this.setState({
        phoneArray,
      });
    } else if (tabTitle === 'email') {
      field = await emailArray[index];
      field.value = newText;
      this.setState({
        emailArray,
      });
    } else if (tabTitle === 'name') {
      field = await nameArray[index];
      field.value = newText;
      this.setState({
        nameArray,
      });
    }
    this.showNotification('success', 'Message', 'Success');
    return this.closeInputDialogue();
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

  handleCustomIndexSelect = index => {
    const { nameArray, phoneArray, emailArray } = this.state;
    let filter = [];
    let tabTitle = '';
    if (index === 0) {
      filter = nameArray;
      tabTitle = 'name';
    } else if (index === 1) {
      filter = phoneArray;
      tabTitle = 'contact';
    } else {
      filter = phoneArray;
      tabTitle = 'others';
    }
    return this.setState(prevState => ({
      ...prevState,
      customStyleIndex: index,
      profileData: filter,
      tabTitle,
    }));
  };

  getImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      return this.showNotification(
        'info',
        'Message',
        'Permission to access camera is required',
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
      let value = res.secure_url;
      let data = {
        fieldId: profileItemIds.profilePhoto,
        value,
      };
      this.updateProfile(data).then(res => {
        if (res) {
          this.showNotification('success', 'Message', 'Success');
          return this.setState({ photo: value });
        }
      });
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  render() {
    const {
      params,
      firstName,
      profileData,
      customStyleIndex,
      photo,
      showLoading,
    } = this.state;
    let color = params.isVerfied === true ? colors.green : colors.errorRed;
    let iconName =
      params.isVerified === true
        ? 'ios-checkmark-circle'
        : 'ios-information-circle';
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <View style={styles.wrapper}>
          <View style={styles.avatarLayout}>
            {/* <TouchableOpacity onPress={this.getImage}> */}
            <UserAvatar
              size='120'
              name={firstName}
              color={colors.buttonBlue}
              src={photo}
            />
            {/* </TouchableOpacity> */}

            <View style={styles.verificationIndicators}>
              <Paragraph
                text={params.LogicalAddress}
                styles={styles.addressText}
              />
              <StatusIcon name={iconName} color={color} />
            </View>
            <Paragraph
              text={'LogicalAddress'}
              styles={styles.verificationText}
            />
            <View style={styles.buttonLayout}>
              {!params.isVerfied ? (
                <SubmitButton
                  title={'Set Address'}
                  onPress={this.gotoMap}
                  btnStyle={styles.button}
                  titleStyle={styles.buttonTxt}
                  disabled={false}
                />
              ) : null}
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.tabView}>
              <SegmentedControlTab
                values={['Names', 'Contact', 'Others']}
                selectedIndex={customStyleIndex}
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                onTabPress={this.handleCustomIndexSelect}
                borderRadius={0}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                firstTabStyle={styles.firstTabStyle}
                lastTabStyle={styles.lastTabStyle}
              />
            </View>

            <View style={styles.profileLayout}>
              <FlatList
                extraData={this.state}
                data={profileData}
                renderItem={this.renderRow}
                keyExtractor={profileData => profileData.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <Preloader modalVisible={showLoading} animationType='fade' />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.ProfileReducer.profile,
  };
};

export default connect(mapStateToProps)(ProfileDetail);

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyMzQ3MDM3MzI0MzIzIiwiaWF0IjoxNTg2NjkyODYzLCJleHAiOjE1ODY2OTY0NjN9.UjJN18hRp6wf2MXJPggrNfOq3zLWOxkFBYJqaLPVLS0"
