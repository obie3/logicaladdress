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
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    return <Line />;
  };

  showRequestDetails = item => {
    let params = { item };
    return this.props.navigation.navigate('RequestDetails', { params });
  };

  renderRow = ({ item }) => {
    let title = item.user.profileFields.length > 0 ? 'Name' : 'Logical Address';
    let name =
      item.user.profileFields.length > 0
        ? item.user.profileFields[0].firstName
        : item.user.logicalAddress;
    return (
      <TouchableOpacity
        onPress={() => this.showRequestDetails(item)}
        style={styles.profileRowItem}
      >
        <View style={styles.iconLayout}>
          <UserAvatar
            size={hp('5%')}
            name={name}
            bgColors={['#ccc', '#fafafa', '#ccaabb']}
          />
        </View>
        <View style={styles.profileItem}>
          <Paragraph
            text={title}
            styles={styles.fieldLabel}
            onPress={() => this.showRequestDetails(item)}
          />
          <Paragraph
            text={name}
            styles={styles.nameText}
            onPress={() => this.showRequestDetails(item)}
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
              <Line />
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
