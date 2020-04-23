import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { logout } from 'utils/index';
import { Preloader } from 'components';

export default class Logout extends Component {
  constructor() {
    super();
    this.state = {
      showLoading: true,
    };
  }

  componentDidMount() {
    logout().then(() => {
      this.setState({ showLoading: false });
      return this.props.navigation.navigate('Auth');
    });
  }
  render() {
    const { showLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Preloader modalVisible={showLoading} animationType='fade' />
      </SafeAreaView>
    );
  }
}
