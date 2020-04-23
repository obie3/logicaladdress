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
import { Paragraph, Line, Icons, Navbar } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
let tempAddress = [];
export default class Dialer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      token: '',
      logicalAddress: '',
      isDisabled: true,
      status: true,
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

  handleBackPress = () => this.props.navigation.navigate('Navigations');

  onDialPress = () => {
    const { logicalAddress, token } = this.state;
    let params = {
      token: token,
      logicalAddress: logicalAddress,
    };
    return this.props.navigation.navigate('SelectFields', { params });
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
    const { logicalAddress, isDisabled, status } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <Navbar
          size={hp('4%')}
          layoutSize={3}
          leftIconName={'ios-arrow-back'}
          rightIconName={null}
          rightIconColor={colors.blue}
          leftIconColor={colors.iconColor}
          headerTitle={null}
          leftIconOnPress={this.handleBackPress}
          rightIconOnPress={() => {
            console.log('hello...');
          }}
        />

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
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
