'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import colors from 'assets/colors';
import styles from './styles';
import theme from 'assets/theme';
import { connect } from 'react-redux';
import { Paragraph } from 'components';
import UserAvatar from 'react-native-user-avatar';
import { fetchProfile } from 'utils';

const dashboard = require('assets/images/home.png'),
  locationservice = require('assets/images/home.png'),
  logout = require('assets/images/logout.png');

class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
    };
    this.items = [
      {
        navOptionThumb: dashboard,
        navOptionName: 'Dashboard',
        screenToNavigate: 'Dashboard',
      },
      {
        navOptionThumb: locationservice,
        navOptionName: 'LocationService',
        screenToNavigate: 'LocationService',
      },
      {
        navOptionThumb: logout,
        navOptionName: 'Logout',
        screenToNavigate: 'Logout',
      },
    ];
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let response = await fetchProfile();
    if (typeof response.name !== 'undefined') {
      // let phone = response.phone.substring(4);
      // let nPhone = `${'0'}${phone}`;

      let names = response.name;
      let firstName = names.split(' ')[0];
      let lastName = names.split(' ')[1];
      let phone = response.phone;

      let image = response.imageUrl;

      return this.setState({
        phone,
        firstName,
        lastName,
        image,
      });
    }
  };

  render() {
    const { phone, firstName, lastName, image } = this.state;
    return (
      <SafeAreaView style={styles.sideMenuContainer}>
        <View style={styles.drawerImageView}>
          <UserAvatar
            size='80'
            name={`${firstName}${' '}${lastName}`}
            color={colors.buttonBlue}
            src={image}
          />
          <View style={styles.userDetailView}>
            <Paragraph
              text={firstName.toUpperCase()}
              styles={StyleSheet.flatten(styles.txtuser)}
            />
            <Paragraph
              text={phone}
              styles={StyleSheet.flatten(styles.txtuser)}
            />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor:
                  global.currentScreenIndex === key
                    ? colors.field_color
                    : colors.white,
                borderLeftWidth: global.currentScreenIndex === key ? 4 : 0,
                borderColor: colors.green_background,
              }}
            >
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Image source={item.navOptionThumb} style={styles.draweIcon} />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: theme.subHeaderFont,
                  color:
                    global.currentScreenIndex === key
                      ? '#ABABAB'
                      : colors.darkSilver,
                }}
                key={key}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}
              >
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.ProfileReducer.profile,
  };
};

export default connect(mapStateToProps)(CustomSidebarMenu);
