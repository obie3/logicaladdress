'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Paragraph, Icons } from 'components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
let no_image =
  'https://gravatar.com/avatar/02bf38fddbfe9f82b94203336f9ebc41?s=200&d=retro';
import ParallaxScrollView from '../beta-src/ParallaxScrollView';
export const SCREEN_HEIGHT = Dimensions.get('window').height / 2;

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRow = item => {};

  render() {
    let res = this.props.navigation.getParam('params');
    let data = res.item;
    let profileImage = data.profileFields.find(
      element => element.key === 'profilePhoto',
    );
    let img = profileImage ? profileImage.value : no_image;

    return (
      <ParallaxScrollView
        windowHeight={SCREEN_HEIGHT}
        backgroundSource={{ uri: img }}
        navBarTitle={data.logicalAddress}
        navBarTitleColor='black'
        navBarColor='white'
        headerView={
          <View style={styles.headerView}>
            <View style={styles.headerTextView}>
              {/* <Paragraph text={'My APp'} styles={styles.headerTextViewTitle} />
              <Paragraph
                text={'Subtitle Custom Header View'}
                styles={styles.headerTextViewSubtitle}
              /> */}
            </View>
          </View>
        }
        leftIcon={{
          name: 'rocket',
          color: 'rgba(228, 117, 125, 1)',
          size: 30,
          type: 'font-awesome',
        }}
        leftIconOnPress={() =>
          this.setState({ index: (this.state.index + 1) % 3 })
        }
        rightIcon={{
          name: 'present',
          color: 'rgba(228, 117, 125, 1)',
          size: 30,
          type: 'font-awesome',
        }}
        rightIconOnPress={() =>
          this.setState({ index: (this.state.index + 1) % 3 })
        }
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
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'Last Name'} styles={styles.subText} />
                <Paragraph text={'Obeya'} styles={styles.text} />
              </View>
              <Icon
                name='lock'
                color='#075e54'
                size={23}
                style={{ padding: 5 }}
              />
            </View>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'Middle Name'} styles={styles.subText} />
                <Paragraph text={'Obeya'} styles={styles.text} />
              </View>
              <Icon
                name='lock'
                color='#075e54'
                size={23}
                style={{ padding: 5 }}
              />
            </View>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'First Name'} styles={styles.subText} />
                <Paragraph text={'Obeya'} styles={styles.text} />
              </View>
              <Icon
                name='lock'
                color='#075e54'
                size={23}
                style={{ padding: 5 }}
              />
            </View>
          </View>

          <View style={styles.sectionHeaderView}>
            <Paragraph text={'Contacts'} styles={styles.sectionHeader} />
          </View>

          <View style={styles.card}>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'Phone'} styles={styles.subText} />
                <Paragraph text={'07038602624'} styles={styles.text} />
              </View>
              <Icon
                name='call'
                color='#075e54'
                size={23}
                style={{ padding: 5 }}
              />
            </View>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'Phone 2'} styles={styles.subText} />
                <Paragraph text={'07038602624'} styles={styles.text} />
              </View>
              <Icon
                name='call'
                color='#075e54'
                size={23}
                style={{ padding: 5 }}
              />
            </View>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'Email'} styles={styles.subText} />
                <Paragraph text={'dretnan@gmail.com'} styles={styles.text} />
              </View>
              <Icon
                name='chat'
                color='#075e54'
                size={23}
                style={{ padding: 5 }}
              />
            </View>

            <View style={styles.sectionHeaderView}>
              <Paragraph
                text={'Physical Address'}
                styles={styles.sectionHeader}
              />
            </View>

            <View style={styles.card}>
              <View style={styles.encrypt}>
                <View>
                  <Paragraph text={'Home Address'} styles={styles.subText} />
                  <Paragraph text={'Goverment House'} styles={styles.text} />
                </View>
                <Icon
                  name='call'
                  color='#075e54'
                  size={23}
                  style={{ padding: 5 }}
                />
              </View>
              <View style={styles.encrypt}>
                <View>
                  <Paragraph text={'Work Address'} styles={styles.subText} />
                  <Paragraph text={'Home'} styles={styles.text} />
                </View>
                <Icon
                  name='call'
                  color='#075e54'
                  size={23}
                  style={{ padding: 5 }}
                />
              </View>
              <View style={styles.encrypt}>
                <View>
                  <Paragraph text={'Club Address'} styles={styles.subText} />
                  <Paragraph text={'dretnan@gmail.com'} styles={styles.text} />
                </View>
                <Icon
                  name='chat'
                  color='#075e54'
                  size={23}
                  style={{ padding: 5 }}
                />
              </View>
            </View>
          </View>

          <View style={styles.sectionHeaderView}>
            <Paragraph text={'Logical Address'} styles={styles.sectionHeader} />
          </View>

          <View style={styles.card}>
            <View style={styles.encrypt}>
              <View>
                <Paragraph text={'LogicalAddress'} styles={styles.subText} />
                <Paragraph text={'0136702323'} styles={styles.text} />
              </View>
              <Icon
                name='call'
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
