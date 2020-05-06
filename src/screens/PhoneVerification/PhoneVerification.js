import {
  Animated,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useState, memo, useEffect } from 'react';
import { Paragraph, SubmitButton, Preloader, Icons } from 'components';
import CountDown from 'react-native-countdown-component';
import colors from 'assets/colors';
import WomanSvg from './WomanSvg';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  VerifyOTPEndpoint,
  generateOTPEndpoint,
  AddProfileFieldEndpoint,
} from 'utils';
import DropdownAlert from 'react-native-dropdownalert';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';

const { Value, Text: AnimatedText } = Animated;
const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const PhoneVerification = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [nPhone, setnPhone] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [enabledRequest, setEnabledRequest] = useState(true);
  const [startTimer, setStartTimer] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    getParams();
  }, []);

  let resetNavigationStack = () => {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Register',
        }),
      ],
    });
    navigation.dispatch(navigateAction);
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const getParams = async () => {
    let { token, fieldName, value } = navigation.getParam('params');
    setPhone(value);
    setnPhone(value);
    setToken(token);
    setFieldName(fieldName);
  };

  let handleBackPress = async () => {
    return navigation.goBack();
  };

  let showLoadingDialogue = () => {
    return setShowLoading(true);
  };

  let hideLoadingDialogue = () => {
    return setShowLoading(false);
  };

  let showNotification = (type, title, message) => {
    hideLoadingDialogue();
    return dropDownAlertRef.alertWithType(type, title, message);
  };

  let phoneVerification = async () => {
    showLoadingDialogue();
    let otp = value;
    let body = {
      action: 'auth',
      contact: phone,
      otp,
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
      const response = await fetch(VerifyOTPEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return showNotification('error', 'Message', res.error);
      }
      let result = res.data;
      return typeof result.new_user === 'undefined'
        ? showNotification('error', 'Message', 'Sorry phone already exist')
        : submitForm(result.token, fieldName);
    } catch (error) {
      return showNotification('error', 'Hello', error.toString());
    }
  };

  let requestNewToken = async () => {
    showLoadingDialogue();
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact: phone }),
    };

    try {
      const response = await fetch(generateOTPEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return showNotification('error', 'Message', res.error.message);
      }
      setEnabledRequest(false);
      setStartTimer(true);
      return showNotification(
        'success',
        'Message',
        'OTP sent, wait for 15 secs before retrying',
      );
    } catch (error) {
      return showNotification('error', 'Hello', error.toString());
    }
  };

  let submitForm = async (value, fieldName) => {
    let request = { fieldName, value, action: 'create' };
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
        return showNotification('error', 'Message', res.error.message);
      }
      showNotification('success', 'Message', 'Success');
      let params = { params: res.data };
      return setTimeout(
        () => navigation.navigate('Settings', { params }),
        3000,
      );
    } catch (error) {
      return showNotification('error', 'Message', error.toString());
    }
  };

  let activateResentLink = () => {
    setEnabledRequest(true);
    return setStartTimer(false);
  };

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
        ref={ref => (dropDownAlertRef = ref)}
      />

      <View style={styles.navBar}>
        <Icons
          name={'keyboard-arrow-left'}
          iconStyle={styles.backView}
          iconColor={colors.blue}
          iconSize={20}
          onPress={handleBackPress}
        />
      </View>
      <View style={styles.textView}>
        <Paragraph
          text={' Verification Code Sent'}
          styles={styles.Verification}
        />
        <Paragraph
          text={'Enter 4 digits code sent to'}
          styles={styles.msgText}
        />
        <Paragraph text={nPhone} styles={styles.msgText2} />
      </View>
      <View style={styles.optView}>
        {!enabledRequest ? (
          <CountDown
            until={15}
            onFinish={activateResentLink}
            digitStyle={{ backgroundColor: colors.blue }}
            timeToShow={['S']}
            timeLabels={{ s: 'Secs' }}
            running={startTimer}
            digitTxtStyle={styles.buttonTxt}
            size={20}
          />
        ) : null}

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType='number-pad'
          renderCell={renderCell}
        />
        <View style={styles.btnView}>
          <SubmitButton
            title={'Verify'}
            onPress={phoneVerification}
            imgSrc={require('assets/images/add_peopl.png')}
            btnStyle={styles.buttonWithImage}
            imgStyle={styles.iconDoor}
            titleStyle={styles.buttonTxt}
            disabled={false}
          />
          {enabledRequest ? (
            <View style={styles.textView}>
              <Paragraph text={"Didn't get code?"} styles={styles.msgText} />
              <Paragraph
                text={'Resend'}
                styles={styles.resend}
                onPress={requestNewToken}
              />
            </View>
          ) : null}
          <Preloader modalVisible={showLoading} animationType='fade' />
        </View>
      </View>
      <View style={styles.footerView}>
        <WomanSvg />
      </View>
    </SafeAreaView>
  );
};

export default memo(PhoneVerification);
