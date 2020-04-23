import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';
import Icon from '@expo/vector-icons/Ionicons';

export default class BackIcon extends Component {
  render() {
    const { onPress, name, iconStyle, iconColor, iconSize } = this.props;
    return (
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onPress} style={styles.backView}>
          <Icon
            name={name}
            color={iconColor}
            size={iconSize}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 2,
  },
  navBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'transparent',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
  },
  backView: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: colors.blue,
  },
});
