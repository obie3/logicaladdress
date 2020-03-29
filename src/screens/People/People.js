'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';
import orderBy from 'lodash.orderby';


class People extends  React.PureComponent {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
    }
    this.arrayholder = [];

  }


  componentWillMount(){
    const {speakers, sponsors, attendees} = this.props;
  
      let  data = [];
         speakers.forEach(function(profile) {
          if (!data.includes(profile)) {
            data.push({
              profile,
              'role': 'speaker'
            })
          }
        });

        sponsors.forEach(function(profile) {
          if (!data.includes(profile)) {
            data.push({
              profile,
              'role': 'sponsor'
            })
          }
        });

        attendees.forEach(function(profile) {
          if (!data.includes(profile)) {
            data.push({
              profile,
              'role': 'attendee'
            })
          }
        });
        

     let sortedData = orderBy(data, 'profile.profile.name', 'asc');
    this.setState({
      data: sortedData
    })
    this.arrayholder = sortedData;
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.profile.profile.name.toUpperCase()} ${item.profile.profile.short_bio.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }
  


  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  handlePeopleMain(item){
    return this.props.navigation.navigate('PeopleMain', {
       'item': item
    });
  }
  renderRow = ({item}) => {
    return (
       <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>{this.handlePeopleMain(item)}}
          key={item.profile._id}
          style = {styles.cardView}>
          <View style ={styles.imageText}>
          <View style = {styles.ImageView}>
            <Image
              onPress = {()=>{this.handlePeopleMain(item)}}
              source = {{uri: item.profile.profile.photo}}
              style = {StyleSheet.flatten(styles.personImage)}
            />
          </View>
          <View style = {styles.txtView}>
            <DisplayText
              numberOfLines = { 1 } 
              ellipsizeMode = 'middle'
              text = {item.profile.profile.name}
              styles = {StyleSheet.flatten(styles.headerText)}
              onPress = {()=>{this.handlePeopleMain(item)}}
            />

            <DisplayText
              numberOfLines = { 1 } 
              // ellipsizeMode = 'middle'
              text = {item.profile.profile.company_name}
              styles = {StyleSheet.flatten(styles.subHeaderText)}
              onPress = {()=>{this.handlePeopleMain(item)}}
            />
          </View>
          </View>
            <View style={styles.buttonMoreView}>
              <View style = {styles.bioTextView}>
                <DisplayText
                  numberOfLines = { 2 } 
                  ellipsizeMode = 'middle'
                  text = {item.profile.profile.short_bio}
                  styles = {StyleSheet.flatten(styles.bioDetailTxt)}
                  onPress = {()=>{this.handlePeopleMain(item)}}
                />
              </View>
              
          </View>
          
        </TouchableOpacity>
        </View>
      );
  }

  render () {
    return(
     <SafeAreaView style={styles.container}> 
       <StatusBar barStyle="default"/>
       <View style = {styles.navBar}>
         <TouchableOpacity
           onPress={this.handleGoBack} 
           style = {styles.headerImage}>
           <Image
             onPress={this.handleGoBack} 
             source = {require('../../assets/images/back.png')}
             style = {StyleSheet.flatten(styles.headerIcon)}
           />
         </TouchableOpacity>
         <View style = {styles.nameView}>
           <DisplayText
             text = {"PEOPLE"}
             styles = {StyleSheet.flatten(styles.txtHeader)}
           />
         </View>
       </View>
       <View style = {styles.viewBody}>
         <View style={styles.searchView}>
           <Image
             source = {require('../../assets/images/search.png')}
             style = {StyleSheet.flatten(styles.searchIcon)}
           />
           <InputField
             placeholder = {'Search Following'}
             placeholderTextColor = {theme.secondaryTextColor}
             textColor={theme.primaryTextColor}
             inputType={'name'}
             keyboardType={'default'}
             onChangeText={text => this.searchFilterFunction(text)}
             autoCorrect={false}
             value={this.state.value}
             height = {30}
             width = {'80%'}
             borderBottomWidth = {0}
             paddingLeft  = {8}
           /> 
         </View>
           <FlatList          
             data={this.state.data} 
             initialNumToRender={this.state.data.length}
             renderItem={this.renderRow}          
             keyExtractor={ data=> data._id}   
             showsVerticalScrollIndicator={false}
            // initialNumToRender={10}
             maxToRenderPerBatch={5}
             removeClippedSubviews={true}

           />
       </View>  
     </SafeAreaView>
     )
   }
 } 

 const mapStateToProps = (state, ownProps) =>{
  return{
    attendees: state.AttendeeReducer.attendees,
    sponsors: state.SponsorReducer.sponsorProfile,
    speakers: state.SpeakerReducer.speakers,


  }
}


export default connect(mapStateToProps)(People)