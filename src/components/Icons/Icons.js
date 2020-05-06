import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from 'assets/colors';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

export default class Icons extends Component {
  render() {
    const {
      disabled,
      onPress,
      name,
      iconStyle,
      iconColor,
      iconSize,
    } = this.props;
    const opacityStyle = disabled ? 0.2 : null;
    const style = iconStyle || styles.button;

    return (
      <TouchableOpacity
        style={[{ opacity: opacityStyle }, style]}
        disabled={disabled}
        onPress={onPress}
      >
        <Icon name={name} color={iconColor} size={iconSize} />
      </TouchableOpacity>
    );
  }
}

Icons.propTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func,
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
    backgroundColor: colors.white,
  },
});
