import React from 'react';
import { View, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles';
import Icon from './Icon';
import { Paragraph, SubmitButton } from 'components';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 9.061965;
const LONGITUDE = 7.489856;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class MarkerTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      home: {},
      panelHeight: 1,
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    };
  }
  handleBackPress = () => this.props.navigation.navigate('Home');

  handleSetHomeAddress = response => {
    return this.setState({
      panelHeight: 2,
      home: response.nativeEvent,
    });
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
        <Paragraph
          styles={styles.panelSubtitle}
          text={home.coordinate.latitude.toString()}
        />
        <View style={styles.panelButton}>
          <SubmitButton
            title={'Confirm'}
            onPress={() => {}}
            btnStyle={styles.buttonWithImage}
            titleStyle={styles.panelButtonTitle}
            disabled={true}
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

  bs = React.createRef();

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />

        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            coordinate={this.state.b}
            onSelect={e => log('onSelect', e)}
            onDrag={e => log('onDrag', e)}
            onDragStart={e => log('onDragStart', e)}
            onDragEnd={e => this.handleSetHomeAddress(e)}
            onPress={e => log('onPress', e)}
            draggable={true}
          />
        </MapView>
        <Icon onPress={this.handleBackPress} />
        <BottomSheet
          ref={this.bs}
          snapPoints={[200, 100, 20]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
        />
      </SafeAreaView>
    );
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType,
};

export default MarkerTypes;
