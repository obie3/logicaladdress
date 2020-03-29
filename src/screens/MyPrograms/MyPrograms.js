'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';


class MyPrograms extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }
  

  
  render () {
    console.log({'programsss : ': this.props.program})
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
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
            text = {"MY PROGRAMS"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      <View style = {styles.viewBody}>
        <View style={styles.searchView}>
          <View style = {{flexDirection : 'row'}}>
            
            <TouchableOpacity style = {styles.iconBotton}>
              <Image
                source = {require('../../assets/images/checklist.png')}
                style = {StyleSheet.flatten(styles.searchIcon)}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style = {styles.iconBottonSearch}>
              <Image
                source = {require('../../assets/images/search.png')}
                style = {StyleSheet.flatten(styles.checklistIcon)}
              />
            </TouchableOpacity> */}
            
          </View>
          
          <TouchableOpacity style = {styles.iconBottonFilter}>
            <Image
              source = {require('../../assets/images/filter.png')}
              style = {StyleSheet.flatten(styles.filterIcon)}
            />
          </TouchableOpacity>
          <InputField
            placeholder = {'Search Following'}
            placeholderTextColor = {theme.secondaryTextColor}
            textColor={theme.primaryTextColor}
            inputType={'name'}
            keyboardType={'default'}
            onChangeText = {this.handleNameChange}
            autoCapitalize = "words"
            height = {30}
            width = {'70%'}
            borderBottomWidth = {0}
            paddingLeft  = {8}
          /> 
          
        </View>
      {/* Add this disign to you flatlist after fetching your data */}
      <View 
        onPress = {this.handleViewSponser}
        style = {styles.cardView}>
        <View style = {styles.cardHeaderView}>
          <DisplayText
            text = {"The Business of Branding"}
            styles = {StyleSheet.flatten(styles.headerText)}
          />
          <TouchableOpacity style = {styles.buttonView}>
            <DisplayText
              text = {"workshop"}
              styles = {StyleSheet.flatten(styles.btnText)}
            /> 
          </TouchableOpacity>
        </View>
        <DisplayText
          text = {'Today 03:00pm - 05:00pm'}
          styles = {StyleSheet.flatten(styles.timeText)}
          />
        <View style = {styles.cardEventNames}>
          <Image
            source = {require('../../assets/images/male.png')}
            style = {StyleSheet.flatten(styles.maleIcon)}
          />
          <Image
            source = {require('../../assets/images/male.png')}
            style = {StyleSheet.flatten(styles.maleIcon)}
          />
          <DisplayText
            text = {' Barr. Josh Av,'}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
          <DisplayText
            text = {'Tammy J,'}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
          <DisplayText
            text = {'Dr John'}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
        </View>
          <DisplayText
            text = {'Lorem ipsum dolor sit amet, consecteturedmunn swacing elit, sed do eiusmod tempor incidffsddewrer'}
            styles = {StyleSheet.flatten(styles.cardTxtBody)}
          />
          <DisplayText
            text = {'Hall 4, Long Amphitheatre, Sheraton. '}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
          <View style = {styles.tagsView}>
            <TouchableOpacity style = {styles.buttonView}>
              <DisplayText
                text = {"Technology"}
                styles = {StyleSheet.flatten(styles.btnText)}
              /> 
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonView}>
              <DisplayText
                text = {"Business"}
                styles = {StyleSheet.flatten(styles.btnText)}
              /> 
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonView}>
              <DisplayText
                text = {"TalkShow"}
                styles = {StyleSheet.flatten(styles.btnText)}
              /> 
            </TouchableOpacity>

            
            <TouchableOpacity style = {styles.plusBtn}>
              <Image
                source = {require('../../assets/images/plus_btn.png')}
                style = {StyleSheet.flatten(styles.plusIcon)}
              />
            </TouchableOpacity>
          </View>
      </View>
  
    </View>  
    
  </SafeAreaView>
    
   )
  }
} 


// const mapStateToProps = (state, ownProps) =>{
//   return{
//     program: state.ProgramReducer.profile
//   }
// }


export default MyPrograms

