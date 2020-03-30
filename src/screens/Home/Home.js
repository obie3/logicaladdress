'use strict';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Paragraph } from '../../components';
import styles from './styles';
import { fetchProfile, fetchToken } from '../../utils';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions, StackActions } from 'react-navigation';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import { connect } from 'react-redux';
import { addProfile } from '../../redux/actions/ProfileActions';

const slides = [
  {
    key: 'somethun',
    title: 'Check the Conference \nCalendar',
    text: "Pick out talks You'd love to attend and \nset reminder",
    image: require('../../assets/images/people.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Network!',
    text:
      'Learn more about the organizers, speakers \nand other delegates and connect with \nthem easily via the app',
    image: require('../../assets/images/man.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: '\n\n\n\nQuick Help',
    text:
      'Cant find a meeting room, not sure \nabout the weather? Like we said, \n"Everything in one place"',
    image: require('../../assets/images/woman.png'),
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
    this.getToken();
  }

  _renderItem = item => {
    return (
      <View style={styles.slide}>
        <View style={{}}>
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

  getToken = async () => {
    let profile = await fetchToken();
    if (typeof profile.token == 'undefined') {
      return this.getProfile();
    }
    return this.props.navigation.navigate('App');
  };

  getProfile = async () => {
    let response = await fetchProfile();
    if (typeof response.name !== 'undefined') {
      return this.props.navigation.navigate('Verification');
    }
    return this.setState({ restoring: false });
  };

  handleLogin = () => {
    return this.props.navigation.navigate('Login');
  };

  handleRegistration = () => {
    return this.props.navigation.navigate('Register');
  };

  render() {
    const { restoring } = this.state;
    if (restoring) {
      return <View></View>;
    } else {
      return (
        <View style={styles.container}>
          <AppIntroSlider
            renderItem={this._renderItem}
            slides={slides}
            onDone={this._onDone}
            showSkipButton={true}
            showNextButton={true}
            onSkip={() => this.props.navigation.navigate('Register')}
            onDone={() => this.props.navigation.navigate('Register')}
            dotStyle={styles.sliderDots}
            activeDotStyle={styles.activeDotStyle}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
          />
        </View>
      );
    }
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
