'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { Paragraph, SubmitButton } from 'components';
import styles from './styles';
import colors from 'assets/colors';
import { Navbar } from 'components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class SelectFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      showAlert: false,
      logicalAddress: '',
      data: [],
    };
  }

  componentDidMount() {
    this.getNavParams();
  }

  handleGoBack = () => {
    return this.props.navigation.goBack();
  };

  getNavParams = () => {
    let response = this.props.navigation.getParam('params');
    return this.setState({
      data: response.data,
      token: response.token,
      logicalAddress: response.logicalAddress,
    });
  };

  onPressHandler = ({ item }) => {
    let renderData = [...this.state.data];
    renderData.map(record => {
      if (record.id === item.id) {
        if (
          typeof record.selected === 'undefined' ||
          record.selected === false
        ) {
          record.selected = true;
        } else {
          record.selected = false;
        }
      }
    });
    this.setState({ data: renderData });
  };

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.profileRowItem}
        onPress={() => this.onPressHandler({ item })}
      >
        <View style={styles.flatListItem}>
          <View style={styles.flatListName}>
            <Paragraph
              text={item.title}
              styles={styles.flatListText}
              onPress={() => this.onPressHandler({ item })}
            />
          </View>
          <View style={[styles.flatListName, { justifyContent: 'flex-end' }]}>
            <TouchableOpacity style={styles.radioButtonLayout}>
              <TouchableOpacity
                style={
                  item.selected == true
                    ? [styles.radioButton, { backgroundColor: colors.blue }]
                    : styles.radioButton
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hrLine} />
      </TouchableOpacity>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />
        <Navbar
          size={hp('5%')}
          layoutSize={3}
          leftIconName={
            Platform.OS === 'ios' ? 'ios-arrow-back' : 'ios-arrow-round-back'
          }
          rightIconName={'ios-notifications-outline'}
          rightIconColor={'black'}
          leftIconColor={'#bdc3c7'}
          headerTitle={'Select Fields'}
          leftIconOnPress={() => {
            console.log('hello...');
          }}
          rightIconOnPress={() => {
            console.log('hello...');
          }}
        />

        <View style={styles.aboutView}>
          <View style={styles.fieldsLayout}>
            <FlatList
              extraData={this.state}
              data={data}
              renderItem={this.renderRow}
              keyExtractor={data => data.id}
              ItemSeparatorComponent={this.renderSeparator}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.btnView}>
            <SubmitButton
              title={'Submit'}
              disabled={false}
              onPress={() => {}}
              btnStyle={styles.buttonWithImage}
              titleStyle={styles.buttonTxt}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
