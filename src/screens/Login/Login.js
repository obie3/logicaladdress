'use strict';
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  InputField,
  SubmitButton,
  Preloader,
  Logo,
  Paragraph,
} from 'components';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhoneValid: false,
      showLoading: false,
      isPhoneFocused: false,
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
  handleForgetPassword = () => this.props.navigation.navigate('ForgetPassword');
  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

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

  requestLogin = async phone => {
    let stripedPhone = phone.substring(1);
    phone = `${'+234'}${stripedPhone}`;
    let body = {
      phone,
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
      await saveToLocalStorage(null, null, phone);
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('Verification');
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  render() {
    const { showLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />
        {/* <BackIcon onPress={this.handleBackPress} /> */}

        <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
          <View style={styles.LogoLayout}>
            <Logo />
          </View>
          <View style={{ paddingBottom: 100 }}>
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
              {/* <View > */}
              <InputField
                placeholder={'Phone'}
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
            <View style={styles.btnView}>
              <SubmitButton
                title={'Log in'}
                disabled={!this.toggleButtonState()}
                onPress={this.formValidation}
                imgSrc={require('assets/images/loginIcon.png')}
                btnStyle={styles.buttonWithImage}
                imgStyle={styles.iconDoor}
                titleStyle={styles.buttonTxt}
              />
            </View>
            <View style={styles.signupLinkView}>
              <Paragraph
                text={'Dont have an Account? '}
                styles={styles.signupText}
                onPress={this.handleLoginRoute}
              />
              <Paragraph
                text={'Signup'}
                styles={styles.createAccount}
                onPress={this.handleBackPress}
              />
            </View>
          </View>
          <Preloader modalVisible={showLoading} animationType='fade' />
        </KeyboardAvoidingView>
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
