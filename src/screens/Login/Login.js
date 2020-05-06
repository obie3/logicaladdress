'use strict';
import React, { Component } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';
import { InputField, SubmitButton, Preloader, Paragraph } from 'components';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import {
  isEmpty,
  isPhoneValid,
  generateOTPEndpoint,
  saveToLocalStorage,
} from 'utils';
import colors from 'assets/colors';
import logicallogo from 'assets/images/logo.png';
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
      showFooter: true,
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
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

  requestLogin = async phone => {
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
      await saveToLocalStorage(null, null, phone);
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
        <View style={styles.wrapper}>
          {/* <View style={styles.logoLayout}>
          <Image source={logicallogo} style={[styles.logo]} />

          </View> */}

          <View style={styles.welcomeTextLayout}>
            <Paragraph text={'LOGIN'} styles={styles.introText} />
          </View>

          <View style={{ backgroundColor: 'white', height: '30%' }}>
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

            <View style={styles.btnView}>
              <SubmitButton
                title={'Log in'}
                disabled={!this.toggleButtonState()}
                onPress={this.formValidation}
                btnStyle={styles.buttonWithImage}
                titleStyle={styles.buttonTxt}
              />
            </View>
          </View>
          {showFooter ? (
            <View style={styles.footerImageLayout}>
              <Image
                style={styles.footerImage}
                source={require('assets/images/loginImage.png')}
              />
            </View>
          ) : null}

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
    setProfile: data => {
      dispatch(addProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
