'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, ScrollView, Modal } from 'react-native';
import {
  Paragraph,
  SubmitButton,
  Line,
  Verified,
  Pending,
  Logo,
} from 'components';
import styles from './styles';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import { fetchToken, ProfileEndpoint, saveToLocalStorage } from 'utils';
import colors from 'assets/colors';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import DropdownAlert from 'react-native-dropdownalert';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: {},
      firstName: '',
      lastName: '',
      middleName: '',
      params: [],
      token: '',
      showLoading: true,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  renderProfileLayout() {
    const { params, showLoading } = this.state;
    if (!showLoading) {
      params.map(profile => (
        <View key={profile.id} style={styles.profileRowItem}>
          <View style={styles.profileIconLayout}>
            <Verified layoutSize={30} size={20} />
          </View>
          <View style={styles.profileItem}>
            <Paragraph text={'firstName'} styles={styles.fieldLabel} />
            <Paragraph text={'eddie'} styles={styles.nameText} />
          </View>
        </View>
      ));
    }
  }

  getProfile = async () => {
    let response = await fetchToken();
    if (response.token) this.getRemoteProfile(response.token);
  };

  showLoadingDialogue = () => {
    return this.setState({ showLoading: true });
  };

  hideLoadingDialogue = () => {
    return this.setState({ showLoading: false });
  };

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
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
      let data = res.data.profile;
      let name = `${data.firstName}${' '}${data.lastName}`;
      let phone = data.phone[0];
      await saveToLocalStorage(name, null, phone, data.profilePhoto);
      return this.setState({
        showLoading: false,
        params: res.data.profileFields,
        initial: res.data,
      });
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  gotoMap = () => this.props.navigation.navigate('Map');

  render() {
    const { firstName, lastNames, showLoading, params, initial } = this.state;
    if (showLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle='default' />
          <Logo />
          <View style={styles.viewBody}>
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
          <Modal
            animationType={'fase'}
            transparent={true}
            onRequestClose={() => {}}
            visible={showLoading}
          >
            <View style={styles.overlay}></View>
          </Modal>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />
        <ScrollView>
          <Logo />
          <View style={styles.viewBody}>
            <View style={styles.cardLayout}>
              <View style={styles.cardContents}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginTop: '15%',
                    //backgroundColor: 'green'
                  }}
                >
                  <View style={styles.verificationStatusLayout}>
                    <Paragraph
                      text={initial.logicalAddress}
                      styles={styles.addressText}
                    />
                    <View style={styles.verificationIndicators}>
                      <Paragraph
                        text={'Verified'}
                        styles={styles.verificationText}
                      />
                      {params[0].isVerfied ? (
                        <Verified layoutSize={25} size={15} />
                      ) : (
                        <Pending layoutSize={25} size={15} />
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.buttonLayout}>
                  {!params[0].isVerfied ? (
                    <SubmitButton
                      title={'Set Address'}
                      onPress={this.gotoMap}
                      btnStyle={styles.button}
                      titleStyle={styles.buttonTxt}
                      disabled={false}
                    />
                  ) : null}
                </View>
                <Line />
                <Paragraph
                  text={'Personal Details'}
                  styles={[styles.nameText, { fontWeight: 'bold' }]}
                />

                <View style={styles.avatarLayout}>
                  <UserAvatar
                    size='80'
                    name={`${firstName}${' '}${lastNames}`}
                    color={colors.buttonBlue}
                    src={initial.profile.profilePhoto}
                  />
                </View>
                {params.map(profile => {
                  if (profile.key !== 'profilePhoto')
                    return (
                      <View key={profile.id} style={styles.profileRowItem}>
                        <View style={styles.profileIconLayout}>
                          {profile.isVerfied ? (
                            <Verified layoutSize={30} size={20} />
                          ) : (
                            <Pending layoutSize={30} size={20} />
                          )}
                        </View>
                        <View style={styles.profileItem}>
                          <Paragraph
                            text={profile.key}
                            styles={styles.fieldLabel}
                          />
                          <Paragraph
                            text={profile.value.replace(/"/g, '')}
                            styles={styles.nameText}
                          />
                        </View>
                      </View>
                    );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    program: state.ProgramReducer.program,
  };
};

export default connect(mapStateToProps)(Dashboard);
