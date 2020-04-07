'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Logo } from 'components';
import styles from './styles';
import { fetchToken, ProfileEndpoint, saveToLocalStorage } from 'utils';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import DropdownAlert from 'react-native-dropdownalert';
import colors from 'assets/colors';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: {},
      params: [],
      token: '',
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let response = await fetchToken();
    if (response.token) this.getRemoteProfile(response.token);
  };

  showNotification = (type, title, message) => {
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  getRemoteProfile = async token => {
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await fetch(ProfileEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error);
      }
      let data = res.data.profile,
        name = `${data.firstName}${' '}${data.lastName}`,
        phone = data.phone[0],
        profileFields = { params: res.data.profileFields, initial: res.data };
      await saveToLocalStorage(name, profileFields, phone, data.profilePhoto);
      return this.props.navigation.navigate('App');
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  render() {
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
        <View style={styles.viewBody}>
          <Logo />

          <View style={{ padding: 25 }}>
            <Placeholder Left={PlaceholderMedia} Animation={Shine}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
            <Placeholder Left={PlaceholderMedia} Animation={Shine}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
            <Placeholder Left={PlaceholderMedia} Animation={Shine}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
            <Placeholder Left={PlaceholderMedia} Animation={Shine}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
            <Placeholder Left={PlaceholderMedia} Animation={Shine}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
          </View>
        </View>
        {/* <Modal
            animationType={'fase'}
            transparent={true}
            onRequestClose={() => {}}
            visible={true}
          >
            <View style={styles.overlay}></View>
          </Modal> */}
      </SafeAreaView>
    );
  }
}
