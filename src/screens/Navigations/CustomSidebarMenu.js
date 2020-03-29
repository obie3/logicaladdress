'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import colors from '../../assets/colors';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';
import {DisplayText } from '../../components';

const dashboard = require('../../assets/images/home.png'),
  profile = require('../../assets/images/profile.png'),
//  notification = require('../../assets/images/notification.png'),
//  settings = require('../../assets/images/setting.png'),
 logout = require('../../assets/images/logout.png');

 class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.items = [
      {
        navOptionThumb: dashboard,
        navOptionName: 'DashBoard',
        screenToNavigate: 'DashBoard',
      },

      // {
      //   navOptionThumb: profile,
      //   navOptionName: 'Survey/FeedBack',
      //   screenToNavigate: 'Profile',
      // },
      
      { 
        navOptionThumb: logout,
        navOptionName: 'Logout',
        screenToNavigate: 'Logout',
      },
      
    ];
  }

  displayProfileImage = () =>{
    if(typeof this.props.profile.photo !==  'undefined') {
      return (<Image
        source = {{uri: this.props.profile.photo}}
        style={styles.sideMenuProfileIcon}
      />);
      }
    else if(typeof this.props.profile.photo !==  'undefined')  {
      return (<Image
        source = {{uri: this.props.profile.photo}}
        style={styles.sideMenuProfileIcon}
      />);
    }
    else {
      return (<Image
        source = {require('../../assets/images/male.png')}
        style={styles.ProfileIcon}
      />);
    } 
  }
  render() {
    return (
      <SafeAreaView style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style = {styles.drawerImageView}>
            {this.displayProfileImage()}
          <View style = {styles.userDetailView}>
            <DisplayText
              text={`${this.props.profile.title} ${this.props.profile.name}`}
              styles = {StyleSheet.flatten(styles.txtuser)}
            />
            {/* <Text style = {styles.txtuser}>
              Speaker
            </Text> */}
          </View>
        </View>
        {/*Divider between Top Image and Sidebar Option*/}
        <View style={styles.divider}/>
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View key = {key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? colors.field_color : colors.white,
                borderLeftWidth: global.currentScreenIndex === key ? 4 : 0,
                borderColor : colors.green_background,
              }}>
                
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                
                {/* <Icon name={item.navOptionThumb} size={25} color="#0F959A" /> */}

              <Image
                source = {item.navOptionThumb}
                style={styles.draweIcon}/>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily : theme.subHeaderFont,
                  color: global.currentScreenIndex === key ? '#ABABAB' : colors.darkSilver,
                }}
                key = {key}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) =>{
  return { 
    profile: state.ProfileReducer.profile,
  }
}

export default connect(mapStateToProps)(CustomSidebarMenu)