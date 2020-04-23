'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Logo } from 'components';
import styles from './styles';
import {
  fetchToken,
  ProfileEndpoint,
  saveToLocalStorage,
  GetDocumentsEndpoint,
  FetchProfileField,
  ConnectionRequestEndpoint,
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
import { setProfile, setProfileFieldNames } from 'redux/actions/ProfileActions';
import { setDocument } from 'redux/actions/DocumentActions';

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
    let response = await fetchToken();
    if (response.token) this.getRemoteProfileandDocumentsAsync(response.token);
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
    const connectionsRequest = fetch(ConnectionRequestEndpoint, settings);

    Promise.all([
      profileRequest,
      documentRequest,
      profileFieldNameRequest,
      connectionsRequest,
    ])
      .then(value => Promise.all(value.map(value => value.json())))
      .then(serverResponse => {
        let profileResponse = serverResponse[0].data,
          documentsResponse = serverResponse[1],
          profileFieldNameResponse = serverResponse[2].data,
          connectionsRequestResponse = serverResponse[3];
        //console.log(token);

        let data = { params: {} };
        data.params['LogicalAddress'] = profileResponse.logicalAddress;
        data.params['isVerified'] = profileResponse.profileFields[0].isVerified;
        data.params['profileData'] = profileResponse.profileFields;
        data.params['userId'] = profileResponse.id;

        profileResponse.profileFields.map(profile => {
          let value = profile.value;
          if (profile.key === 'phone') {
            let phone = profile.value.substring(4);
            value = `${'0'}${phone}`;
          }
          data.params[profile.key] = value;
        });
        saveToLocalStorage(null, null, null, data);
        this.props.setData(
          profileResponse,
          documentsResponse,
          profileFieldNameResponse,
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
    setData: (profile, documents, profileFieldNames) => {
      dispatch(setProfile(profile));
      dispatch(setDocument(documents));
      dispatch(setProfileFieldNames(profileFieldNames));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
