'use strict';
import React, { Component } from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Paragraph, Line, Icons, Navbar, Preloader } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LookupLogicalAddressEndpoint, fetchToken } from 'utils';
import DropdownAlert from 'react-native-dropdownalert';

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
let tempAddress = [];
export default class Dialer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      logicalAddress: '',
      isDisabled: true,
      status: true,
      showLoading: false,
      disableNumbers: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  showLoadingDialogue = () => this.setState({ showLoading: true });

  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  onChangeText = text => {
    const { logicalAddress } = this.state;
    tempAddress.push(text);
    let newAddress = `${logicalAddress}${text}`;
    let btnStatus = newAddress.length > 9 ? false : true;
    let delStatus = tempAddress.length > 0 ? false : true;
    return this.setState({
      logicalAddress: newAddress,
      isDisabled: btnStatus,
      status: delStatus,
      disableNumbers: !btnStatus,
    });
  };

  onDeletePress = () => {
    tempAddress.pop();
    let btnStatus = true,
      logicalAddress = '',
      delStatus = true;
    if (tempAddress.length > 0) {
      logicalAddress = tempAddress.reduce((prev, cur) => {
        return `${prev}${cur}`;
      });

      btnStatus = logicalAddress.length > 9 ? false : true;
      delStatus = logicalAddress.length > 0 ? false : true;
    }

    return this.setState({
      logicalAddress,
      isDisabled: btnStatus,
      status: delStatus,
      disableNumbers: !btnStatus,
    });
  };

  handleBackPress = () => this.props.navigation.navigate('Navigations');

  onDialPress = async () => {
    this.showLoadingDialogue();
    let res = await fetchToken();
    let token = res.token;
    const { logicalAddress } = this.state;
    let params = { token, logicalAddress };
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await fetch(
        `${LookupLogicalAddressEndpoint}${logicalAddress}`,
        settings,
      );
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        this.hideLoadingDialogue();
        return this.showNotification('error', 'Message', res.message);
      } else if (res.data.profileFields.length > 0) {
        this.hideLoadingDialogue();
        return this.props.navigation.navigate('LookupDetails', {
          params: res.data,
        });
      }
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('SelectFields', { params });
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  renderRow = ({ item }) => {
    const { disableNumbers } = this.state;
    const opacityStyle = disableNumbers ? 0.2 : null;

    return (
      <TouchableOpacity
        key={item}
        style={[{ opacity: opacityStyle }, styles.profileRowItem]}
        onPress={() => this.onChangeText(item)}
        disabled={disableNumbers}
      >
        <View style={styles.numberItem}>
          <Paragraph
            text={item}
            styles={styles.fieldLabel}
            onPress={() => (disableNumbers ? this.onChangeText(item) : null)}
          />
        </View>

        <Line />
      </TouchableOpacity>
    );
  };

  render() {
    const { logicalAddress, isDisabled, status, showLoading } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
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
          size={hp('4%')}
          layoutSize={3}
          leftIconName={'keyboard-arrow-left'}
          rightIconName={null}
          rightIconColor={colors.blue}
          leftIconColor={colors.iconColor}
          headerTitle={null}
          leftIconOnPress={this.handleBackPress}
          rightIconOnPress={() => {}}
        />

        <View style={{ height: hp('25%'), justifyContent: 'center' }}>
          <Paragraph
            text={'Dial users logicalAddress \n to connect'}
            styles={styles.requestMessage}
          />
        </View>

        <View style={styles.formLayout}>
          <View style={styles.textInput}>
            <View style={styles.deleteIconView}>
              <Icons
                name={null}
                iconStyle={styles.deleteIcon}
                iconColor={colors.label}
                iconSize={hp('4%')}
                onPress={this.onDeletePress}
                disabled={status}
              />
            </View>

            <View style={styles.contentInputLayout}>
              <Paragraph text={logicalAddress} styles={styles.inputTextStyle} />
            </View>
            <View style={styles.deleteIconView}>
              <Icons
                name={'chevron-left'}
                iconStyle={styles.deleteIcon}
                iconColor={colors.label}
                iconSize={hp('5%')}
                onPress={this.onDeletePress}
                disabled={status}
              />
            </View>
          </View>
          {/* <View style={styles.hrLine}/> */}
          <View style={styles.dialerLayout}>
            <FlatList
              extraData={this.state}
              numColumns={3}
              data={NUMBERS}
              renderItem={this.renderRow}
              keyExtractor={NUMBERS => NUMBERS}
              ItemSeparatorComponent={this.renderSeparator}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <Preloader modalVisible={showLoading} animationType='fade' />
          <View style={styles.dialIconLayout}>
            <Icons
              name={'phone'}
              iconStyle={styles.dialIcon}
              iconColor={colors.white}
              iconSize={hp('3%')}
              onPress={this.onDialPress}
              disabled={isDisabled}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
