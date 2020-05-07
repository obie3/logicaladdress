'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Logo } from 'components';
import styles from './styles';
import {
  fetchToken,
  ProfileEndpoint,
  saveAppConfig,
  GetDocumentsEndpoint,
  FetchProfileField,
  PermissionsEndpoint,
  FetchConnectionRequestEndpoint,
  FetchConnectionEndpoint,
  AppConfigEndpoint,
} from 'utils';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import DropdownAlert from 'react-native-dropdownalert';
import colors from 'assets/colors';
import { connect } from 'react-redux';
import { setConnectionRequests } from 'redux/actions/ConnectionRequestActions';
import { setProfile, setProfileFieldNames } from 'redux/actions/ProfileActions';
import { setDocument } from 'redux/actions/DocumentActions';
import { setPermissions } from 'redux/actions/PermissionActions';
import { setConnections } from 'redux/actions/ConnectionActions';

class Loader extends Component {
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
    let { token } = await fetchToken();
    if (token) this.getRemoteProfileandDocumentsAsync(token);
  };

  showNotification = (type, title, message) => {
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  getRemoteProfileandDocumentsAsync = token => {
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const profileRequest = fetch(ProfileEndpoint, settings);
    const documentRequest = fetch(GetDocumentsEndpoint, settings);
    const profileFieldNameRequest = fetch(FetchProfileField, settings);
    const permissionsRequests = fetch(PermissionsEndpoint, settings);
    const fetchConnectionRequests = fetch(
      FetchConnectionRequestEndpoint,
      settings,
    );
    const fetchAppConfigRequest = fetch(AppConfigEndpoint, settings);
    const fetchConnections = fetch(FetchConnectionEndpoint, settings);
    Promise.all([
      profileRequest,
      documentRequest,
      profileFieldNameRequest,
      permissionsRequests,
      fetchConnectionRequests,
      fetchConnections,
      fetchAppConfigRequest,
    ])
      .then(value => Promise.all(value.map(value => value.json())))
      .then(serverResponse => {
        let profileResponse = serverResponse[0].data,
          documentsResponse = serverResponse[1],
          profileFieldNameResponse = serverResponse[2].data,
          permissionsResponse = serverResponse[3],
          connectionRequestResponse = serverResponse[4],
          connectionsResponse = serverResponse[5],
          appConfig = serverResponse[6];

        saveAppConfig(appConfig);
        this.props.setData(
          profileResponse,
          documentsResponse,
          profileFieldNameResponse,
          permissionsResponse,
          connectionRequestResponse,
          connectionsResponse,
        );
        return this.props.navigation.navigate('App');
      })
      .catch(error =>
        this.showNotification('error', 'Hello', error.toString()),
      );
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setData: (
      profile,
      documents,
      profileFieldNames,
      permissionsResponse,
      connectionRequestResponse,
      connectionsResponse,
    ) => {
      dispatch(setProfile(profile));
      dispatch(setDocument(documents));
      dispatch(setProfileFieldNames(profileFieldNames));
      dispatch(setPermissions(permissionsResponse));
      dispatch(setConnectionRequests(connectionRequestResponse));
      dispatch(setConnections(connectionsResponse));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
