'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { Paragraph, Icons } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showContactTracingPage = () =>
    this.props.navigation.navigate('ContactTracing');
  handleBackPress = () => this.props.navigation.goBack();
  handleLogoutPress = async () => {
    await logout();
    return this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <View style={styles.navBg}>
          <View style={styles.iconContainer}>
            <Icons
              disabled={false}
              onPress={this.handleBackPress}
              name={'ios-arrow-back'}
              iconStyle={styles.forwardIcon}
              iconColor={colors.blue}
              iconSize={hp('3%')}
            />

            <Paragraph styles={styles.headerText} text={'Settings'} />

            <Paragraph styles={styles.headerText} text={''} />
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.cardLayout}>
            <View style={styles.cardContent}>
              <Paragraph styles={styles.cardText} text={'Contact Tracing'} />

              <Icons
                disabled={false}
                onPress={this.showContactTracingPage}
                name={'ios-arrow-forward'}
                iconStyle={styles.forwardIcon}
                iconColor={'#95a5a6'}
                iconSize={hp('3%')}
              />
            </View>
          </View>
          <View style={styles.logoutLayout}>
            <Icons
              disabled={false}
              onPress={this.handleLogoutPress}
              name={'ios-log-out'}
              iconStyle={styles.buttonStyle}
              iconColor={'#7f8c8d'}
              iconSize={hp('3%')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
