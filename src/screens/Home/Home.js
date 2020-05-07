'use strict';
import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  ImageBackground,
} from 'react-native';
import { Paragraph, Logo } from 'components';
import styles from './styles';
import { fetchToken, logout } from 'utils';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addProfile } from 'redux/actions/ProfileActions';
import colors from 'assets/colors';

const slides = [
  {
    key: 'somethun',
    title: 'ONE Global Address',
    text:
      'Your address doesn’t have to change \n everytime you move physically',
    image: require('assets/images/icon1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Better Emergency Service!',
    text:
      'Logical Addresses provide accurate location  \ninformation enabling care to find you \n no matter the situation',
    image: require('assets/images/icon2a.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: '\nPrivacy!',
    text:
      'Your personal information is a valuable commodity With LogicalAddress \nnobody has access to this Information \nwithout your permission,',
    image: require('assets/images/icon3.png'),
    backgroundColor: '#22bcb5',
  },
];

class BoardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restoring: true,
    };
  }

  resetNavigationStack = location => {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: location,
        }),
      ],
    });
    this.props.navigation.dispatch(navigateAction);
  };

  componentDidMount() {
    this.initApp();
  }

  _renderItem = item => {
    return (
      <View style={styles.slide}>
        <View>
          <Image source={item.image} />
        </View>

        <Paragraph styles={styles.sliderTitle} text={item.title} />

        <Paragraph styles={styles.sliderText} text={item.text} />
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name='md-arrow-round-forward'
          color='rgba(255, 255, 255, .9)'
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name='md-checkmark'
          color='rgba(255, 255, 255, .9)'
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  initApp = async () => {
    //await logout();
    let { token, status } = await fetchToken();
    if (typeof token === 'undefined') {
      return this.setState({ restoring: false });
    } else {
      if (typeof status === 'undefined') {
        return this.props.navigation.navigate('Verification');
      } else if (status === 'new') {
        return this.props.navigation.navigate('OnBoarding');
      } else {
        return this.props.navigation.navigate('AppInit');
      }
    }
  };

  render() {
    const image = require('assets/images/splash.png');
    const { restoring } = this.state;
    if (restoring) {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={image}
            style={styles.bgImage}
          ></ImageBackground>
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          onDone={this._onDone}
          showSkipButton={true}
          showNextButton={true}
          onSkip={() => this.props.navigation.navigate('Login')}
          onDone={() => this.props.navigation.navigate('Login')}
          dotStyle={styles.sliderDots}
          activeDotStyle={styles.activeDotStyle}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.ProfileReducer.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProfile: data => {
      dispatch(addProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardingScreen);
