'use strict';
import React, { Component } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Keyboard,
  Platform,
} from 'react-native';
import { InputField, SubmitButton, Preloader, Paragraph } from 'components';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import styles from './styles';
import {
  isEmpty,
  isPhoneValid,
  generateOTPEndpoint,
  saveToLocalStorage,
} from 'utils';
import colors from 'assets/colors';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addProfile } from 'redux/actions/ProfileActions';
import DropdownAlert from 'react-native-dropdownalert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhoneValid: false,
      showLoading: false,
      isPhoneFocused: false,
      showFooter: true,
      expoPushToken: '',
    };
  }

  resetNavigationStack = location => {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: location,
          params: 'login',
        }),
      ],
    });
    this.props.navigation.dispatch(navigateAction);
  };

  handlePhoneChange = phone => {
    if (phone.length > 0) {
      this.setState({
        isPhoneValid: true,
        phone: phone,
      });
    } else {
      if (phone.length < 1) {
        this.setState({
          isPhoneValid: false,
        });
      }
    }
  };

  toggleButtonState = () => {
    const { isPhoneValid } = this.state;

    if (isPhoneValid) {
      return true;
    } else {
      return false;
    }
  };

  handleBackPress = () => this.props.navigation.navigate('Register');
  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    this.registerForPushNotificationsAsync();
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide);
  }

  keyboardDidShow = () => this.showFooterImage();

  keyboardDidHide = () => this.showFooterImage();

  showFooterImage = () =>
    this.setState(prevState => ({
      showFooter: !prevState.showFooter,
    }));

  formValidation = () => {
    this.showLoadingDialogue();
    const { phone } = this.state;
    if (isEmpty(phone) || !isPhoneValid(phone)) {
      return this.showNotification(
        'error',
        'Message',
        'Enter valid phone number',
      );
    }
    return this.requestLogin(phone);
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return this.showNotification(
        'info',
        'Message',
        'Please enable Push Notifications in device settings',
      );
    }
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ expoPushToken: token });
  };

  requestLogin = async phone => {
    let { expoPushToken } = this.state;
    let stripedPhone = phone.substring(1);
    phone = `${'+234'}${stripedPhone}`;
    let body = {
      contact: phone,
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
          res.error[0].phone.isPhoneNumber,
        );
      }
      await saveToLocalStorage(expoPushToken, phone);
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('Verification');
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  render() {
    const { showLoading, showFooter } = this.state;

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
        <KeyboardAwareScrollView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.wrapper}
        >
          <View style={styles.welcomeTextLayout}>
            <Paragraph text={'Get Started'} styles={styles.introText} />
          </View>

          <View style={styles.formLayout}>
            <Paragraph text={'Phone Number'} styles={styles.labelText} />

            <InputField
              placeholder={'080xxxxxxxx'}
              placeholderTextColor={'#00000033'}
              textColor={colors.blackShade}
              inputType={'phone'}
              onChangeText={this.handlePhoneChange}
              autoCapitalize='none'
              autoCompleteType='tel'
              textContentType='telephoneNumber'
              keyboardType='phone-pad'
              width={'100%'}
              borderBottomColor={'#00000033'}
              maxLength={11}
              returnKeyType={'done'}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.formValidation();
              }}
            />
            <SubmitButton
              title={'Log in'}
              disabled={!this.toggleButtonState()}
              onPress={this.formValidation}
              btnStyle={styles.buttonStyle}
              titleStyle={styles.buttonTxt}
            />
          </View>

          <Preloader modalVisible={showLoading} animationType='fade' />
        </KeyboardAwareScrollView>
        {showFooter ? (
          <View style={styles.footerImageLayout}>
            <Image
              style={styles.footerImage}
              source={require('assets/images/loginImage.png')}
            />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setProfile: data => {
      dispatch(addProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
