import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../assets/colors';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
//import Icon from 'react-native-vector-icons/FontAwesome';

export default class Icons extends Component {
  render() {
    const {
      disabled,
      onPress,
      name,
      btnstyle,
      iconColor,
      iconSize,
    } = this.props;
    const opacityStyle = disabled ? 0.2 : null;
    const style = btnstyle || styles.button;

    return (
      <TouchableHighlight
        style={[{ opacity: opacityStyle }, style]}
        disabled={disabled}
        onPress={onPress}
      >
        <Icon
          name={name}
          color={iconColor}
          size={iconSize}
          style={styles.icon}
        />
      </TouchableHighlight>
    );
  }
}

Icons.propTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 60,
    width: 60,
    marginTop: 16,
    backgroundColor: colors.gold,
  },

  // title: {
  //   fontFamily: 'Montserrat-Bold',
  //   color: colors.black,
  // },
  icon: {
    marginRight: -2,
    marginTop: -2,
  },
});
