'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { Paragraph, SubmitButton, Preloader } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import { Navbar } from 'components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropdownAlert from 'react-native-dropdownalert';
import { RequestConnectionEndpoint, fetchToken } from 'utils';

class SelectFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      showLoading: false,
      logicalAddress: '',
      data: [],
    };
  }

  componentDidMount() {
    this.getNavParams();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => this.props.navigation.goBack();

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });

  getNavParams = async () => {
    let response = this.props.navigation.getParam('params');
    let { token } = await fetchToken();
    return this.setState({
      data: this.props.profileFieldNames,
      token: token,
      logicalAddress: response.logicalAddress,
    });
  };

  onPressHandler = ({ item }) => {
    let renderData = [...this.state.data];
    renderData.map(record => {
      if (record.id === item.id) {
        if (
          typeof record.selected === 'undefined' ||
          record.selected === false
        ) {
          record.selected = true;
        } else {
          record.selected = false;
        }
      }
    });
    this.setState({ data: renderData });
  };

  getSelectedItems = () => {
    let tempArray = [];
    this.state.data.map(item => {
      if (item.selected === true) {
        tempArray.push(item.id);
      }
    });
    return tempArray;
  };

  submitForm = async () => {
    this.showLoadingDialogue();
    const { logicalAddress, token } = this.state;
    let profileFields = this.getSelectedItems();
    let body = JSON.stringify({ logicalAddress, profileFields });
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body,
    };

    try {
      const response = await fetch(RequestConnectionEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.message);
      }
      this.showNotification('success', 'Message', 'Success');
      return setTimeout(
        () => this.props.navigation.navigate('Dashboard'),
        3000,
      );
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.profileRowItem}
        onPress={() => this.onPressHandler({ item })}
      >
        <View style={styles.flatListItem}>
          <View style={styles.flatListName}>
            <Paragraph
              text={item.title}
              styles={styles.flatListText}
              onPress={() => this.onPressHandler({ item })}
            />
          </View>
          <View style={[styles.flatListName, { justifyContent: 'flex-end' }]}>
            <TouchableOpacity style={styles.radioButtonLayout}>
              <TouchableOpacity
                style={
                  item.selected == true
                    ? [styles.radioButton, { backgroundColor: colors.blue }]
                    : styles.radioButton
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hrLine} />
      </TouchableOpacity>
    );
  };

  render() {
    const { data, showLoading } = this.state;
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
        <Navbar
          size={hp('4%')}
          layoutSize={3}
          leftIconName={'ios-arrow-back'}
          rightIconName={null}
          rightIconColor={colors.blue}
          leftIconColor={colors.iconColor}
          headerTitle={null}
          leftIconOnPress={this.handleBackPress}
          rightIconOnPress={() => {}}
        />

        <View
          style={{
            height: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paragraph
            text={
              'Select the information you would like \nto request from this connection \nyou can select multiple items.'
            }
            styles={styles.introMessage}
          />
        </View>

        <View style={styles.flatListLayout}>
          <FlatList
            extraData={this.state}
            data={data}
            renderItem={this.renderRow}
            keyExtractor={data => data.id}
            ItemSeparatorComponent={this.renderSeparator}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.btnView}>
          <SubmitButton
            title={'Submit'}
            disabled={false}
            onPress={this.submitForm}
            btnStyle={styles.buttonWithImage}
            titleStyle={styles.buttonTxt}
          />
        </View>
        <Preloader modalVisible={showLoading} animationType='fade' />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profileFieldNames: state.ProfileReducer.profileFieldNames,
  };
};

export default connect(mapStateToProps)(SelectFields);
