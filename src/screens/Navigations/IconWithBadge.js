'use strict';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { resetNotificationCount } from 'redux/actions/NotificationActions';
import styles from './styles';

class IconWithBadge extends Component {
  render() {
    const { name, color, size } = this.props.parentProps;
    const { counter } = this.props;

    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Icon name={name} size={size} color={color} />
        {counter > 0 && (
          <View style={styles.badgeLayout}>
            <Text style={styles.badgeCount}>{counter}</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetNotificationCount: () => dispatch(resetNotificationCount()),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.NotificationReducer.count,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconWithBadge);
