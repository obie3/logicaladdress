'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Paragraph, Icons } from 'components';
import { getProfile, fetchToken } from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import colors from 'assets/colors';
import DropdownAlert from 'react-native-dropdownalert';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../CustomTab';
import ContactLists from '../ContactLists';
import Permissions from '../Permissions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: '',
      showLoading: false,
      title: '',
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let payload = await getProfile();
    let response = await fetchToken();
    return this.setState({
      token: response.token,
    });
  };

  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });
  handleProfileLink = () => this.props.navigation.navigate('Profile');
  showSettingspage = () => this.props.navigation.navigate('Settings');

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  showDialer = () => this.props.navigation.navigate('Dialer');

  _updateTitle(obj) {
    const { i } = obj;
    let title = '';
    switch (i) {
      case 0:
        title = 'Contacts';
        break;
      case 1:
        title = 'Permissions';
        break;
    }
    this.setState({
      title,
    });
  }

  render() {
    const { showLoading, data } = this.state;
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
              onPress={this.showSettingspage}
              name={'ios-settings'}
              iconStyle={styles.navIcon}
              iconColor={colors.blue}
              iconSize={hp('3%')}
            />

            <Paragraph styles={styles.title} text={this.state.title} />

            <Icons
              disabled={false}
              onPress={this.showSettingspage}
              name={'ios-notifications'}
              iconStyle={styles.navIcon}
              iconColor={colors.blue}
              iconSize={hp('3%')}
            />
          </View>
        </View>
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />
        <ScrollableTabView
          style={{ flex: 1 }}
          initialPage={0}
          onChangeTab={obj => this._updateTitle(obj)}
          renderTabBar={() => <CustomTabBar {...this.props} />}
        >
          <ContactLists {...this.props} tabLabel={'ios-people'} />
          <Permissions {...this.props} tabLabel={'ios-key'} />
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //program: state.ProgramReducer.program,
  };
};

export default connect(mapStateToProps)(Dashboard);
