'use strict';
import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Paragraph } from 'components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
let no_image =
  'https://gravatar.com/avatar/02bf38fddbfe9f82b94203336f9ebc41?s=200&d=retro';
import ParallaxScrollView from '../beta-src/ParallaxScrollView';
import Communications from 'react-native-communications';

const SCREEN_HEIGHT = Dimensions.get('window').height / 2;

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempArray: [],
      nameArray: [],
      addressArray: [],
      phoneArray: [],
      logicalAddress: 'Logical Address',
    };
  }

  componentDidMount() {
    let phoneArray = [],
      nameArray = [],
      addressArray = [],
      res = this.props.navigation.getParam('params'),
      data = res.item;

    let profileImage = data.profileFields.find(
      element => element.key === 'profilePhoto',
    );

    data.profileFields.map(profile => {
      data[profile.key] = profile.id;
      let label = this.formatProfileKey(profile.key);
      let val = {};

      if (profile.key.includes('Name')) {
        val['id'] = profile.id;
        val['key'] = label;
        val['value'] = profile.value;
        nameArray.push(val);
      } else if (profile.key === 'phone' || profile.key === 'email') {
        let icon = profile.key === 'phone' ? 'phone' : 'message';
        val['id'] = profile.id;
        val['key'] = label;
        val['value'] = profile.value;
        val['icon'] = icon;

        phoneArray.push(val);
      } else if (profile.key.includes('Address')) {
        val['id'] = profile.id;
        val['key'] = label;
        val['icon'] = 'location-city';
        val['value'] = profile.value;
        addressArray.push(val);
      }

      this.setState({
        nameArray,
        addressArray,
        phoneArray,
        logicalAddress: data.logicalAddress,
        img: profileImage ? profileImage.value : no_image,
      });
    });
  }

  handleBackPress = () => this.props.navigation.goBack();

  formatProfileKey = key => {
    let nLabel = key.charAt(0).toUpperCase() + key.slice(1);
    return nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  link = (key, value) => {
    return key === 'Phone'
      ? Communications.phonecall(value, true)
      : key === 'Email'
      ? Communications.email([value], null, null, 'My Subject', 'My body text')
      : null;
  };

  renderRow = item => {
    return (
      <View key={item.id} style={styles.encrypt}>
        <View>
          <Paragraph text={item.key} styles={styles.subText} />
          <Paragraph text={item.value} styles={styles.text} />
        </View>
        <TouchableOpacity onPress={() => this.link(item.key, item.value)}>
          <Icon
            name={item.icon}
            color='#075e54'
            size={23}
            style={{ padding: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  emptyItem = () => {
    return (
      <View style={styles.encrypt}>
        <View>
          <Paragraph text={'Not Available'} styles={styles.text} />
        </View>
        <Icon name='lock' color='#075e54' size={23} style={{ padding: 5 }} />
      </View>
    );
  };

  render() {
    const {
      nameArray,
      phoneArray,
      addressArray,
      logicalAddress,
      img,
    } = this.state;
    return (
      <ParallaxScrollView
        windowHeight={SCREEN_HEIGHT}
        backgroundSource={{ uri: img }}
        navBarTitle={logicalAddress}
        navBarColor='white'
        headerView={
          <View style={styles.headerView}>
            <View style={styles.headerTextView}></View>
          </View>
        }
        leftIcon={{
          disabled: false,
          name: 'ios-arrow-back',
          iconStyle: [styles.headerIcons, { backgroundColor: 'white' }],
          iconSize: hp('3%'),
          onPress: () => this.handleBackPress(),
        }}
        rightIcon={{
          disabled: true,
          name: null,
          iconStyle: styles.headerIcons,
          iconSize: 24,
        }}
        leftIconOnPress={() => {}}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#ecf0f1',
            paddingLeft: wp('3%'),
            paddingRight: wp('3%'),
            paddingBottom: hp('4%'),
          }}
        >
          <View style={styles.sectionHeaderView}>
            <Paragraph text={'Initials'} styles={styles.sectionHeader} />
          </View>

          <View style={styles.card}>
            {nameArray.length > 0
              ? nameArray.map(item => this.renderRow(item))
              : this.emptyItem()}
          </View>

          <View style={styles.sectionHeaderView}>
            <Paragraph text={'Contacts'} styles={styles.sectionHeader} />
          </View>

          <View style={styles.card}>
            <View style={styles.card}>
              {phoneArray.length > 0
                ? phoneArray.map(item => this.renderRow(item))
                : this.emptyItem()}
            </View>
            <View style={styles.sectionHeaderView}>
              <Paragraph
                text={'Physical Address'}
                styles={styles.sectionHeader}
              />
            </View>

            <View style={styles.card}>
              {addressArray.length > 0
                ? addressArray.map(item => this.renderRow(item))
                : this.emptyItem()}
            </View>
          </View>

          <View style={styles.sectionHeaderView}>
            <Paragraph text={'Logical Address'} styles={styles.sectionHeader} />
          </View>

          <View style={styles.card}>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'LogicalAddress'} styles={styles.subText} />
                <Paragraph text={logicalAddress} styles={styles.text} />
              </View>
              <Icon
                name='place'
                color='#075e54'
                size={23}
                style={{ padding: 5 }}
              />
            </View>
          </View>
        </ScrollView>
      </ParallaxScrollView>
    );
  }
}
