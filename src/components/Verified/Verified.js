import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../assets/colors';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
export default class Icons extends Component {
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
          name={'checkcircle'}
          color={'#27ae60'}
          size={iconsize}
          style={styles.icon}
        />
      </TouchableHighlight>
    );
  }
}

Icons.propTypes = {
  disabled: PropTypes.bool,
  //handleNextButton: PropTypes.func,
  //onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    //alignItems: '',
    justifyContent: 'center',
    borderRadius: 2,
    //marginTop: 5,
    //backgroundColor: colors.white,
  },
  icon: {
    // marginRight: -2,
    // marginTop: -2,
  },
});
