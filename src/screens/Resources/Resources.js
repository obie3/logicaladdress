'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {DisplayText, InputField, Preloader, ErrorAlert} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';

 class Resources extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      showSuccessAlert : false,
      successMessage: '',
      showErrorAlert: false,
      errorMessage: '',
      showLoading:false,
      filePreviewText: ''

    }
    this.arrayholder = [];

  }

  componentDidMount(){
    this.setState({
      data: this.props.resources,
    });
    
    this.arrayholder = this.props.resources;
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
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
  
   async downloadResource(remoteUri){
    Linking.openURL(remoteUri)
    .catch(err => {
      this.setState({
        showErrorAlert: true,
        errorMessage : `${err}`
      })
    })

   
  }

  openFile(uri) {
    Linking.openURL(uri)
  }
  renderRow = ({item}) => {
    //console.log({item})
    return (
       <View style = {styles.listViewItem}>    
        <View style = {styles.cardView}>
          <DisplayText
             text = {item.title}
             styles = {StyleSheet.flatten(styles.titleText)}
           />
          <View style = {styles.resouceView}>
            <Image
              source = {require('../../assets/images/pdf.png')}
              style = {StyleSheet.flatten(styles.pdfIcon)}
            />
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.description}
              styles = {StyleSheet.flatten(styles.resourceTxt)}
            />
       
          </View>
          <View style={styles.line}></View>
          <TouchableOpacity 
            style = {styles.downloadBtn} 
            onPress={()=>this.downloadResource(item.url)}>
            <DisplayText
              text = {'Open'}
              onPress={()=>this.downloadResource(item.url)}
              styles = {StyleSheet.flatten(styles.downloadtxt)}
            />
          </TouchableOpacity>
          
          </View>
        </View>
      );
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  render () {
    const {errorMessage, showErrorAlert} = this.state;    

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
             text = {"RESOURCES"}
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
            <ErrorAlert
              title = {'Error!'} 
              message = {errorMessage}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showErrorAlert}
            />
            
       </View>  
       
        
     </SafeAreaView>
     )
   }
 } 

 const mapStateToProps = (state, ownProps) =>{
  return{
    resources: state.ResourceReducer.resources
  }
}


export default connect(mapStateToProps)(Resources)