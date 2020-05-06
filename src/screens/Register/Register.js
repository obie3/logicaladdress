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
  saveToLocalStorage,
  isEmpty,
  fetchToken,
  saveToken,
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
    };
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
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
    let { token } = await fetchToken();
    const { firstName, lastName, middleName, isMiddleNameValid } = this.state;
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
    return this.completeRegistration(params, token);
  };

  completeRegistration = async (params, token) => {
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
      await saveToken(res.data.token);
      await saveToLocalStorage(name, email, phone);
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('OnBoarding');
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
              keyboardType='name-phone-pad'
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
              keyboardType='name-phone-pad'
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
