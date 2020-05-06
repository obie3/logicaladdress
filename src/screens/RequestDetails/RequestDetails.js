'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { Paragraph, SubmitButton, Preloader, Line, Icons } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import DropdownAlert from 'react-native-dropdownalert';
import { ProcessPermissionRequestEndpoint, fetchToken } from 'utils';
import moment from 'moment';

class RequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      showLoading: false,
      logicalAddress: '',
      data: [],
      message: '',
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

  formatProfileKey = key => {
    let nLabel = key.charAt(0).toUpperCase() + key.slice(1);
    return nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  getNavParams = async () => {
    let { item, message } = this.props.navigation.getParam('params');
    let { token } = await fetchToken();
    return this.setState({
      data: item,
      token: token,
      message,
    });
  };

  submitForm = async (id, action) => {
    const { token } = this.state;

    let body = JSON.stringify({ action });
    this.showLoadingDialogue();
    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body,
    };

    fetch(`${ProcessPermissionRequestEndpoint}${id}`, settings)
      .then(res => {
        if (res.status === 204) {
          return this.updateArray(id, action);
        } else {
          return this.showNotification('error', 'Message', res.message);
        }
      })
      .catch(error =>
        this.showNotification('error', 'Hello', error.toString()),
      );
  };

  updateArray = (id, action) => {
    const { data } = this.state;
    if (action === 'grant') {
      let tmp = data.requests.find(item => item.id === id);
      tmp.status = 'granted';
    } else if (action === 'revoke') {
      let tmp = data.requests.find(item => item.id === id);
      tmp.status = 'revoked';
    } else {
      let tmp = data.requests.find(item => item.id === id);
      tmp.status = 'rejected';
    }
    return this.showNotification('success', 'Message', 'Success');
  };

  renderSeparator = () => {
    return <Line />;
  };

  renderRow = ({ item }) => {
    let status = item.status;
    let title = this.formatProfileKey(item.profileField.key);
    let action = status === 'requested' ? 'reject' : 'revoke';
    let posButton = status === 'granted' ? true : false;
    let iconName = 'ios-alert',
      color = colors.errorRed;
    let negButton = false;
    let btnTitle = 'REJECT';
    if (status === 'granted') {
      btnTitle = 'REVOKE';
      iconName = 'ios-checkmark-circle';
      color = colors.green;
      negButton = false;
    } else if (status === 'revoked') {
      negButton = true;
      btnTitle = 'REVOKE';
    } else if (status === 'rejected') {
      negButton = true;
    }
    let initialDate = item.profileField.updatedAt;
    let date = moment(initialDate).format('MMMM, Do');

    return (
      <View key={item.id} style={styles.cardLayout}>
        <View style={styles.cardHeader}>
          <Paragraph styles={styles.messageTitle} text={title} />
          <View style={styles.statusLayout}>
            <Paragraph styles={styles.cardText} text={date} />
          </View>
        </View>
        <View style={styles.messageLayout}>
          <View style={styles.buttonLayout}>
            {!negButton ? (
              <SubmitButton
                title={btnTitle}
                onPress={() => this.submitForm(item.id, action)}
                btnStyle={[styles.button]}
                titleStyle={styles.panelButtonTitle}
                disabled={negButton}
              />
            ) : (
              <SubmitButton
                title={'GRANT'}
                onPress={() => this.submitForm(item.id, 'grant')}
                btnStyle={[styles.button, { borderColor: colors.blue }]}
                titleStyle={[styles.panelButtonTitle, { color: colors.blue }]}
                disabled={posButton}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { data, showLoading, message } = this.state;
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
        <View style={styles.navBar}>
          <Icons
            name={'keyboard-arrow-left'}
            iconStyle={styles.backView}
            iconColor={colors.blue}
            iconSize={20}
            onPress={this.handleBackPress}
          />
        </View>

        <View style={styles.wrapper}>
          <View
            style={{
              height: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paragraph text={message} styles={styles.introMessage} />
          </View>
          <FlatList
            extraData={this.state}
            data={data.requests}
            renderItem={this.renderRow}
            keyExtractor={data => data.id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            showsVerticalScrollIndicator={false}
          />

          <Preloader modalVisible={showLoading} animationType='fade' />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profileFieldNames: state.ProfileReducer.profileFieldNames,
  };
};

export default connect(mapStateToProps)(RequestDetails);
