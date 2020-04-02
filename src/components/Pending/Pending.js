import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../assets/colors';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';

export default class Pending extends Component {
  render() {
    const { size, layoutSize } = this.props;
    const iconsize = size || 14;
    const nHeight = layoutSize || 22;
    const nWidth = layoutSize || 22;
    return (
      <TouchableHighlight
        style={[styles.button, { height: nHeight, width: nWidth }]}
      >
        <Icon
          name={'exclamationcircle'}
          color={colors.red}
          size={iconsize}
          style={styles.icon}
        />
      </TouchableHighlight>
    );
  }
}

Pending.propTypes = {
  disabled: PropTypes.bool,
  // handleNextButton: PropTypes.func,
  //onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 2,
  },
  // icon: {
  //   marginRight: -2,
  //   marginTop: -2,
  // },
});
