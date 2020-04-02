'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Paragraph,
  InputField,
  SubmitButton,
  Preloader,
  Logo,
} from 'components';
import colors from 'assets/colors';
import styles from './styles';
import {
  isEmailValid,
  generateOTPEndpoint,
  isPhoneValid,
  saveToLocalStorage,
  isEmpty,
} from 'utils';
import WomanSvg from './WomanSvg';
import DropdownAlert from 'react-native-dropdownalert';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      name: '',
      phone: '',
      isEmailValid: false,
      //isPasswordValid: false,
      isNameValid: false,
      isPhoneValid: false,
      showLoading: false,
      isActive: false,
      isEmailFocused: false,
      isNameFocused: false,
      isPasswordFocused: false,
      isPhoneFocused: false,
      // isChecked: false,
    };

    this.fullname = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.phone = React.createRef();
  }

  handleLoginRoute = () => this.props.navigation.navigate('Login');

  handleNameChange = name => {
    if (name.length > 0) {
      this.setState({
        isNameValid: true,
        name: name,
      });
    } else {
      if (name.length < 1) {
        this.setState({
          isNameValid: false,
        });
      }
    }
  };
  handleEmailChange = email => {
    if (email.length > 0) {
      this.setState({
        isEmailValid: true,
        email: email,
      });
    } else {
      if (email.length < 1) {
        this.setState({
          isEmailValid: false,
        });
      }
    }
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
    const { isEmailValid, isPhoneValid, isNameValid } = this.state;

    if (isEmailValid && isNameValid && isPhoneValid) {
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

  formValidation = () => {
    this.showLoadingDialogue();
    const { email, name, password, phone } = this.state;
    let params = {
      email,
      name,
      password,
      phone,
    };
    if (isEmpty(name)) {
      return this.showNotification('error', 'Message', 'Enter valid name');
    }

    if (name.split(' ').length < 2) {
      return this.showNotification(
        'error',
        'Message',
        'Enter more than one name',
      );
    } else if (!isEmailValid(email)) {
      return this.showNotification('error', 'Message', 'Invalid email address');
    } else if (isEmpty(phone) || !isPhoneValid(phone)) {
      return this.showNotification(
        'error',
        'Message',
        'Enter valid phone number',
      );
    }
    return this.phoneVerification(params);
  };

  phoneVerification = async params => {
    let { phone, email, name } = params;
    let stripedPhone = phone.substring(1);
    phone = `${'+234'}${stripedPhone}`;
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    };

    try {
      const response = await fetch(generateOTPEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.meta.message);
      }
      await saveToLocalStorage(name, email, phone);
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('Verification', params);
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  render() {
    const { showLoading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='default' />
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />

        <KeyboardAvoidingView style={styles.wrapper}>
          <Logo />

          <View>
            <View
              style={[
                styles.textInputView,
                {
                  borderColor: this.state.isNameFocused
                    ? colors.green
                    : colors.whiteShade,
                },
              ]}
            >
              <Image
                source={require('assets/images/name.png')}
                style={styles.iconForm}
              />
              <InputField
                placeholder={'Full Name'}
                placeholderTextColor={colors.blackShade}
                textColor={colors.blackShade}
                inputType={'text'}
                onChangeText={this.handleNameChange}
                autoCapitalize='words'
                height={40}
                width={'90%'}
                borderWidth={1}
                borderColor={colors.white}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onFocus={() => this.setState({ isNameFocused: true })}
                onBlur={() => this.setState({ isNameFocused: false })}
                onSubmitEditing={() => {
                  this.email && this.email.focus();
                }}
              />
            </View>
            <View
              style={[
                styles.textInputView,
                {
                  borderColor: this.state.isEmailFocused
                    ? colors.blue
                    : colors.whiteShade,
                },
              ]}
            >
              <Image
                source={require('assets/images/email.png')}
                style={StyleSheet.flatten(styles.iconForm)}
              />
              <InputField
                placeholder={'Email'}
                placeholderTextColor={colors.blackShade}
                textColor={colors.blackShade}
                inputType={'email'}
                onChangeText={this.handleEmailChange}
                autoCapitalize='none'
                height={40}
                width={'90%'}
                borderColor={colors.white}
                refs={input => {
                  this.email = input;
                }}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onFocus={() => this.setState({ isEmailFocused: true })}
                onBlur={() => this.setState({ isEmailFocused: false })}
                onSubmitEditing={() => {
                  this.phone && this.phone.focus();
                }}
              />
            </View>
            <View
              style={[
                styles.textInputView,
                {
                  borderColor: this.state.isEmailFocused
                    ? colors.blue
                    : colors.whiteShade,
                },
              ]}
            >
              <Image
                source={require('assets/images/call.png')}
                style={StyleSheet.flatten(styles.iconForm)}
              />
              <InputField
                placeholder={'Phone Number'}
                placeholderTextColor={colors.blackShade}
                textColor={colors.blackShade}
                inputType={'phone'}
                onChangeText={this.handlePhoneChange}
                autoCapitalize='none'
                autoCompleteType='tel'
                textContentType='telephoneNumber'
                height={40}
                width={'90%'}
                borderColor={colors.white}
                refs={input => {
                  this.phone = input;
                }}
                returnKeyType={'done'}
                blurOnSubmit={false}
                onFocus={() => this.setState({ isPhoneFocused: true })}
                onBlur={() => this.setState({ isPhoneFocused: false })}
                onSubmitEditing={() => {
                  this.formValidation();
                }}
              />
            </View>

            {/* <View
              style={[
                styles.textInputView,
                {
                  borderColor: this.state.isPasswordFocused
                    ? colors.blue
                    : colors.whiteShade,
                },
              ]}
            > */}
            {/* <Image
                source={require('assets/images/padlock.png')}
                style={styles.iconForm}
              />
              <InputField
                placeholder={'Password'}
                placeholderTextColor={colors.blackShade}
                textColor={colors.blackShade}
                inputType={'password'}
                onChangeText={this.handlePasswordChange}
                autoCapitalize='none'
                height={40}
                width={'90%'}
                borderWidth={1}
                borderColor={colors.white}
                refs={input => {
                  this.password = input;
                }}
                returnKeyType={'done'}
                blurOnSubmit={false}
                onFocus={() => this.setState({ isPasswordFocused: true })}
                onBlur={() => this.setState({ isPasswordFocused: false })}
                onSubmitEditing={() => {
                  this.formValidation();
                }}
              />
            </View> */}
          </View>

          <View style={styles.btnView}>
            <SubmitButton
              title={'Sign Up'}
              disabled={!this.toggleButtonState()}
              onPress={this.formValidation}
              imgSrc={require('assets/images/add_peopl.png')}
              btnStyle={styles.buttonWithImage}
              imgStyle={styles.iconDoor}
              titleStyle={styles.buttonTxt}
            />

            <View style={styles.signupLinkView}>
              <Paragraph
                text={'Already have an Account? '}
                styles={styles.signupText}
                onPress={this.handleLoginRoute}
              />
              <Paragraph
                text={'Log In'}
                styles={styles.createAccount}
                onPress={this.handleLoginRoute}
              />
            </View>
            <Preloader modalVisible={showLoading} animationType='fade' />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footerView}>
          <WomanSvg />
        </View>
      </View>
    );
  }
}
