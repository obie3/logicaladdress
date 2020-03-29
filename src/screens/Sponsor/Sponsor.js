'use strict';
import React, {Component} from 'react';
import { View,SafeAreaView, StatusBar, Image, FlatList, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import {connect} from 'react-redux';
import theme from '../../assets/theme'

 class Sponsor extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      data:[]
    }

  }
   componentDidMount() {
     AsyncStorage.clear().then(() => {
       this.props.navigation.navigate('AuthLoading')
     })
    this.setState({
      data:this.props.sponsors,
    })
    this.arrayholder = this.props.sponsors;
    
  }
  

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.profile.name.toUpperCase()} ${item.profile.short_bio.toUpperCase()}`;
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

  handleViewSponser(item){
    return this.props.navigation.navigate('SponsorDetails', {
       item
    });
  }


  renderRow = ({item}) => {
    return (
       <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleViewSponser(item)}
          style = {styles.cardView}>
          <View style = {styles.sponsorImageView}>
            <Image
              onPress = {()=>this.handleViewSponser(item)}
              source = {{uri: item.profile.photo}}
              style = {StyleSheet.flatten(styles.sponsorImage)}
            />
          </View>
          <View style = {styles.txtView}>
            <DisplayText
              onPress = {()=>this.handleViewSponser(item)}
              numberOfLines = { 1 } 
              ellipsizeMode = 'middle'
              text = {item.profile.name}
              styles = {StyleSheet.flatten(styles.headerText)}
            />

            <DisplayText
              onPress = {()=>this.handleViewSponser(item)}
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.profile.short_bio}
              styles = {StyleSheet.flatten(styles.subHeaderText)}
            />
            <View style={styles.buttonMoreView}>
              <DisplayText
                onPress = {()=>this.handleViewSponser(item)}
                text = {"see more"}
                styles = {StyleSheet.flatten(styles.moreText)}
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
            text = {"Sponsor List"}
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
            renderItem={this.renderRow}          
            keyExtractor={ data=> data._id}   
            showsVerticalScrollIndicator={false}
          />
      </View>  
    </SafeAreaView>
    )
  }
} 


const mapStateToProps = (state, ownProps) =>{
  return{
    
    sponsors: state.SponsorReducer.sponsorProfile
  }
}

export default connect(mapStateToProps)(Sponsor)