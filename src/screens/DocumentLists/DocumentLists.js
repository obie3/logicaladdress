'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Paragraph } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import theme from 'assets/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class DocumentLists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRow = ({ item }) => {
    let iconConfig = {};
    if (item.status === 'pending') {
      iconConfig['color'] = theme.iconColor;
      iconConfig['name'] = 'ios-hand';
    } else if (item.status === 'completed') {
      iconConfig['color'] = colors.green;
      iconConfig['name'] = 'ios-checkmark-circle';
    } else if (item.status === 'rejected') {
      iconConfig['color'] = colors.errorRed;
      iconConfig['name'] = 'ios-alert';
    }
    return (
      <View style={styles.flatListItem}>
        <ImageBackground
          source={
            item.url
              ? { uri: item.url }
              : require('assets/images/addcontact.png')
          }
          style={styles.imageBackground}
          imageStyle={styles.cardImage}
        >
          <View style={styles.imageOverlay}>
            <View style={styles.cardTextRow1}>
              <Paragraph
                text={item.type.toUpperCase()}
                styles={[styles.cardText1, { fontSize: 20 }]}
              />
              <Paragraph
                text={'status'}
                styles={[styles.cardText1, { paddingRight: wp('7%') }]}
              />
            </View>
            <View style={styles.cardTextRow}>
              <Paragraph text={item.status} styles={styles.cardText2} />
              <Icon name={iconConfig.name} color={iconConfig.color} size={20} />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  render() {
    const { parentProps } = this.props;
    let { documents } = parentProps;
    let { data } = documents;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          hidden={false}
          backgroundColor={colors.blue}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View style={[styles.tabView, styles.scrollViewStyle]}>
          <View style={styles.card}>
            {data.length > 0 ? (
              <FlatList
                extraData={this.state}
                data={data}
                renderItem={this.renderRow}
                keyExtractor={data => data.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyListLayout}>
                <Image
                  style={styles.ImageLayout}
                  source={require('assets/images/addcontact.png')}
                />
                <Paragraph
                  text={
                    'There are no documents in your profile,  \nonce you upload any,  \nthey will show here'
                  }
                  styles={styles.upladMessage}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
