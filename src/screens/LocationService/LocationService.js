import React, { Component } from 'react';
import { EventEmitter } from 'fbemitter';
import { NavigationEvents } from 'react-navigation';
import { AppState, AsyncStorage, Platform, Text, View } from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import styles from './styles';
import * as Location from 'expo-location';
import { SubmitButton } from 'components';
import colors from 'assets/colors';
import moment from 'moment';

const STORAGE_KEY = 'expo-home-locations';
const LOCATION_UPDATES_TASK = 'location-updates';

const locationEventsEmitter = new EventEmitter();

export default class LocationService extends Component {
  static navigationOptions = {
    title: 'Background location',
  };

  mapViewRef = React.createRef();

  state = {
    accuracy: Location.Accuracy.High,
    isTracking: false,
    showsBackgroundLocationIndicator: false,
    savedLocations: [],
    initialRegion: null,
    error: null,
  };

  didFocus = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      AppState.addEventListener('change', this.handleAppStateChange);
      this.setState({
        error:
          'Location permissions are required in order to use this feature. You can manually enable them at any time in the "Location Services" section of the Settings app.',
      });
      return;
    } else {
      this.setState({ error: null });
    }

    const { coords } = await Location.getCurrentPositionAsync();
    const isTracking = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_UPDATES_TASK,
    );
    const task = (await TaskManager.getRegisteredTasksAsync()).find(
      ({ taskName }) => taskName === LOCATION_UPDATES_TASK,
    );
    const savedLocations = await getSavedLocations();
    const accuracy = (task && task.options.accuracy) || this.state.accuracy;

    this.eventSubscription = locationEventsEmitter.addListener(
      'update',
      locations => {
        this.setState({ savedLocations: locations });
      },
    );

    if (!isTracking) {
      alert('Click `Start tracking` to start getting location updates.');
    }

    this.setState({
      accuracy,
      isTracking,
      savedLocations,
      initialRegion: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      },
    });
  };

  handleAppStateChange = nextAppState => {
    if (nextAppState !== 'active') {
      return;
    }

    if (this.state.initialRegion) {
      AppState.removeEventListener('change', this.handleAppStateChange);
      return;
    }

    this.didFocus();
  };

  componentWillUnmount() {
    if (this.eventSubscription) {
      this.eventSubscription.remove();
    }

    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  async startLocationUpdates(accuracy = this.state.accuracy) {
    await Location.startLocationUpdatesAsync(LOCATION_UPDATES_TASK, {
      accuracy,
      showsBackgroundLocationIndicator: this.state
        .showsBackgroundLocationIndicator,
      distanceInterval: 5,
      timeInterval: 2500,
      foregroundService: {
        notificationTitle: 'LogicalAddress LocationService',
        notificationBody:
          'Ogbeni we re traking your location in the background',
        notificationColor: '#27ae60',
      },
    });

    if (!this.state.isTracking) {
      alert(
        'Now you can send app to the background, go somewhere and come back here! You can even terminate the app and it will be woken up when the new significant location change comes out.',
      );
    }
    this.setState({ isTracking: true });
  }

  async stopLocationUpdates() {
    await Location.stopLocationUpdatesAsync(LOCATION_UPDATES_TASK);
    this.setState({ isTracking: false });
  }

  clearLocations = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    this.setState({ savedLocations: [] });
  };

  toggleTracking = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);

    if (this.state.isTracking) {
      await this.stopLocationUpdates();
    } else {
      await this.startLocationUpdates();
    }
    this.setState({ savedLocations: [] });
  };

  onAccuracyChange = () => {
    const next = Location.Accuracy[this.state.accuracy + 1];
    const accuracy = next ? Location.Accuracy[next] : Location.Accuracy.Lowest;

    this.setState({ accuracy });

    if (this.state.isTracking) {
      // Restart background task with the new accuracy.
      this.startLocationUpdates(accuracy);
    }
  };

  toggleLocationIndicator = async () => {
    const showsBackgroundLocationIndicator = !this.state
      .showsBackgroundLocationIndicator;

    this.setState({ showsBackgroundLocationIndicator }, async () => {
      if (this.state.isTracking) {
        await this.startLocationUpdates();
      }
    });
  };

  onCenterMap = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    const mapView = this.mapViewRef.current;

    if (mapView) {
      mapView.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      });
    }
  };

  renderPolyline() {
    const { savedLocations } = this.state;

    if (savedLocations.length === 0) {
      return null;
    }
    return (
      <MapView.Polyline
        coordinates={savedLocations}
        strokeWidth={3}
        strokeColor={colors.blue}
      />
    );
  }

  render() {
    if (this.state.error) {
      return <Text style={styles.errorText}>{this.state.error}</Text>;
    }

    if (!this.state.initialRegion) {
      return <NavigationEvents onDidFocus={this.didFocus} />;
    }

    return (
      <View style={styles.screen}>
        <MapView
          ref={this.mapViewRef}
          style={styles.mapView}
          initialRegion={this.state.initialRegion}
          showsUserLocation
        >
          {this.renderPolyline()}
        </MapView>
        <View style={styles.buttons} pointerEvents='box-none'>
          <View style={styles.topButtons}>
            <View style={styles.buttonsColumn}>
              {Platform.OS === 'android' ? null : (
                <SubmitButton
                  title={
                    this.state.showsBackgroundLocationIndicator
                      ? 'Hide'
                      : 'Show'
                  }
                  style={styles.button}
                  onPress={this.toggleLocationIndicator}
                  disabled={false}
                />
              )}
              <SubmitButton
                title={Location.Accuracy[this.state.accuracy]}
                style={styles.button}
                onPress={this.onAccuracyChange}
                disabled={false}
              />
            </View>
            <View style={styles.buttonsColumn}>
              <SubmitButton
                title='Hello'
                styles={styles.button}
                onPress={this.onCenterMap}
                disabled={false}
              />
            </View>
          </View>

          <View style={styles.bottomButtons}>
            <SubmitButton
              title={'Clear Location'}
              style={styles.button}
              onPress={this.clearLocations}
              disabled={false}
            />

            <SubmitButton
              title={this.state.isTracking ? 'Stop tracking' : 'Start tracking'}
              styles={styles.button}
              onPress={this.toggleTracking}
              disabled={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

async function getSavedLocations() {
  try {
    const item = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(JSON.parse(item));
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

//if (Platform.OS !== 'android') {
TaskManager.defineTask(
  LOCATION_UPDATES_TASK,
  async ({ data: { locations }, error }) => {
    if (error) {
      // check `error.message` for more details.
      console.log({ 'taskmanager error ': error });
      return;
    }
    if (locations && locations.length > 0) {
      const savedLocations = await getSavedLocations();
      const newLocations = locations.map(({ coords }) => ({
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: moment().format('HH:mm'),
        date: moment().format('DD-MM-YYYY'),
      }));

      savedLocations.push(...newLocations);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));

      locationEventsEmitter.emit('update', savedLocations);
    }
  },
);
//}
