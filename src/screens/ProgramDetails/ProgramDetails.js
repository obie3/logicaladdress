'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, Preloader, ErrorAlert, SuccessAlert} from '../../components';
import styles from './styles';
import { DrawerActions } from "react-navigation";
import moment from 'moment';
import { AirbnbRating } from 'react-native-ratings';
import {CreateNotificationEndpoint, CreateRatingEndpoint, post, getProfile} from '../../utils'


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token : '',
      showSuccessAlert : false,
      successMessage: '',
      showErrorAlert: false,
      errorMessage: '',
      showLoading:false,
      message : '',
      disabled:true,
      program:false,
      rateCount: 0,
    }
  }

  componentDidMount() {
    let program = this.props.navigation.getParam('program');
    let formattedDate = moment(program.date).format('YYYY-MM-DD');
    let endTime = new Date(moment(`${formattedDate}T${program.end_time}:00+01:00`).format());
    let currentTime = moment().valueOf();

    if(  endTime.valueOf() < currentTime ) {
       this.setState({
        disabled : false
      })
    }
    this.setState({program});
  }

  toggleDrawer = () => {

    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  };
  handlePressBack = () => {
    return this.props.navigation.goBack();
  }

  handleCloseNotification = () => {
    return this.setState({
      showSuccessAlert : false,
      showErrorAlert: false,
    });
  }

  displaySpeakers(speakers){
    let items = [];
    if(speakers) {
     items = speakers.map((row, i ) => {
      return (<DisplayText
        text = {`${row.name} ${' '}`}
        styles = {StyleSheet.flatten(styles.sponserName)}
        key={i}
      />)
        
      })
      
    } 
    return items;
  }

  ratingCompleted = (rating) => { 
    this.submitRating(rating);
  }

   submitRating = async(rating) => {

    const {program} = this.state;

    let profile =  await getProfile();
    this.setState({
      showLoading:true,
    })
    let data =  JSON.stringify({
      'eventid' :  program._id, 
      'userid' : profile.id,
       rating
    });
    await post (CreateRatingEndpoint, data, profile.sessionToken )
      .then((res) => {    
        if(res.status == 'success') {
          this.setState({
            showLoading: false,
            showSuccessAlert: true,
            successMessage : res.status   
          })
        }
        else {
          this.setState({
            showLoading: false,
            showErrorAlert: true,
            errorMessage : res.status
          })
        }
       
      });
  }


  setNotification = async() => {
   let profile = await getProfile();
   const {program} = this.state;

    this.setState({
      showLoading:true,
    })
    let data = await JSON.stringify({
      'eventid' :  program.eventid, 
      'userid' : profile.id,
       'programid' : program._id,
    });

     await post (CreateNotificationEndpoint, data, profile.sessionToken )
      .then((res) => {
        if(res.status == 'success') {
          this.setState({
            showLoading:false,
            showSuccessAlert: true,
             successMessage : res.status
          })
        }
        else {
          this.setState({
            showLoading: false,
            showErrorAlert: true,
            errorMessage : res.message
          })
        }
       
       });
  }

  render () {
   const {program, showLoading, errorMessage, showErrorAlert, rateCount, successMessage, disabled, showSuccessAlert} = this.state;    
    let date = moment(program.date).format('MMM DD, YYYY');
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default"/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={this.handlePressBack} 
          style = {styles.headerImage}>
          <Image
            onPress={this.handlePressBack} 
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text = {'PROGRAMS'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
      </View>
      </View>
      <View style = {styles.programView}>
        <ScrollView 
          style={{flex:1,}}
          showsVerticalScrollIndicator={false}>
          <View style = {styles.blueCard}>
            <DisplayText
              text = {program.title || ''}
              styles = {StyleSheet.flatten(styles.headerCardTxt)}
            />
            <DisplayText
              text = {`${date} ${program.start_time}`}
              styles = {StyleSheet.flatten(styles.cardDate)}
            />
          </View>
          {/* Description */}
          <View style = {styles.cardCategory}>
            <DisplayText
              text = {'Program and Event Description'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <DisplayText
              text = {program.description || '' }
              styles = {StyleSheet.flatten(styles.typeTxt)}
            />
          </View>
          

          <View style = {styles.cardCategory}>
            <DisplayText
              text = {'Category'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
           
            <View style ={styles.catTypeView}>
              <View style = {styles.textCont}>
                <DisplayText
                  text = {program.type || ''}
                  styles = {StyleSheet.flatten(styles.cartType)}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style = {styles.blueButton} onPress={this.setNotification}>
            <DisplayText
              text = {'+ Add to my Program'}
              styles = {StyleSheet.flatten(styles.buttonTxt)}
            />
          </TouchableOpacity>
          {/* Rating */}
          <View style = {styles.cardSpeaker}>
            <DisplayText
              text = {'Rating'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <View style={styles.rating}>
              <AirbnbRating
                count={5}
                defaultRating={rateCount}
                size={20}
                showRating={false}
                isDisabled={disabled}
                onFinishRating={this.ratingCompleted}
              />
            </View>
          </View>

          {/* LOCATIO */}
          <View style = {styles.cardSpeaker}>
            <DisplayText
              text = {'Location'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
            <DisplayText
              text = {program.venue || ''}
              styles = {StyleSheet.flatten(styles.sponserName)}
            />
          </View>

          <View style = {styles.cardSpeaker}>
            <DisplayText
              text = {'Speaker'}
              styles = {StyleSheet.flatten(styles.sponser)}
            />
             <View style ={{width: '93%', flexWrap : 'wrap'}}>
              {this.displaySpeakers(program.speakers)}
             </View>
          </View>
          
          {/* Attendy one Image */}
          <View style = {styles.attendyView}>
          </View>
            <Preloader
              modalVisible={showLoading}
             animationType="fade"
            />
            <ErrorAlert
                title = {'Error!'} 
                message = {errorMessage}
                handleCloseNotification = {this.handleCloseNotification}
                visible = {showErrorAlert}
              />
            <SuccessAlert
              title = {'Success!'} 
              message = {successMessage}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showSuccessAlert}
            />
        </ScrollView>
      </View>
    </SafeAreaView>
    
   )
  }
} 