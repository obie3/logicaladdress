import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class Line extends Component {
  render() {
    const { marginLeft } = this.props;
    let value = marginLeft ? marginLeft : null;
    return (
      <View
        style={{
          borderBottomWidth: 2, //StyleSheet.hairlineWidth,
          borderBottomColor: '#F5F5F5',
          marginLeft: value,
        }}
      />
    );
  }
}
