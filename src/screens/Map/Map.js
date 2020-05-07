import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  BackHandler,
} from 'react-native';
import MapView, {
  Marker,
  ProviderPropType,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles';
import { Paragraph, SubmitButton, Preloader, Icons } from 'components';
const { width, height } = Dimensions.get('window');
import DropdownAlert from 'react-native-dropdownalert';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import colors from 'assets/colors';
import { UpdateProfileEndpoint, fetchToken } from 'utils';
import { connect } from 'react-redux';
import { addProfile } from 'redux/actions/ProfileActions';

/**
 * @typedef {Object} Position
 * @property {number} latitude
 * @property {number} longitude
 */

const ASPECT_RATIO = width / height;
const LATITUDE = 9.061965;
const LONGITUDE = 7.489856;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      coordinates: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      token: '',
      fieldId: undefined,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  map = null;

  componentDidMount() {
    this.initToken();
    this.getLocationAsync();
    BackHandler.addEventListener('hardwareBackPress', this.disableBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.disableBackPress);
  }

  disableBackPress = () => true;

  handleBackPress = () => this.props.navigation.goBack();

  showLoadingDialogue = () => this.setState({ showLoading: true });

  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  handleSetHomeAddress = response => {
    return this.setState(
      {
        coordinates: response.nativeEvent.coordinate,
      },
      () => this.bs.current.snapTo(1),
    );
  };

  updateLogicalAddress = async () => {
    this.showLoadingDialogue();
    const { token, coordinates, fieldId } = this.state;
    let data = fieldId
      ? { fieldId, value: coordinates, action: 'update' }
      : { fieldName: 'homeLocation', value: coordinates, action: 'create' };

    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ fields: [data] }),
    };

    try {
      const response = await fetch(UpdateProfileEndpoint, settings);
      const res = await response.json();
      if (typeof res.data === 'undefined') {
        return this.showNotification('error', 'Message', res.error);
      }

      let result = res.data[0];
      let tempData = res.data[0].value;
      result.value = JSON.parse(tempData);
      this.props.addProfile(result);
      this.hideLoadingDialogue();
      return this.showNotification(
        'success',
        'Message',
        'Location update successful, verification pending ',
      );
    } catch (error) {
      return this.showNotification('error', 'Hello', error.toString());
    }
  };

  renderInner = () => {
    const { coordinates } = this.state;
    if (typeof coordinates.latitude == 'undefined') {
      return (
        <View style={styles.panel}>
          <Paragraph
            styles={styles.panelTitle}
            text={'Drag Marker to Set Address'}
          />
          <View style={styles.panelButton}>
            <SubmitButton
              title={'Confirm'}
              onPress={() => this.updateLogicalAddress()}
              btnStyle={styles.buttonWithImage}
              titleStyle={styles.panelButtonTitle}
              disabled={false}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.panel}>
        <Paragraph
          styles={styles.panelBody}
          text={'Use current Location as house address'}
        />
        <View style={styles.panelButton}>
          <SubmitButton
            title={'Confirm'}
            onPress={() => this.updateLogicalAddress()}
            btnStyle={styles.buttonWithImage}
            titleStyle={styles.panelButtonTitle}
            disabled={false}
          />
        </View>
      </View>
    );
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
        <Paragraph
          styles={styles.panelTitle}
          text={'Click and drag Marker to Set Address'}
        />
      </View>
    </View>
  );

  initToken = async () => {
    let { token } = await fetchToken();
    let { profileFields } = this.props.profile;
    let filteredArray = profileFields.filter(record => {
      return record.key == 'homeLocation';
    });
    const fieldId = (filteredArray[0] || {}).id;
    this.setState({
      token,
      fieldId,
    });
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { coords } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      this.setMapRegion(coords);
    } else {
      return this.showNotification(
        'info',
        'Message',
        'Location permission denied',
      );
    }
  };

  /**
   * @param {Position} position
   * @param {boolean} animate
   */
  setMapRegion = (position, animate = true) => {
    const region = {
      latitude: position.latitude,
      longitude: position.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    this.setState({
      coordinates: {
        latitude: position.latitude,
        longitude: region.longitude,
      },
      region,
    });
    if (animate) {
      this.map.animateToRegion(region, 4000);
    }
  };

  bs = React.createRef();

  render() {
    const { showLoading, coordinates, region } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <MapView
          ref={map => {
            this.map = map;
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsPointsOfInterest
          loadingEnabled={true}
          showsUserLocation={true}
          followUserLocation={true}
          zoomControlEnabled={true}
          initialRegion={region}
        >
          <Marker
            coordinate={coordinates}
            onDragEnd={e => this.handleSetHomeAddress(e)}
            draggable
          />
        </MapView>
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />
        <View style={styles.navBar}>
          <Icons
            name={'keyboard-arrow-left'}
            iconStyle={styles.backView}
            iconColor={colors.blue}
            iconSize={20}
            onPress={this.handleBackPress}
          />
          <Icons
            name={'location-searching'}
            iconColor={colors.blue}
            iconSize={20}
            iconStyle={styles.locationButton}
            style={styles.shadow}
            onPress={() => this.getLocationAsync()}
          />
        </View>
        <Preloader modalVisible={showLoading} animationType='fade' />

        <BottomSheet
          ref={this.bs}
          snapPoints={[300, 200, 100]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={2}
          enabledBottomClamp={true}
          enabledContentGestureInteraction={false}
          springConfig={{
            mass: 0.3,
            damping: 5,
            stiffness: 80,
            overshootClamping: false,
          }}
          overdragResistanceFactor={2}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.ProfileReducer.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProfile: data => dispatch(addProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  provider: ProviderPropType,
};

// "data": Array [
//   Object {
//     "createdAt": "2020-05-06T23:55:13.709Z",
//     "id": 170,
//     "isDeleted": false,
//     "isPublic": false,
//     "isVerified": false,
//     "key": "homeLocation",
//     "updatedAt": "2020-05-06T23:55:13.709Z",
//     "userId": 25,
//     "value": "{\"latitude\":9.8514232,\"longitude\":8.8899417}",
//   },
// ],
// }
