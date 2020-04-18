'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import colors from 'assets/colors';
import styles from './styles';
import { connect } from 'react-redux';
import { Paragraph, Icons } from 'components';
import UserAvatar from 'react-native-user-avatar';
import { fetchProfile } from 'utils';

const dashboard = 'home', //require('assets/images/home.png'),
  documentupload = 'id-card',
  contacttracing = 'location-arrow', //require('assets/images/home.png'),
  logout = 'sign-out'; //require('assets/images/logout.png');
let currentScreenIndex = 0;
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
        navOptionThumb: documentupload,
        navOptionName: 'Verify Me',
        screenToNavigate: 'DocumentUpload',
      },
      {
        navOptionThumb: contacttracing,
        navOptionName: 'Contact Tracing',
        screenToNavigate: 'ContactTracing',
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
    let data = response.data.params;
    if (typeof data.firstName !== 'undefined') {
      let firstName = data.firstName;
      let phone = data.phone;
      let image = data.profilePhoto;

      return this.setState({
        phone,
        firstName,
        image,
      });
    }
  };

  render() {
    const { phone, firstName, image } = this.state;
    return (
      <SafeAreaView style={styles.sideMenuContainer}>
        <View style={styles.drawerImageView}>
          <UserAvatar
            size='80'
            name={`${'LogicalAddress'}`}
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
            <TouchableOpacity
              key={key}
              style={[
                styles.sidebarText,
                { color: currentScreenIndex === key ? '#ABABAB' : colors.blue },
              ]}
              onPress={() => {
                currentScreenIndex = key;
                this.props.navigation.navigate(item.screenToNavigate);
              }}
            >
              <View
                key={key}
                style={[
                  styles.sidebarView,
                  {
                    backgroundColor:
                      currentScreenIndex === key ? colors.blue : colors.white,
                    borderLeftWidth: currentScreenIndex === key ? 4 : 0,
                    borderColor: colors.blue,
                  },
                ]}
              >
                <View style={{ marginRight: 10, marginLeft: 20 }}>
                  <Icons
                    name={item.navOptionThumb}
                    iconSize={20}
                    iconStyle={styles.draweIcon}
                    iconColor={
                      currentScreenIndex === key ? '#ABABAB' : colors.blue
                    }
                  />
                </View>
                <Paragraph
                  key={key}
                  styles={[
                    styles.sidebarText,
                    {
                      color:
                        currentScreenIndex === key ? '#ABABAB' : colors.blue,
                    },
                  ]}
                  text={item.navOptionName}
                  onPress={() => {
                    currentScreenIndex = key;
                    this.props.navigation.navigate(item.screenToNavigate);
                  }}
                />
              </View>
            </TouchableOpacity>
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
