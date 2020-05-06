'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Paragraph, Icons } from 'components';
import styles from './styles';
import { connect } from 'react-redux';
import colors from 'assets/colors';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../CustomTab';
import UserProfile from '../UserProfile';
import DocumentLists from '../DocumentLists';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropdownAlert from 'react-native-dropdownalert';
import { deleteProfileItem } from 'redux/actions/ProfileActions';
import { editProfileItem } from 'redux/actions/ProfileActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isEditable: false,
    };
  }

  showDocumentUploadPage = () =>
    this.props.navigation.navigate('DocumentUpload');
  showNotificationPage = () => this.props.navigation.navigate('Notification');
  showSettingsPage = () => this.props.navigation.navigate('Settings');
  showProfileEditPage = () => this.props.navigation.navigate('');

  showNotification = response => {
    let { handle, title, message } = response;
    return this.dropDownAlertRef.alertWithType(handle, title, message);
  };

  changeEditStatus = () => {
    return this.setState(prevState => ({
      isEditable: !prevState.isEditable,
    }));
  };
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
    let iconName = title === 'Profile' ? 'edit' : 'create-new-folder';
    let link =
      title === 'Profile' ? this.changeEditStatus : this.showDocumentUploadPage;
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
          <DropdownAlert
            duration={5}
            defaultContainer={styles.alert}
            ref={ref => (this.dropDownAlertRef = ref)}
          />
          <View style={styles.iconContainer}>
            <Icons
              disabled={false}
              onPress={this.showSettingsPage}
              name={'settings'}
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
          <UserProfile
            {...this.props}
            parentProps={this.props}
            showResponse={this.showNotification}
            isEditable={this.state.isEditable}
            tabLabel={'ios-person'}
          />
          <DocumentLists parentProps={this.props} tabLabel={'ios-paper'} />
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

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: item => dispatch(deleteProfileItem(item)),
    editProfile: item => dispatch(editProfileItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
