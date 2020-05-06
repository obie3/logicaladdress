'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Paragraph, Line, Icons } from 'components';
import styles from './styles';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import colors from 'assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class Permissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.permissions.data,
    };
  }

  handleBackPress = () => this.props.navigation.goBack();

  showRequestDetails = (item, value) => {
    let message = `${'Revoke or Grant '}${value}${'\n access to your profile details, \nyou can select multiple items.'}`;
    let params = { item, message };
    return this.props.navigation.navigate('RequestDetails', { params });
  };

  renderSeparator = () => {
    return <Line marginLeft={wp('15%')} />;
  };

  renderRow = ({ item }) => {
    let title, value;
    let profile = item.user.profileFields.find(
      element =>
        element.key === 'firstName' ||
        element.key === 'middleName' ||
        element.key === 'lastName',
    );

    if (typeof (profile || {}).value !== 'undefined') {
      title = 'Name';
      value = profile.value;
    } else {
      title = 'Logical Address';
      value = item.user.logicalAddress;
    }

    return (
      <TouchableOpacity
        onPress={() => this.showRequestDetails(item, value)}
        style={styles.profileRowItem}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.avatarIconLayout}>
            <UserAvatar
              size={hp('7%')}
              name={value}
              bgColors={['#ccc', '#fafafa', '#ccaabb']}
            />
          </View>
          <View style={styles.listName}>
            <Paragraph
              text={value}
              styles={styles.nameText}
              onPress={() => this.showRequestDetails(item, value)}
            />

            <Paragraph
              text={title}
              styles={styles.fieldLabel}
              onPress={() => this.showRequestDetails(item, value)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navBg}>
          <View style={styles.iconContainer}>
            <Icons
              disabled={false}
              onPress={this.handleBackPress}
              name={'chevron-left'}
              iconStyle={styles.navIcon}
              iconColor={colors.white}
              iconSize={hp('4%')}
            />
            <Icons
              disabled={false}
              onPress={this.showSettingsPage}
              name={'notifications'}
              iconStyle={styles.navIcon}
              iconColor={colors.white}
              iconSize={hp('4%')}
            />
          </View>

          <Paragraph styles={styles.title} text={'Permissions'} />
        </View>
        <View style={styles.wrapper}>
          {data.length > 0 ? (
            <View>
              <FlatList
                extraData={this.state}
                data={data}
                renderItem={this.renderRow}
                keyExtractor={data => data.user.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                showsVerticalScrollIndicator={false}
              />
              <Line marginLeft={wp('18%')} />
            </View>
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
        </View>
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
