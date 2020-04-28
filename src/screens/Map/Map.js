import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  BackHandler,
  TouchableOpacity,
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
import { UpdateProfileEndpoint, fetchToken, getProfile } from 'utils';

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

export default class Map extends Component {
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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => this.props.navigation.navigate('OnBoarding');

  showLoadingDialogue = () => this.setState({ showLoading: true });

  hideLoadingDialogue = () => this.setState({ showLoading: false });

  showNotification = (type, title, message) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  };

  handleSetHomeAddress = response => {
    return this.setState({
      coordinates: response.nativeEvent.coordinate,
    });
  };

  updateLogicalAddress = async () => {
    this.showLoadingDialogue();
    const { token, coordinates, fieldId } = this.state;
    let data = {
      fieldId,
      value: coordinates,
    };

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
        </View>
      );
    }
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
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  initToken = async () => {
    let { token } = await fetchToken();
    let profile = await getProfile();
    let filteredArray = profile.data.params.profileData.filter(record => {
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
            name={'ios-arrow-back'}
            iconStyle={styles.backView}
            iconColor={colors.blue}
            iconSize={20}
            onPress={this.handleBackPress}
          />
          <Icons
            name={'ios-locate'}
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
          snapPoints={[150, 100, 30]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          enabledInnerScrolling={false}
          enabledContentGestureInteraction={false}
          initialSnap={1}
        />
      </SafeAreaView>
    );
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};
