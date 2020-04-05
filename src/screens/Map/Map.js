import React, { Component } from 'react';
import { View, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles';
import Icon from './Icon';
import { Paragraph, SubmitButton, Preloader } from 'components';
const { width, height } = Dimensions.get('window');
import DropdownAlert from 'react-native-dropdownalert';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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
      home: {},
      showLoading: false,
      coordinates: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
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
      home: response.nativeEvent,
    });
  };

  updateLogicalAddress = async () => {
    return this.showNotification('info', 'Message', 'Yet to get docs');

    // let { phone, email, name } = params;
    // const settings = {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ phone }),
    // };

    // try {
    //   const response = await fetch(generateOTPEndpoint, settings);
    //   const res = await response.json();
    //   if (typeof res.data === 'undefined') {
    //     return this.showNotification('error', 'Message', res.meta.message);
    //   }
    //   await saveToLocalStorage(name, email, phone);
    //   this.hideLoadingDialogue();
    //   return this.props.navigation.navigate('Verification', params);
    // } catch (error) {
    //   return this.showNotification('error', 'Hello', error.toString());
    // }
  };

  renderInner = () => {
    const { home } = this.state;
    if (typeof home.coordinate == 'undefined') {
      return (
        <View style={[styles.panel]}>
          <Paragraph
            styles={styles.panelTitle}
            text={'Drag Marker to Set Address'}
          />
        </View>
      );
    }
    return (
      <View style={styles.panel}>
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
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      let region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0992,
        longitudeDelta: 0.0992 * ASPECT_RATIO,
      };
      this.setState({
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        region,
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
        <MapView
          ref={map => {
            this.map = map;
          }}
          provider={this.props.provider}
          style={styles.map}
          showsPointsOfInterest
          //onRegionChange={region => this.setState({ region })}
          loadingEnabled={true}
          showsUserLocation={true}
          mapType={'standard'}
          initialRegion={region}
        >
          <Marker
            coordinate={coordinates}
            onDragEnd={e => this.handleSetHomeAddress(e)}
            // onPress={e => log('onPress', e)}
            draggable
          />
        </MapView>
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />
        <Icon onPress={this.handleBackPress} />
        <Preloader modalVisible={showLoading} animationType='fade' />

        <BottomSheet
          ref={this.bs}
          snapPoints={[100, 100, 30]}
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
