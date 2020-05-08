'use strict';
import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Paragraph, SubmitButton } from 'components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
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
      emailArray: [],
      logicalAddress: 'Logical Address',
    };
  }

  componentDidMount() {
    let phoneArray = [],
      nameArray = [],
      addressArray = [],
      emailArray = [],
      res = this.props.navigation.getParam('params'),
      data = res.item || res;

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
      } else if (profile.key === 'phone') {
        val['id'] = profile.id;
        val['key'] = label;
        val['value'] = profile.value;
        val['icon'] = 'phone';
        phoneArray.push(val);
      } else if (profile.key === 'email') {
        val['id'] = profile.id;
        val['key'] = label;
        val['value'] = profile.value;
        val['icon'] = 'message';
        emailArray.push(val);
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
        emailArray,
        logicalAddress: data.logicalAddress,
        img: profileImage ? profileImage.value : no_image,
      });
    });
  }

  handleBackPress = () => this.props.navigation.goBack();

  showSelectionPage = () => {
    let { logicalAddress, nameArray } = this.state;
    let firstName = nameArray[0].value;
    let params = { firstName, logicalAddress };
    return this.props.navigation.navigate('SelectFields', { params });
  };

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
    const { id, key, value } = item;
    return (
      <View key={id} style={styles.encrypt}>
        <View style={{ width: '70%' }}>
          <Paragraph text={key} styles={styles.subText} />
          <Paragraph text={value} styles={styles.text} />
        </View>
        <TouchableOpacity onPress={() => this.link(key, value)}>
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
      emailArray,
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
          name: 'keyboard-arrow-left',
          iconStyle: [styles.headerIcons, { backgroundColor: 'white' }],
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
        <ScrollView style={styles.wrapper}>
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
            {phoneArray.length > 0
              ? phoneArray.map(item => this.renderRow(item))
              : this.emptyItem()}
          </View>

          <View style={styles.sectionHeaderView}>
            <Paragraph text={'Emails'} styles={styles.sectionHeader} />
          </View>

          <View style={styles.card}>
            {emailArray.length > 0
              ? emailArray.map(item => this.renderRow(item))
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

          <View style={styles.sectionHeaderView}>
            <Paragraph text={'Logical Address'} styles={styles.sectionHeader} />
          </View>

          <View style={styles.card}>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'Logical Address'} styles={styles.subText} />
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
          <SubmitButton
            title={'Request'}
            disabled={false}
            onPress={this.showSelectionPage}
            btnStyle={styles.button}
            titleStyle={styles.buttonTxt}
          />
        </ScrollView>
      </ParallaxScrollView>
    );
  }
}
