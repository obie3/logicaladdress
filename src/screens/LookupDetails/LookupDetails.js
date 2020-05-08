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
import { connect } from 'react-redux';

const SCREEN_HEIGHT = Dimensions.get('window').height / 2;

class LookupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempArray: [],
      nameArray: [],
      addressArray: [],
      phoneArray: [],
      emailArray: [],
      filteredProfileNames: [],
      logicalAddress: 'Logical Address',
      isButtonDisabaled: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    let { navigation, profileFieldNames } = this.props;
    let res = navigation.getParam('params'),
      data = res.item || res;

    let profileImage = data.profileFields.find(
      element => element.key === 'profilePhoto',
    );

    let filteredProfileNames = profileFieldNames.filter(
      el => !data.profileFields.find(rm => rm.key === el.id),
    );

    return this.initRenderData(data, profileImage, filteredProfileNames);
  };

  initRenderData = (data, profileImage, filteredProfileNames) => {
    let phoneArray = [],
      nameArray = [],
      addressArray = [],
      emailArray = [];

    data.profileFields.map(profile => {
      let { value, key, id } = profile;
      data[profile.key] = id;
      let label = this.formatProfileKey(key);
      let val = {};

      if (key.includes('Name')) {
        val['id'] = id;
        val['key'] = label;
        val['value'] = value;
        nameArray.push(val);
      } else if (key === 'phone') {
        val['id'] = id;
        val['key'] = label;
        val['value'] = value;
        val['icon'] = 'phone';
        phoneArray.push(val);
      } else if (key === 'email') {
        val['id'] = id;
        val['key'] = label;
        val['value'] = value;
        val['icon'] = 'message';
        emailArray.push(val);
      } else if (key.includes('Address')) {
        val['id'] = id;
        val['key'] = label;
        val['icon'] = 'location-city';
        val['value'] = value;
        addressArray.push(val);
      }

      this.setState({
        nameArray,
        addressArray,
        phoneArray,
        emailArray,
        logicalAddress: data.logicalAddress,
        img: profileImage ? profileImage.value : no_image,
        filteredProfileNames,
        isButtonDisabled: filteredProfileNames.length > 0 ? false : true,
      });
    });
  };

  handleBackPress = () => this.props.navigation.goBack();

  showSelectionPage = () => {
    let { logicalAddress, nameArray, filteredProfileNames } = this.state;
    let firstName = nameArray.length > 0 ? nameArray[0].value : logicalAddress;
    let params = { firstName, logicalAddress, filteredProfileNames };
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
      isButtonDisabled,
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
            disabled={isButtonDisabled}
            onPress={this.showSelectionPage}
            btnStyle={styles.button}
            titleStyle={styles.buttonTxt}
          />
        </ScrollView>
      </ParallaxScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profileFieldNames: state.ProfileReducer.profileFieldNames,
  };
};

export default connect(mapStateToProps)(LookupDetails);
