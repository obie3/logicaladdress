import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import theme from 'assets/theme';
import colors from 'assets/colors';

export default class BackIcon extends Component {
  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onPress} style={styles.backView}>
          <Image
            onPress={onPress}
            source={require('assets/images/back.png')}
            style={styles.backIcon}
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
