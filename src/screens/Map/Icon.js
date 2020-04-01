import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import colors from '../../assets/colors';

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
  navBar: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 20,
    height: 60,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  backView: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.label,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: colors.blue,
  },
});
