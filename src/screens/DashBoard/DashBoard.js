'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {
  Paragraph,
  Line,
  Verified,
  Preloader,
  SubmitButton,
  Navbar,
} from 'components';
import { getProfile, fetchToken } from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import colors from 'assets/colors';
import DropdownAlert from 'react-native-dropdownalert';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './CustomTabBar';
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
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
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

        <Navbar
          size={hp('3%')}
          layoutSize={3}
          leftIconName={'ios-settings'}
          rightIconName={'ios-notifications-outline'}
          rightIconColor={'#bdc3c7'}
          leftIconColor={'#bdc3c7'}
          headerTitle={'Dashboard'}
          leftIconOnPress={() => {
            console.log('hello...');
          }}
          rightIconOnPress={() => {
            console.log('hello...');
          }}
        />

        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />
        <ScrollableTabView
          style={{ marginTop: hp('2%'), flex: 1 }}
          initialPage={0}
          renderTabBar={() => (
            <CustomTabBar title={['Contacts', 'Permissions']} />
          )}
        >
          <ScrollView tabLabel='ios-contacts' style={styles.tabView}>
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
                <View style={{ flex: 1, alignItems: 'center' }}>
                  {/* <TouchableOpacity onPress={this.showDialer}> */}
                  <Image
                    style={styles.contactsImage}
                    resizeMode={'contain'}
                    source={require('assets/images/addcontact2.png')}
                  />

                  {/* </TouchableOpacity> */}
                  <Paragraph
                    text={
                      'Once you exstablish a connection, \nit will show up here, \ngo ahead and request.'
                    }
                    styles={styles.connectMessage}
                  />
                  <View style={styles.btnView}>
                    <SubmitButton
                      title={'Request'}
                      disabled={false}
                      onPress={this.showDialer}
                      btnStyle={styles.buttonWithImage}
                      titleStyle={styles.buttonTxt}
                    />
                  </View>
                </View>
              )}

              <Preloader modalVisible={showLoading} animationType='fade' />
            </View>
          </ScrollView>
          <ScrollView tabLabel='ios-people' style={styles.tabView}>
            <View style={styles.card}>
              <Paragraph text={'Hello Permissions'} />
            </View>
          </ScrollView>
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    program: state.ProgramReducer.program,
  };
};

export default connect(mapStateToProps)(Dashboard);

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyMzQ3MDM3MzI0MzIzIiwiaWF0IjoxNTg2NjkyODYzLCJleHAiOjE1ODY2OTY0NjN9.UjJN18hRp6wf2MXJPggrNfOq3zLWOxkFBYJqaLPVLS0"
