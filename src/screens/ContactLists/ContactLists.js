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
import { Paragraph, Line, SubmitButton, Icons } from 'components';
import { fetchToken } from 'utils';
import UserAvatar from 'react-native-user-avatar';
import styles from './styles';
import colors from 'assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class ContactLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return <Line marginLeft={wp('18%')} />;
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
      title = item.logicalAddress;
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
              size={hp('7%')}
              name={value}
              bgColors={['#ccc', '#fafafa', '#ccaabb']}
            />
          </View>
          <View style={styles.listName}>
            <Paragraph
              text={value}
              styles={styles.nameText}
              onPress={() => this.showRequestDetails(item)}
            />

            <Paragraph
              text={title}
              styles={styles.fieldLabel}
              onPress={() => this.showRequestDetails(item)}
            />
          </View>
        </View>

        {/* <View style={styles.iconLayout}>

        </View> */}
      </TouchableOpacity>
    );
  };

  showRequestDetails = item => {
    let params = { item };
    let { navigation } = this.props.contacts;
    return navigation.navigate('LookupDetails', { params });
  };

  showDialer = () => {
    let { navigation } = this.props.contacts;
    return navigation.navigate('Dialer');
  };

  render() {
    let { connections } = this.props.contacts;
    let { data } = connections;
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
        </View>
      </SafeAreaView>
    );
  }
}

export default ContactLists;
