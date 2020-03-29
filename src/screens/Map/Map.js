import React from 'react';
import {
  StyleSheet,
  View,
    Dimensions,
    TouchableOpacity, TouchableWithoutFeedback,
    Image,
  Text,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet'

import PriceMarker from './PriceMarker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 9.061965;
const LONGITUDE =  7.489856;
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
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    };
  }
    
    
  renderInner = () => (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>San Francisco Airport</Text>
      <Text style={styles.panelSubtitle}>
        International Airport - 40 miles away
      </Text>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Directions</Text>
      </View>
    </View>
  )

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )

  bs = React.createRef()


  render() {
    return (
      <View style={styles.container}>
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
          {/* <Marker
            coordinate={this.state.a}
            onSelect={(e) => log('onSelect', e)}
            onDrag={(e) => log('onDrag', e)}
            onDragStart={(e) => log('onDragStart', e)}
            onDragEnd={(e) => log('onDragEnd', e)}
            onPress={(e) => log('onPress', e)}
            draggable
          >
            <PriceMarker amount={99} />
          </Marker> */}
          <Marker
            coordinate={this.state.b}
            onSelect={(e) => log('onSelect', e)}
            onDrag={(e) => log('onDrag', e)}
            onDragStart={(e) => log('onDragStart', e)}
            onDragEnd={(e) => log('onDragEnd', e)}
            onPress={(e) => log('onPress', e)}
            draggable={true}
          />
            </MapView>
            <BottomSheet
          ref={this.bs}
          snapPoints={[500, 250, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
        />
        <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
          <Image style={styles.map} source={require('../../assets/images/map.jpg')} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType,
};

const IMAGE_SIZE = 50

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
      box: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
      },
      panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      panel: {
        height: 400,
        padding: 20,
        backgroundColor: '#f7f5eee8',
      },
      header: {
        backgroundColor: '#f7f5eee8',
        shadowColor: '#000000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#318bfb',
        alignItems: 'center',
        marginVertical: 10,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
      },
      map: {
        height: '100%',
        width: '100%',
      },
      
});

export default MarkerTypes;