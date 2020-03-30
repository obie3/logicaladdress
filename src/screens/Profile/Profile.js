'use strict';
import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Paragraph, SubmitButton } from '../../components';
import styles from './styles';
import { connect } from 'react-redux';
import Icon from '@expo/vector-icons/AntDesign';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.headerImage}
          >
            <Image
              onPress={() => this.props.navigation.goBack()}
              source={require('../../assets/images/back.png')}
              style={StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style={styles.nameView}>
            <Paragraph
              text={'PROGRAM'}
              styles={StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View>
        <View style={styles.viewBody}>
          <View style={styles.cardLayout}>
            <View style={styles.cardContents}>
              <View style={{ flex: 0, flexDirection: 'row' }}>
                <View style={styles.cardIconLayout}>
                  <Image
                    style={styles.cardIcon}
                    borderRadius={20}
                    source={require('../../assets/images/maplocation.png')}
                  />
                </View>
                <View style={styles.verificationStatusLayout}>
                  <Paragraph
                    text={'Retnan Daser'}
                    styles={StyleSheet.flatten(styles.nameText)}
                  />
                  <Paragraph
                    text={'07038602624'}
                    styles={StyleSheet.flatten(styles.nameText)}
                  />
                  <View style={styles.verificationIndicators}>
                    <Paragraph
                      text={'Verified'}
                      styles={StyleSheet.flatten(styles.verificationText)}
                    />
                    <View style={styles.iconLayout}>
                      <Icon
                        name='check'
                        color={'white'}
                        size={20}
                        style={styles.iconStyle}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <SubmitButton
                  title={'Verify'}
                  onPress={() => console.log('hellooo')}
                  //imgSrc={require('../../assets/images/add_peopl.png')}
                  btnStyle={styles.button}
                  //imgStyle={StyleSheet.flatten(styles.iconDoor)}
                  titleStyle={StyleSheet.flatten(styles.buttonTxt)}
                  disabled={false}
                />
                {/* <Button
                    onPress={()=>{console.log('I was pressed')}}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  /> */}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    program: state.ProgramReducer.program,
  };
};

export default connect(mapStateToProps)(Profile);
