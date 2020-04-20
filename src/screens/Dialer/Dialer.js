'use strict';
import React, { Component } from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Paragraph, Line, Preloader, Icons } from 'components';
import styles from './styles';
import { FetchProfileFiled, fetchToken } from 'utils';
import { connect } from 'react-redux';
import { addProfile } from 'redux/actions/ProfileActions';
import colors from 'assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropdownAlert from 'react-native-dropdownalert';

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
let tempAddress = [];
class Dialer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      token: '',
      logicalAddress: '',
      showLoading: false,
      isDisabled: true,
      status: true,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  showLoadingDialogue = () => this.setState({ showLoading: true });

  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  getToken = async () => {
    let response = await fetchToken();
    return this.setState({ token: response.token });
  };

  onChangeText = text => {
    const { logicalAddress } = this.state;
    tempAddress.push(text);
    let newAddress = `${logicalAddress}${text}`;
    let btnStatus = newAddress.length > 5 ? false : true;
    let delStatus = tempAddress.length > 0 ? false : true;
    return this.setState({
      logicalAddress: newAddress,
      isDisabled: btnStatus,
      status: delStatus,
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

      btnStatus = logicalAddress.length > 5 ? false : true;
      delStatus = logicalAddress.length > 0 ? false : true;
    }

    return this.setState({
      logicalAddress,
      isDisabled: btnStatus,
      status: delStatus,
    });
  };

  onBackPress = () => this.props.navigation.navigate('Navigations');

  onDialPress = async () => {
    const { logicalAddress, token } = this.state;
    this.showLoadingDialogue();
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await fetch(FetchProfileFiled, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.message);
      }
      let params = {
        token: token,
        data: res.data,
        logicalAddress: logicalAddress,
      };
      this.hideLoadingDialogue();
      return this.props.navigation.navigate('SelectFields', { params });
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        key={item}
        style={styles.profileRowItem}
        onPress={() => this.onChangeText(item)}
      >
        <View style={styles.numberItem}>
          <Paragraph
            text={item}
            styles={styles.fieldLabel}
            onPress={() => this.onChangeText(item)}
          />
        </View>

        <Line />
      </TouchableOpacity>
    );
  };

  render() {
    const { logicalAddress, showLoading, isDisabled, status } = this.state;
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
        <View style={styles.navBar}>
          <View style={styles.backIconLayout}>
            <Icons
              name={'ios-arrow-back'}
              iconStyle={styles.backIcon}
              iconColor={colors.blue}
              iconSize={hp('2%')}
              onPress={this.onBackPress}
            />
          </View>
        </View>

        <View style={{ height: hp('25%'), justifyContent: 'center' }}>
          <Paragraph
            text={'Dial users logicalAddress \n to connect'}
            styles={styles.requestMessage}
          />
        </View>

        <View style={styles.formLayout}>
          <View style={styles.textInput}>
            <View style={styles.contentInputLayout}>
              <Paragraph text={logicalAddress} styles={styles.inputTextStyle} />
            </View>
            <View style={styles.deleteIconView}>
              <Icons
                name={'ios-backspace'}
                iconStyle={styles.deleteIcon}
                iconColor={colors.blue}
                iconSize={hp('4%')}
                onPress={this.onDeletePress}
                disabled={status}
              />
            </View>
          </View>
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
          <View style={styles.dialIconLayout}>
            <Icons
              name={'ios-call'}
              iconStyle={styles.dialIcon}
              iconColor={colors.white}
              iconSize={hp('3%')}
              onPress={this.onDialPress}
              disabled={isDisabled}
            />
            <Preloader modalVisible={showLoading} animationType='fade' />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.ProfileReducer.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProfile: data => {
      dispatch(addProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialer);
