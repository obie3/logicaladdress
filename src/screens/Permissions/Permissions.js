'use strict';
import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import { Paragraph, Line, Preloader } from 'components';
import { fetchToken } from 'utils';
import styles from './styles';
import { connect } from 'react-redux';

class Permissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.permissions,
      token: '',
      showLoading: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let response = await fetchToken();
    return this.setState({
      // params: res,
      token: response.token,
    });
  };

  showLoadingDialogue = () => this.setState({ showLoading: true });
  hideLoadingDialogue = () => this.setState({ showLoading: false });
  handleProfileLink = () => this.props.navigation.navigate('Profile');

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  renderSeparator = () => {
    return <Line />;
  };

  renderRow = ({ item }) => {
    const { isVerified, value } = item;
    return (
      <View style={styles.profileRowItem}>
        <View style={styles.profileItem}>
          <Paragraph text={label} styles={styles.fieldLabel} />
          <Paragraph text={value} styles={styles.nameText} />
        </View>
        {/* <View style={styles.editIconLayout}>
          {isVerified ? <Verified layoutSize={30} size={20} /> : null}
        </View> */}
        <Line />
      </View>
    );
  };

  render() {
    const { showLoading, data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          style={styles.tabView}
        >
          <View style={styles.card}>
            {data.length > 0 ? (
              <FlatList
                extraData={this.state}
                data={data}
                renderItem={this.renderRow}
                keyExtractor={profileData => profileData.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyListLayout}>
                <Image
                  style={styles.contactsImage}
                  resizeMode={'contain'}
                  source={require('assets/images/addcontact2.png')}
                />
                <Paragraph
                  text={
                    'No one has requested to connect, \nrequest to access your profile \n will be displayed here'
                  }
                  styles={styles.connectMessage}
                />
              </View>
            )}
            <Preloader modalVisible={showLoading} animationType='fade' />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    permissions: state.PermissionReducer.permissions,
  };
};

export default connect(mapStateToProps)(Permissions);
