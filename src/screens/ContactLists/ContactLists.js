'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Paragraph, Line, Verified, Preloader, SubmitButton } from 'components';
import { getProfile, fetchToken } from 'utils';
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
      data: [],
      token: '',
      showLoading: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let payload = await getProfile();
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
    let label = this.formatProfileKey(item.key);
    const { isVerified, value } = item;
    return (
      <View style={styles.profileRowItem}>
        <View style={styles.profileItem}>
          <Paragraph text={label} styles={styles.fieldLabel} />
          <Paragraph text={value} styles={styles.nameText} />
        </View>
        <View style={styles.editIconLayout}>
          {isVerified ? <Verified layoutSize={30} size={20} /> : null}
        </View>
        <Line />
      </View>
    );
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //program: state.ProgramReducer.program,
  };
};

export default connect(mapStateToProps)(ContactLists);
