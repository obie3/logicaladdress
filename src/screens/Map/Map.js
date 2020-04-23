import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  BackHandler,
} from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles';
import { Paragraph, SubmitButton, Preloader, Icons } from 'components';
const { width, height } = Dimensions.get('window');
import DropdownAlert from 'react-native-dropdownalert';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import colors from 'assets/colors';
import { UpdateProfileEndpoint, fetchToken, getProfile } from 'utils';

const ASPECT_RATIO = width / height;
const LATITUDE = 9.061965;
const LONGITUDE = 7.489856;
const LATITUDE_DELTA = 20.9922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
// let map = null;

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
      fieldId: '',
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

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    let res = await fetchToken();
    let profile = await getProfile();
    let filteredArray = profile.data.params.profileData.filter(record => {
      return record.key == 'homeLocation';
    });
    if (status === 'granted') {
      let { coords } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      let region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0992,
        longitudeDelta: 0.0992 * ASPECT_RATIO,
      };
      this.setState({
        coordinates: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        region,
        token: res.token,
        fieldId: filteredArray[0].id,
      });
      return this.map.animateToRegion(region, 4000);
    } else {
      return this.showNotification(
        'info',
        'Message',
        'Location permission denied',
      );
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
          provider={this.props.provider}
          style={styles.map}
          showsPointsOfInterest
          loadingEnabled={true}
          showsUserLocation={true}
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
            name={Platform.OS === 'ios' ? 'angle-left' : 'long-arrow-left'}
            iconStyle={styles.backView}
            iconColor={colors.blue}
            iconSize={20}
            onPress={this.handleBackPress}
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
