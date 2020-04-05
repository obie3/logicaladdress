'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
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
      initial: {},
      firstName: 'LogicalAddress',
      params: [],
      token: '',
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let payload = await getProfile();
    let res = payload.email;
    return this.setState({
      params: res.params,
      initial: res.initial,
    });
  };

  gotoMap = () => this.props.navigation.navigate('Map');

  render() {
    const { firstName, params, initial } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />

        <ScrollView>
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
                  <Paragraph
                    text={initial.logicalAddress}
                    styles={styles.addressText}
                  />
                  <View style={styles.verificationIndicators}>
                    <Paragraph
                      text={'Verified'}
                      styles={styles.verificationText}
                    />
                    {params.length && params[0].isVerfied ? (
                      <Verified layoutSize={25} size={15} />
                    ) : (
                      <Pending layoutSize={25} size={15} />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.buttonLayout}>
                {params.length && !params[0].isVerfied ? (
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
              {typeof initial.profile !== 'undefined' ? (
                <View style={styles.avatarLayout}>
                  <UserAvatar
                    size='80'
                    name={`${firstName}`}
                    color={colors.buttonBlue}
                    src={initial.profile.profilePhoto}
                  />
                </View>
              ) : null}
              {params.map(profile => {
                let nLabel =
                  profile.key.charAt(0).toUpperCase() + profile.key.slice(1);
                let label = nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');

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
                        <Paragraph text={label} styles={styles.fieldLabel} />
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
