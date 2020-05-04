'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Paragraph, Line } from 'components';
import styles from './styles';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

class ConnectionRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.connectionRequests.data,
      token: '',
      showLoading: false,
    };
  }

  renderSeparator = () => {
    return <Line marginLeft={wp('15%')} />;
  };

  showRequestDetails = (item, value) => {
    let message = `${'Select the information you would like \nto share with '}${value}${'\nyou can select multiple items.'}`;
    let params = { item, message };
    return this.props.navigation.navigate('RequestDetails', { params });
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
        <View style={styles.iconLayout}>
          <UserAvatar
            size={hp('5%')}
            name={value}
            bgColors={['#ccc', '#fafafa', '#ccaabb']}
          />
        </View>
        <View style={styles.profileItem}>
          <Paragraph
            text={title}
            styles={styles.fieldLabel}
            onPress={() => this.showRequestDetails(item, value)}
          />
          <Paragraph
            text={value}
            styles={styles.nameText}
            onPress={() => this.showRequestDetails(item, value)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
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
              <Line marginLeft={wp('15%')} />
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
    connectionRequests: state.ConnectionRequestReducer.connectionRequests,
  };
};

export default connect(mapStateToProps)(ConnectionRequests);
