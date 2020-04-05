import React, { memo } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

const Logo = () => (
  <View style={styles.LogoLayout}>
    <Image
      source={require('assets/images/logo.png')}
      resizeMode={'cover'}
      style={styles.image}
    />
  </View>
);

export default memo(Logo);
