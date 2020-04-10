'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Paragraph,
  SubmitButton,
  Line,
  Verified,
  Pending,
  Logo,
} from 'components';
import { getProfile } from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import colors from 'assets/colors';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'LogicalAddress',
      params: {},
      profileData: [],
      token: '',
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let payload = await getProfile();
    let res = payload.data;
    return this.setState({
      params: res.params,
      profileData: res.params.profileData,
    });
  };

  gotoMap = () => this.props.navigation.navigate('Map');
  showEdit = () => this.props.navigation.navigate('Profile');

  render() {
    const { params, firstName, profileData } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Logo />

          <View style={styles.cardLayout}>
            <View style={styles.cardContents}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: '15%',
                }}
              >
                <View style={styles.verificationStatusLayout}>
                  <View style={styles.verificationIndicators}>
                    <Paragraph
                      text={params.LogicalAddress}
                      styles={styles.addressText}
                    />
                    {params.isVerfied ? (
                      <Verified layoutSize={25} size={15} />
                    ) : (
                      <Pending layoutSize={25} size={15} />
                    )}
                  </View>
                  <Paragraph
                    text={'LogicalAddress'}
                    styles={styles.verificationText}
                  />
                </View>
                {/* <View style={styles.verificationStatusLayout}>
                  <Paragraph
                    text={params.LogicalAddress}
                    styles={styles.addressText}
                  /> 
                  <View style={styles.verificationIndicators}>
                    <Paragraph
                      text={'LogicalAddress'}
                      styles={styles.verificationText}
                    />
                    {params.isVerfied ? (
                      <Verified layoutSize={25} size={15} />
                    ) : (
                      <Pending layoutSize={25} size={15} />
                    )}
                  </View>
                </View> */}
              </View>
              <View style={styles.buttonLayout}>
                {!params.isVerfied ? (
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
              <View style={styles.profileHeader}>
                {/* <Paragraph
                text={'Personal Details'}
                styles={[styles.nameText, { fontWeight: 'bold' }]}
              /> */}
                <Paragraph
                  text={'Edit'}
                  styles={[
                    styles.nameText,
                    {
                      justifyContent: 'flex-end',
                      width: '100%',
                      color: colors.blue,
                    },
                  ]}
                  onPress={this.showEdit}
                />
              </View>

              <View style={styles.avatarLayout}>
                <UserAvatar
                  size='80'
                  name={firstName}
                  color={colors.buttonBlue}
                  src={params.profilePhoto}
                />
              </View>
              {profileData.map(profile => {
                let nLabel =
                  profile.key.charAt(0).toUpperCase() + profile.key.slice(1);
                let label = nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
                if (
                  profile.key !== 'profilePhoto' &&
                  profile.key !== 'homeLocation'
                ) {
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
                        <Paragraph text={label} styles={styles.fieldLabel} />
                        <Paragraph
                          text={profile.value}
                          styles={styles.nameText}
                        />
                      </View>
                    </View>
                  );
                }
              })}
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
