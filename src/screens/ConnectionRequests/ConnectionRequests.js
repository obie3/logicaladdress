//'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Paragraph, Line, SubmitButton } from 'components';
import { fetchToken, ProcessPermissionRequestEndpoint } from 'utils';
import styles from './styles';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import BottomSheet from 'reanimated-bottom-sheet';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

class ConnectionRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.connectionRequests.data,
      token: '',
      showLoading: false,
      bottomSheetData: [],
    };
    this.bs = React.createRef();
  }

  componentDidMount() {
    this.getProfile();
  }

  formatProfileKey = key => {
    let nLabel = key.charAt(0).toUpperCase() + key.slice(1);
    return nLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  getProfile = async () => {
    let response = await fetchToken();
    return this.setState({
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

  showRequestDetails = item => {
    this.setState({ bottomSheetData: item.requests });
    this.bs.current.snapTo(1);
  };

  renderInner = () => {
    const { bottomSheetData } = this.state;
    return (
      <View style={styles.panel}>
        <FlatList
          extraData={this.state}
          data={bottomSheetData}
          renderItem={this.renderBottomSheetRow}
          keyExtractor={bottomSheetData =>
            bottomSheetData.profileField.id.toString()
          }
          ItemSeparatorComponent={this.renderSeparator}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.panelButton}>
          <SubmitButton
            title={'Confirm'}
            onPress={() => {}}
            btnStyle={styles.button}
            titleStyle={styles.panelButtonTitle}
            disabled={false}
          />
        </View>
      </View>
    );
  };

  onPressHandler = ({ item }) => {
    console.log({ item });
    //this.submitForm(item.id)
  };

  submitForm = async (id, action) => {
    const { token } = this.state;
    let body = JSON.stringify({ action });
    this.showLoadingDialogue();
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body,
    };

    try {
      const response = await fetch(
        `${ProcessPermissionRequestEndpoint}${id}`,
        settings,
      );
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.message);
      }
      return this.showNotification('success', 'Message', 'Success');
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  renderBottomSheetRow = ({ item }) => {
    let title = this.formatProfileKey(item.profileField.key);

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.profileRowItem}
        onPress={() => console.log('hello....')}
      >
        <View style={styles.flatListItem}>
          <View style={styles.flatListName}>
            <Paragraph
              text={title}
              styles={styles.requestFieldNames}
              onPress={() => console.log('hello....')}
            />
          </View>
          <View style={[styles.flatListName, { justifyContent: 'flex-end' }]}>
            <TouchableOpacity style={styles.radioButtonLayout}>
              <TouchableOpacity
                style={
                  item.selected == true
                    ? [styles.radioButton, { backgroundColor: colors.blue }]
                    : styles.radioButton
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hrLine} />
      </TouchableOpacity>
    );
  };

  renderBottomSheetHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
        <Paragraph
          text={
            'Select the information you would like \nto with this connection \nyou can select multiple items.'
          }
          styles={styles.introMessage}
        />
      </View>
    </View>
  );

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
        <BottomSheet
          ref={this.bs}
          snapPoints={[500, 50, 50, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderBottomSheetHeader}
          initialSnap={1}
          enabledGestureInteraction={true}
          enabledInnerScrolling={true}
          enabledContentTapInteraction={true}
          enabledContentGestureInteraction={false}
          springConfig={{
            mass: 0.3,
            damping: 5,
            stiffness: 80,
            overshootClamping: false,
          }}
          overdragResistanceFactor={2}
        />
        <View style={[styles.tabView, styles.scrollViewStyle]}>
          <View>
            {data ? (
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
