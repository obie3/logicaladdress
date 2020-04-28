'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Paragraph, Icons } from 'components';
import { connect } from 'react-redux';
import styles from './styles';
import colors from 'assets/colors';
import { logout } from 'utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.profileFieldNames,
    };
  }

  showContactTracingPage = () =>
    this.props.navigation.navigate('ContactTracing');
  handleBackPress = () => this.props.navigation.goBack();
  handleLogoutPress = async () => {
    await logout();
    return this.props.navigation.navigate('Home');
  };

  renderRow = ({ item }) => {
    if (item.id !== 'profilePhoto') {
      return (
        <View style={styles.cardLayout}>
          <View style={styles.cardContent}>
            <Paragraph styles={styles.cardText} text={item.title} />

            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'flex-end',
              }}
            >
              <Icons
                disabled={false}
                onPress={this.showContactTracingPage}
                name={'ios-add-circle-outline'}
                iconStyle={[styles.forwardIcon]}
                iconColor={'#95a5a6'}
                iconSize={hp('3%')}
              />

              <Icons
                disabled={false}
                onPress={this.showContactTracingPage}
                name={'ios-create'}
                iconStyle={[styles.forwardIcon, { paddingLeft: '15%' }]}
                iconColor={'#95a5a6'}
                iconSize={hp('3%')}
              />
            </View>

            {/* <Icons
              disabled={false}
              onPress={this.showContactTracingPage}
              name={'ios-arrow-forward'}
              iconStyle={styles.forwardIcon}
              iconColor={'#95a5a6'}
              iconSize={hp('3%')}
            /> */}
          </View>
        </View>
      );
    }
  };

  render() {
    const { data } = this.state;
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

          <FlatList
            extraData={this.state}
            data={data}
            renderItem={this.renderRow}
            keyExtractor={data => data.id}
            showsVerticalScrollIndicator={false}
          />

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

const mapStateToProps = (state, ownProps) => {
  return {
    profileFieldNames: state.ProfileReducer.profileFieldNames,
  };
};

export default connect(mapStateToProps)(Settings);
