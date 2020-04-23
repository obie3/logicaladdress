'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Paragraph, Icons } from 'components';
import styles from './styles';
import { connect } from 'react-redux';
import colors from 'assets/colors';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../CustomTab';
import ProfileDetails from '../ProfileDetails';
import DocumentLists from '../DocumentLists';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  showProfileEditPage = () => this.props.navigation.navigate('DocumentUpload');
  showNotificationPage = () => this.props.navigation.navigate('');
  showSettingspage = () => this.props.navigation.navigate('Settings');

  _updateTitle(obj) {
    const { i } = obj;
    let title = '';
    switch (i) {
      case 0:
        title = 'Profile';
        break;
      case 1:
        title = 'Documents';
        break;
    }
    this.setState({
      title,
    });
  }

  render() {
    const { title } = this.state;
    let iconName =
      title === 'Profile'
        ? 'ios-create'
        : title == 'Documents'
        ? 'ios-add-circle'
        : 'ios-notifications';
    let link =
      title === 'Profile'
        ? this.showProfileEditPage
        : this.showNotificationPage;
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
              onPress={link}
              name={iconName}
              iconStyle={styles.navIcon}
              iconColor={colors.blue}
              iconSize={hp('3%')}
            />
          </View>
        </View>
        <ScrollableTabView
          style={{ flex: 1 }}
          initialPage={0}
          onChangeTab={obj => this._updateTitle(obj)}
          renderTabBar={() => <CustomTabBar {...this.props} />}
        >
          <ProfileDetails {...this.props} tabLabel={'ios-person'} />
          <DocumentLists {...this.props} tabLabel={'ios-paper'} />
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.DocumentReducer.documents,
    profile: state.ProfileReducer.profile,
  };
};

export default connect(mapStateToProps)(Profile);
