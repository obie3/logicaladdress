import React, { Component } from 'react';
import { EventEmitter } from 'fbemitter';
import { NavigationEvents } from 'react-navigation';
import {
  AppState,
  AsyncStorage,
  Platform,
  Image,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import styles from './styles';
import * as Location from 'expo-location';
import { SubmitButton, Paragraph, Logo } from 'components';
import colors from 'assets/colors';
import moment from 'moment';
import DropdownAlert from 'react-native-dropdownalert';

const STORAGE_KEY = 'expo-home-locations';
const LOCATION_UPDATES_TASK = 'location-updates';

const locationEventsEmitter = new EventEmitter();

export default class ContactTracing extends Component {
  static navigationOptions = {
    title: 'Background location',
  };

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
      //alert('Click `Start tracking` to start getting location updates.');
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
      timeInterval: 1800000,
      // foregroundService: {
      //   notificationTitle: 'LogicalAddress LocationService',
      //   notificationBody:
      //     'LogicalAddress LocationService is tracking your location at the background',
      //   notificationColor: '#27ae60',
      // },
    });

    // if (!this.state.isTracking) {
    //   alert(
    //     'Now you can send app to the background, go somewhere and come back here! You can even terminate the app and it will be woken up when the new significant location change comes out.',
    //   );
    // }
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

  render() {
    const { isTracking } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <DropdownAlert
          duration={5}
          defaultContainer={styles.alert}
          ref={ref => (this.dropDownAlertRef = ref)}
        />

        <View style={styles.wrapper}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center', //'space-evenly'
              alignItems: 'center',
            }}
          >
            {/* <Logo /> */}

            <View style={styles.imageLayout}>
              <Image
                style={styles.image}
                source={
                  isTracking
                    ? require('assets/images/active2.gif')
                    : require('assets/images/stop.png')
                }
              />
            </View>
            <View>
              <Paragraph
                text={
                  isTracking
                    ? 'Contact tracing in enabled, click  `Disable` to disable'
                    : 'Contact tracing is disabled click `Enable` to enable'
                }
                styles={styles.messageText}
              />
              <View style={styles.btnView}>
                <SubmitButton
                  title={isTracking ? 'Disable' : 'Enable'}
                  btnStyle={isTracking ? styles.redButton : styles.greenButton}
                  titleStyle={styles.buttonTxt}
                  onPress={this.toggleTracking}
                  disabled={false}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
      if (newLocations) {
        savedLocations.push(...newLocations);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
      }
      locationEventsEmitter.emit('update', savedLocations);
    }
  },
);
//}
