import React, { memo } from 'react';
import { Image } from 'react-native';
import styles from './styles';

const Logo = () => (
  <Image
    source={require('../../assets/images/logicallogo.png')}
    resizeMode={'cover'}
    style={styles.image} />
);

export default memo(Logo);
