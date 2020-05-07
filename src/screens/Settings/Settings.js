'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Paragraph, Icons, Preloader, Navbar } from 'components';
import { connect } from 'react-redux';
import styles from './styles';
import colors from 'assets/colors';
import {
  logout,
  fetchToken,
  AddProfileFieldEndpoint,
  generateOTPEndpoint,
} from 'utils';
import DialogInput from 'react-native-dialog-input';
import { addProfile } from 'redux/actions/ProfileActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropdownAlert from 'react-native-dropdownalert';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.profileFieldNames,
      isDialogVisible: false,
      showLoading: false,
      token: '',
      fieldName: '',
      label: '',
      currentValue: '',
      showDate: false,
      date: moment()
        .subtract(18, 'years')
        .valueOf(),
    };
  }

  async componentDidMount() {
    let { token } = await fetchToken();
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.initData();
    });
    this.setState({
      token,
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  showLoadingDialogue = () =>
    this.setState({
      showLoading: true,
      isDialogVisible: false,
      showDate: false,
    });
  hideLoadingDialogue = () => this.setState({ showLoading: false });
  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  showContactTracingPage = () =>
    this.props.navigation.navigate('ContactTracing');
  showPermissionsPage = () => this.props.navigation.navigate('Permissions');

  showMap = () => this.props.navigation.navigate('Map');

  handleBackPress = () => this.props.navigation.goBack();
  showNotificationPage = () => this.props.navigation.navigate('Notification');

  handleLogoutPress = async () => {
    await logout();
    return this.props.navigation.navigate('Home');
  };

  showInputDialog = (isDialogVisible, fieldName, label) => {
    let field = fieldName.includes('Name') ? 'middleName' : fieldName,
      nLabel = label.includes('name') ? 'Middle name' : label;
    return this.setState({ isDialogVisible, fieldName: field, label: nLabel });
  };

  initData = () => {
    let response = this.props.navigation.getParam('params');
    if (response) {
      let { params } = response;
      let result = params[0];
      let tempData = params[0].value;
      result.value = JSON.parse(tempData);
      result.isVerified = true;
      return this.props.addProfile(result);
    }
  };

  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow });
  }

  showDatepicker = () => {
    return this.setState(prevState => ({
      showDate: !prevState.showDate,
    }));
  };

  onChange = (event, selectedDate) => {
    let { type } = event;
    if (type === 'set') {
      return this.selectRoute(selectedDate);
    }
    return this.showDatepicker();
  };

  canAddItem = item => {
    let profileData = this.props.profileFields;
    let { profileFields } = profileData;
    let { id, title, maxValues } = item;
    let newTitle = id === 'firstName' ? 'middleName' : id;
    let result = profileFields.filter(item => item.key === newTitle);
    if (result.length < maxValues) {
      switch (id) {
        case 'dob':
          this.showDatepicker();
          break;
        case 'homeLocation':
          this.showMap();
          break;
        default:
          this.showInputDialog(true, id, title);
      }
    } else {
      return this.showNotification(
        'info',
        'Message',
        `${'You have reached maximum entries for '}${newTitle}`,
      );
    }
  };

  selectRoute = text => {
    this.showLoadingDialogue();
    let { fieldName, token } = this.state;
    if (!fieldName.includes('email') && !fieldName.includes('phone')) {
      return this.submitForm(text, 'dob');
    } else {
      return this.requestToken(fieldName, text, token);
    }
  };

  requestToken = async (fieldName, text, token) => {
    let value = text;
    if (fieldName.includes('phone')) {
      let stripedPhone = text.substring(1);
      value = `${'+234'}${stripedPhone}`;
    }

    let body = {
      contact: value,
      action: 'auth',
    };
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(generateOTPEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification(
          'error',
          'Message',
          res.error.message.message,
        );
      }
      let params = { value, token, fieldName };
      this.showDialog(false);
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('PhoneVerification', { params });
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  submitForm = async (value, fname = null) => {
    const { fieldName, token } = this.state;
    let name = fname ? fname : fieldName;
    let request = { fieldName: name, value, action: 'create' };
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
      const response = await fetch(AddProfileFieldEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error.message);
      }
      let result = res.data[0];
      let tempData = res.data[0].value;
      result.value = JSON.parse(tempData);
      this.props.addProfile(result);
      return this.showNotification('success', 'Message', 'Success');
    } catch (error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  };

  renderRow = ({ item }) => {
    let { title, id } = item;
    if (id !== 'profilePhoto' && id !== 'middleName' && id !== 'lastName') {
      let iconName;
      switch (id) {
        case 'email':
          iconName = 'contact-mail';
          break;
        case 'phone':
          iconName = 'phone-iphone';
          break;
        case 'humanHomeAddress':
          iconName = 'home';
          break;
        case 'homeLocation':
          iconName = 'location-city';
          break;
        case 'dob':
          iconName = 'date-range';
          break;
        default:
          iconName = 'assignment-ind';
      }

      return (
        <TouchableOpacity
          key={id}
          style={styles.cardLayout}
          onPress={() => this.canAddItem(item)}
        >
          <View style={styles.cardContent}>
            <Paragraph
              styles={styles.cardText}
              text={title === 'First name' ? 'Name' : title}
            />

            <Icons
              name={iconName}
              color={colors.label}
              iconStyle={styles.forwardIcon}
              iconColor={'#95a5a6'}
              iconSize={hp('3%')}
            />
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const {
      data,
      isDialogVisible,
      showLoading,
      label,
      showDate,
      date,
    } = this.state;
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
          size={20}
          layoutSize={3}
          leftIconName={'keyboard-arrow-left'}
          rightIconName={'notifications'}
          rightIconColor={colors.blue}
          leftIconColor={colors.blue}
          headerTitle={'Settings'}
          leftIconOnPress={this.handleBackPress}
          rightIconOnPress={this.showNotificationPage}
        />

        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={this.showContactTracingPage}
            style={styles.cardLayout}
          >
            <View style={styles.cardContent}>
              <Paragraph styles={styles.cardText} text={'Contact Tracing'} />

              <Icons
                disabled={false}
                onPress={this.showContactTracingPage}
                name={'location-searching'}
                iconStyle={styles.forwardIcon}
                iconColor={'#95a5a6'}
                iconSize={20}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.showPermissionsPage}
            style={styles.cardLayout}
          >
            <View style={styles.cardContent}>
              <Paragraph styles={styles.cardText} text={'Permissions'} />

              <Icons
                disabled={false}
                onPress={this.showPermissionsPage}
                name={'lock-open'}
                iconStyle={styles.forwardIcon}
                iconColor={'#95a5a6'}
                iconSize={20}
              />
            </View>
          </TouchableOpacity>

          <FlatList
            extraData={this.state}
            data={data}
            renderItem={this.renderRow}
            keyExtractor={data => data.id}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.logoutLayout}>
            <Icons
              disabled={false}
              onPress={this.handleLogoutPress}
              name={'exit-to-app'}
              iconStyle={styles.buttonStyle}
              iconColor={'#7f8c8d'}
              iconSize={20}
            />
          </View>
          <DialogInput
            isDialogVisible={isDialogVisible}
            title={`${'Add '}${label}`}
            hintInput={`${'Enter '}${label}`}
            submitInput={inputText => this.selectRoute(inputText)}
            closeDialog={() => {
              this.showDialog(false);
            }}
          />
          {showDate && (
            <DateTimePicker
              testID='dateTimePicker'
              timeZoneOffsetInMinutes={0}
              value={date}
              maximumDate={date}
              mode={'date'}
              display='spinner'
              onChange={this.onChange}
            />
          )}
        </View>
        <Preloader modalVisible={showLoading} animationType='fade' />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profileFieldNames: state.ProfileReducer.profileFieldNames,
    profileFields: state.ProfileReducer.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProfile: data => dispatch(addProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
