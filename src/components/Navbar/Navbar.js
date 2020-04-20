import React, { Component } from 'react';
import theme from 'assets/theme';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Navbar extends Component {
  render() {
    const {
      size,
      layoutSize,
      rightIconName,
      leftIconName,
      rightIconColor,
      leftIconColor,
      headerTitle,
      leftIconOnPress,
      rightIconOnPress,
    } = this.props;
    const iconSize = size || 14;
    const nHeight = layoutSize || 22;
    const nWidth = layoutSize || 22;
    return (
      <View style={styles.navBar}>
        <TouchableOpacity onPress={leftIconOnPress} style={styles.headerImage}>
          <Icon
            name={leftIconName}
            color={rightIconColor}
            size={iconSize}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.nameView}>
          <Text style={StyleSheet.flatten(styles.txtHeader)}>
            {headerTitle}
          </Text>
        </View>
        <TouchableOpacity onPress={rightIconOnPress} style={styles.headerImage}>
          <Icon
            name={rightIconName}
            color={leftIconColor}
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
    height: hp('7%'),
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),

    shadowColor: theme.secondaryTextColor,
    shadowOffset: {
      width: 0,
      height: 1, //4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },

  nameView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHeader: {
    fontSize: 16,
    color: theme.primaryTextColor,
    alignSelf: 'center',
    fontFamily: theme.secondaryFont,
  },
});
