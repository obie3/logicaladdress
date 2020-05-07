'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Keyboard,
  Platform,
} from 'react-native';
import { Paragraph, InputField, SubmitButton, Preloader } from 'components';
import colors from 'assets/colors';
import styles from './styles';
import {
  RegistrationEndpoint,
  fetchToken,
  saveToken,
  RegisterPushNotificationEndpoint,
  fetchLocalStorageData,
} from 'utils';
import DropdownAlert from 'react-native-dropdownalert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      isFirstNameValid: false,
      isLastNameValid: false,
      showLoading: false,
      isActive: false,
      isNameFocused: false,
      showFooter: true,
      expoPushToken: null,
      token: '',
    };
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    this.initToken();
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide);
  }

  initToken = async () => {
    let { token } = await fetchToken();
    let { expoPushToken } = await fetchLocalStorageData();
    return this.setState({
      token,
      expoPushToken,
    });
  };

  keyboardDidShow = () => this.showFooterImage();

  keyboardDidHide = () => this.showFooterImage();

  showFooterImage = () =>
    this.setState(prevState => ({
      showFooter: !prevState.showFooter,
    }));

  handleLoginRoute = () => this.props.navigation.navigate('Login');

  handleFirstNameChange = name => {
    if (name.length > 0) {
      this.setState({
        isFirstNameValid: true,
        firstName: name,
      });
    } else {
      this.setState({
        isFirstNameValid: false,
      });
    }
  };
  handleMiddleNameChange = name => {
    if (name.length > 0) {
      this.setState({
        isMiddleNameValid: true,
        middleName: name,
      });
    } else {
      this.setState({
        isMiddleNameValid: false,
      });
    }
  };

  handleLastNameChange = name => {
    if (name.length > 0) {
      this.setState({
        isLastNameValid: true,
        lastName: name,
      });
    } else {
      this.setState({
        isLastNameValid: false,
      });
    }
  };

  toggleButtonState = () => {
    const { isFirstNameValid, isLastNameValid } = this.state;

    if (isFirstNameValid && isLastNameValid) {
      return true;
    } else {
      return false;
    }
  };

  showLoadingDialogue = () => this.setState({ showLoading: true });

  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  formValidation = async () => {
    this.showLoadingDialogue();

    const {
      firstName,
      lastName,
      middleName,
      isMiddleNameValid,
      token,
      expoPushToken,
    } = this.state;
    let item1 = { fieldName: 'firstName', value: firstName, action: 'create' };
    let item2 = {
      fieldName: 'middleName',
      value: middleName,
      action: 'create',
    };
    let item3 = { fieldName: 'lastName', value: lastName, action: 'create' };

    if (firstName.length < 2) {
      return this.showNotification(
        'error',
        'Message',
        'First Name is too short',
      );
    } else if (isMiddleNameValid && middleName.length < 2) {
      return this.showNotification(
        'error',
        'Message',
        'Middle Name is too short',
      );
    } else if (lastName.length < 2) {
      return this.showNotification(
        'error',
        'Message',
        'Last Name is too short',
      );
    }
    let params = isMiddleNameValid ? [item1, item2, item3] : [item1, item3];
    return this.completeRegistration(params, token, expoPushToken);
  };

  completeRegistration = async (params, token, expoPushToken) => {
    let body = { fields: params };
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        TempAuthorization: token,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(RegistrationEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error.message);
      }
      await saveToken(res.data.token, 'old');
      if (expoPushToken) {
        await this.registerPushNotification(res.data.token, expoPushToken);
      }
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('AppInit');
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  registerPushNotification = async (token, expoPushToken) => {
    let body = {
      token: expoPushToken,
    };
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(RegisterPushNotificationEndpoint, settings);
      const res = await response.json();
      return res;
    } catch (error) {
      return showNotification('error', 'Hello', error.toString());
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
          {/* <View style={styles.logoLayout}>
          <Image source={logicallogo} style={[styles.logo]} />

          </View> */}

          <View style={styles.welcomeTextLayout}>
            <Paragraph text={"Let's know you"} styles={styles.introText} />
          </View>
          <View style={styles.formLayout}>
            <View style={styles.labelLayout}>
              <Paragraph text={'First Name'} styles={styles.labelText} />
              <Paragraph
                text={'*'}
                styles={[styles.labelText, { color: 'red' }]}
              />
            </View>

            <InputField
              placeholder={'John'}
              placeholderTextColor={'#00000033'}
              textColor={colors.blackShade}
              inputType={'text'}
              onChangeText={this.handleFirstNameChange}
              autoCapitalize='words'
              autoCompleteType='name'
              textContentType='givenName'
              width={'100%'}
              borderBottomColor={'#00000033'}
              maxLength={11}
              returnKeyType={'next'}
              blurOnSubmit={false}
            />

            <View style={styles.labelLayout}>
              <Paragraph text={'Middle Name'} styles={styles.labelText} />
            </View>
            <InputField
              placeholder={'Doe'}
              placeholderTextColor={'#00000033'}
              textColor={colors.blackShade}
              inputType={'text'}
              onChangeText={this.handleMiddleNameChange}
              autoCapitalize='words'
              autoCompleteType='name'
              textContentType='middleName'
              width={'100%'}
              borderBottomColor={'#00000033'}
              maxLength={11}
              returnKeyType={'next'}
              blurOnSubmit={true}
            />
            <View style={styles.labelLayout}>
              <Paragraph text={'Last Name'} styles={styles.labelText} />
              <Paragraph
                text={'*'}
                styles={[styles.labelText, { color: 'red' }]}
              />
            </View>

            <InputField
              placeholder={'John'}
              placeholderTextColor={'#00000033'}
              textColor={colors.blackShade}
              inputType={'text'}
              onChangeText={this.handleLastNameChange}
              autoCapitalize='words'
              autoCompleteType='name'
              textContentType='familyName'
              width={'100%'}
              borderBottomColor={'#00000033'}
              maxLength={11}
              returnKeyType={'next'}
              blurOnSubmit={true}
            />
            <SubmitButton
              title={'Submit'}
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

// Object {
//   "fields": Array [
//     Object {
//       "action": "create",
//       "fieldName": "firstName",
//       "value": "Justice",
//     },
//     Object {
//       "action": "create",
//       "fieldName": "middleName",
//       "value": "James",
//     },
//     Object {
//       "action": "create",
//       "fieldName": "lastName",
//       "value": "Ogebe",
//     },
//   ],
// }
