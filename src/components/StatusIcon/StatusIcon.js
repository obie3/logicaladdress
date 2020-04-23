import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Icons extends Component {
  render() {
    const { name, color } = this.props;
    const nHeight = hp('4%'); //22
    const nWidth = hp('4%'); //22
    return (
      <TouchableHighlight
        style={[styles.button, { height: nHeight, width: nWidth }]}
      >
        <Icon name={name} color={color} size={hp('3%')} />
      </TouchableHighlight>
    );
  }
}

Icons.propTypes = {
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    //borderRadius: 2,
    paddingLeft: wp('2%'),
  },
});
