import { Animated, SafeAreaView, View, StatusBar } from 'react-native';
import React, { useState, memo, useEffect } from 'react';
import { Paragraph, SubmitButton, Preloader, BackIcon } from 'components';

import {
  fetchProfile,
  saveToken,
  VerifyOTPEndpoint,
  generateOTPEndpoint,
  RegistrationEndpoint,
  ProfileEndpoint,
  logout,
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

const VerificationScreen = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [phone, setPhone] = useState('');
  const [nPhone, setnPhone] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [params, setParams] = useState({});

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    getParams();
  }, []);

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
    let profile = await fetchProfile();
    let nPhone = profile.phone.substring(4);
    nPhone = `${'0'}${nPhone}`;
    setPhone(profile.phone);
    setnPhone(nPhone);
    setParams(profile);
  };

  let handleBackPress = async () => {
    await logout();
    return navigation.navigate('Login');
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
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, otp }),
    };

    try {
      const response = await fetch(VerifyOTPEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return showNotification('error', 'Message', res.error);
      }
      let result = res.data;
      await saveToken(result.token);
      return typeof result.user === 'undefined'
        ? completeRegistration(result.token, params)
        : navigation.navigate('App'); //getProfile(result.token);
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
      body: JSON.stringify({ phone }),
    };

    try {
      const response = await fetch(generateOTPEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return showNotification('error', 'Message', res.error.message);
      }
      return showNotification('success', 'Message', 'OTP sent successfully');
    } catch (error) {
      return showNotification('error', 'Hello', error.toString());
    }
  };

  let completeRegistration = async (token, params) => {
    let name = params.name.split(' ');
    let defaultParams = {
      firstName: name[0],
      email: params.email ? params.email : '',
    };
    let body =
      name.length == 2
        ? { ...defaultParams, lastName: name[1] }
        : { ...defaultParams, lastName: name[2], middleName: name[1] };

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
        return showNotification('error', 'Message', res.error);
      }
      await saveToken(res.data.token);
      hideLoadingDialogue();
      return navigation.navigate('App');
      //return getProfile(result);
    } catch (error) {
      return showNotification('error', 'Hello', error.toString());
    }
  };

  let getProfile = async token => {
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      //body: JSON.stringify(body),
    };

    try {
      const response = await fetch(ProfileEndpoint, settings);
      const res = await response.json();
      console.log({ 'profile res': token });
      if (typeof res.data === 'undefined') {
        return showNotification('error', 'Message', res.error);
      }
      //let result = res.data;
      await saveToLocalStorage(phone);
      hideLoadingDialogue();
      return navigation.navigate('App');
    } catch (error) {
      return showNotification('error', 'Hello', error.toString());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='default' />
      <DropdownAlert
        duration={5}
        defaultContainer={styles.alert}
        ref={ref => (dropDownAlertRef = ref)}
      />
      <BackIcon onPress={handleBackPress} />
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

          <View style={styles.textView}>
            <Paragraph text={"Didn't get code?"} styles={styles.msgText} />
            <Paragraph
              text={'Resend'}
              styles={styles.resend}
              onPress={requestNewToken}
            />
          </View>
          <Preloader modalVisible={showLoading} animationType='fade' />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(VerificationScreen);
