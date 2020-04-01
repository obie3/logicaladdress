'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
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
import { fetchProfile } from 'utils';
import colors from 'assets/colors';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      firstName: '',
      lastName: '',
      middleName: '',
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let response = await fetchProfile();
    if (typeof response.name !== 'undefined') {
      let phone = response.phone.substring(4);
      let nPhone = `${'0'}${phone}`;

      let names = response.name;
      let firstName = names.split(' ')[0];
      let lastNames = names.split(' ')[1];

      return this.setState({
        phone: nPhone,
        firstName,
        lastNames,
      });
    }
  };

  gotoMap = () => this.props.navigation.navigate('Map');

  render() {
    const { phone, firstName, lastNames } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />

        <Logo />

        <View style={styles.viewBody}>
          <View style={styles.cardLayout}>
            <View style={styles.cardContents}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignSelf: 'center',
                }}
              >
                <View style={styles.verificationStatusLayout}>
                  <Paragraph text={phone} styles={styles.phoneText} />
                  <View style={styles.verificationIndicators}>
                    <Paragraph
                      text={'Verified'}
                      styles={styles.verificationText}
                    />
                    <Verified layoutSize={25} size={15} />
                  </View>
                </View>
              </View>
              <View style={styles.buttonLayout}>
                <SubmitButton
                  title={'Set Address'}
                  onPress={this.gotoMap}
                  btnStyle={styles.button}
                  titleStyle={styles.buttonTxt}
                  disabled={false}
                />
              </View>
              <Line />
              <Paragraph text={'Personal Details'} styles={styles.nameText} />

              <View style={styles.avatarLayout}>
                <UserAvatar
                  size='80'
                  name={`${firstName}${' '}${lastNames}`}
                  color={colors.buttonBlue}
                />
              </View>
              <View>
                <View style={styles.profileRowItem}>
                  <View style={styles.profileIconLayout}>
                    <Verified layoutSize={30} size={20} />
                  </View>
                  <View style={styles.profileItem}>
                    <Paragraph text={'First Name'} styles={styles.fieldLabel} />
                    <Paragraph text={firstName} styles={styles.nameText} />
                  </View>
                </View>

                <View style={styles.profileRowItem}>
                  <View style={styles.profileIconLayout}>
                    <Verified layoutSize={30} size={20} />
                  </View>
                  <View style={styles.profileItem}>
                    <Paragraph text={'Last Name'} styles={styles.fieldLabel} />
                    <Paragraph text={lastNames} styles={styles.nameText} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
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
