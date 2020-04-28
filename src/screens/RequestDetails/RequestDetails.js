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
import { Paragraph, SubmitButton, Preloader, Line } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import { Navbar } from 'components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropdownAlert from 'react-native-dropdownalert';
import { ProcessPermissionRequestEndpoint, fetchToken } from 'utils';

class RequestDetails extends Component {
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

  formatProfileKey = key => {
    let nLabel = key.charAt(0).toUpperCase() + key.slice(1);
    return nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  getNavParams = async () => {
    let response = this.props.navigation.getParam('params');
    let res = await fetchToken();
    return this.setState({
      data: response.item,
      token: res.token,
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
    let negButton = false;
    let btnTitle = 'Reject';
    if (status === 'granted') {
      btnTitle = 'Revoke';
      negButton = false;
    } else if (status === 'revoked') {
      negButton = true;
      btnTitle = 'Revoke';
    } else if (status === 'rejected') {
      negButton = true;
    }

    return (
      <View key={item.id} style={styles.bottomSheetRowItem}>
        <View style={styles.bottomSheetListItem}>
          <View style={styles.flatListName}>
            <Paragraph text={title} styles={styles.requestFieldNames} />
          </View>
          <View style={styles.buttonLayout}>
            <SubmitButton
              title={btnTitle}
              onPress={() => this.submitForm(item.id, action)}
              btnStyle={[styles.button, { backgroundColor: colors.errorRed }]}
              titleStyle={styles.panelButtonTitle}
              disabled={negButton}
            />
            <SubmitButton
              title={'Grant'}
              onPress={() => this.submitForm(item.id, 'grant')}
              btnStyle={[styles.button, { backgroundColor: colors.green }]}
              titleStyle={styles.panelButtonTitle}
              disabled={posButton}
            />
          </View>
        </View>
      </View>
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
        <View style={styles.wrapper}>
          <View
            style={{
              height: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paragraph
              text={
                'Select the information you would like \nto share with this connection \nyou can select multiple items.'
              }
              styles={styles.introMessage}
            />
          </View>
          <View>
            <FlatList
              extraData={this.state}
              data={data.requests}
              renderItem={this.renderRow}
              keyExtractor={data => data.id.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              showsVerticalScrollIndicator={false}
            />
            <Line />
          </View>
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
