'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Paragraph, Line, Preloader, SubmitButton, Icons } from 'components';
import { fetchToken } from 'utils';
import UserAvatar from 'react-native-user-avatar';
import styles from './styles';
import colors from 'assets/colors';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class ContactLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.connections.data,
      token: '',
      showLoading: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let { token } = await fetchToken();
    return this.setState({
      token,
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
    return <Line marginLeft={wp('15%')} />;
  };

  renderRow = ({ item }) => {
    let title, value;
    let profile = item.profileFields.find(
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
      value = item.logicalAddress;
    }
    return (
      <TouchableOpacity
        onPress={() => this.showRequestDetails(item)}
        style={styles.profileRowItem}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.avatarIconLayout}>
            <UserAvatar
              size={hp('5%')}
              name={value}
              bgColors={['#ccc', '#fafafa', '#ccaabb']}
            />
          </View>
          <View style={styles.listName}>
            <Paragraph
              text={title}
              styles={styles.fieldLabel}
              onPress={() => this.showRequestDetails(item)}
            />
            <Paragraph
              text={value}
              styles={styles.nameText}
              onPress={() => this.showRequestDetails(item)}
            />
          </View>
        </View>

        <View style={styles.iconLayout}>
          <Icons
            disabled={false}
            onPress={() => this.showRequestDetails(item)}
            name={'ios-arrow-forward'}
            iconStyle={[styles.forwardIcon, { paddingLeft: '15%' }]}
            iconColor={'#95a5a6'}
            iconSize={hp('3%')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  showRequestDetails = item => {
    let params = { item };
    return this.props.navigation.navigate('LookupDetails', { params });
  };

  showDialer = () => this.props.navigation.navigate('Dialer');

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
        <View style={styles.wrapper}>
          {data.length > 0 ? (
            <View>
              <FlatList
                extraData={this.state}
                data={data}
                renderItem={this.renderRow}
                keyExtractor={profileData => profileData.id.toString()}
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
                  'Once you establish a connection, \nit will show up here, \ngo ahead and request \n a new connection'
                }
                styles={styles.connectMessage}
              />
              <View style={styles.btnView}>
                <SubmitButton
                  title={'Request'}
                  disabled={false}
                  onPress={this.showDialer}
                  btnStyle={styles.button}
                  titleStyle={styles.buttonTxt}
                />
              </View>
            </View>
          )}

          <Preloader modalVisible={showLoading} animationType='fade' />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    connections: state.ConnectionReducer.connections,
  };
};

export default connect(mapStateToProps)(ContactLists);
