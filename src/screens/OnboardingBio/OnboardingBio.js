'use strict';
import React, {Component} from 'react';
import { View, ScrollView, FlatList, TextInput,KeyboardAvoidingView,Modal,
   Text, TouchableWithoutFeedback, SafeAreaView, StatusBar, Image, TouchableHighlight, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField, ErrorAlert} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import data from '../../utils/Countries';
import colors from '../../assets/colors';
import { isEmpty} from '../../utils';
import {connect} from 'react-redux';
import { addProfile } from '../../redux/actions/ProfileActions';


class OnboardingBio extends Component {
  constructor(props) {
    super(props);
    this.state ={
      gender: '',
      nationalityModalVisible : false,
      country : 'Nationality',
      company_name : '',
      short_bio : '',
      interests: '',
      companyStatus: false,
      biodataStatus: false,
      interestStatus: false,  
      showAlert: false,
      showLoading:false,  
      message: '',
      title: '',
      token:'',
      _id:'',
      add_tag: '',
      tag_list: [],
      isShortBioFocused: false,
      isCompanyFocused:false,
      modalGenderVisible: false,
      isValidGender: false,

    }
  }

  async componentDidMount () {
    const {profile} = this.props;
      try {
        await this.setState({
           'gender' : profile.gender,
          'company_name': profile.company_name,
          'short_bio': profile.short_bio,
          'country' : profile.country
        })
      }
      catch(e){
        await this.setState({
          'gender' : 'Male',
       })
    }
  }
  //set gender picker
  setGenderPicker = (newValue) => {
    this.setState({
      gender: newValue,
      isValidGender: true
    });
    this.closeGenderModal();
  }

  handleGender = () => {
    this.toggleGenderModal(true);
  };

  toggleGenderModal = (visible) => {
    this.setState({ modalGenderVisible : visible });
  };

  closeGenderModal = () => {
    this.toggleGenderModal(!this.state.modalGenderVisible);
  };


  handleCompanyStatus = () => {
    return this.setState(prevState => ({
      companyStatus: !prevState.companyStatus,
    }));
  }

  handleBiodataStatus = () => {
    return this.setState(prevState => ({
      biodataStatus: !prevState.biodataStatus,
    }));
  }

  handleInterestStatus = () => {
    return this.setState(prevState => ({
      interestStatus: !prevState.interestStatus,
    }));
  }
  
  handleAddMore = () => {
    alert('Alert add more');
  }

  // country modal
  selectNationality = async(country) => {
    // Get data from Countries.js  
    const countryData = await data
    try {
      //get country  name
      const countryName = await countryData.filter(
        obj => obj.name === country
      )[0].name
      // Update the state then hide the Modal
      this.setState({ 
        country : countryName,
      })
      await this.hideNationalityModal()
    }
    catch (err) {
     // console.log(err)
    }
  }
  showNationalityModal = ()=> {
    this.setState({ 
      nationalityModalVisible: true 
    })
  }
  hideNationalityModal =()=> {
    this.setState({ 
      nationalityModalVisible: false 
    })
  }


  handleCompanyChange = (company_name) => {
    this.setState({
      company_name
    }); 
  }
  handleShortBio = (short_bio) => {
    this.setState({
      short_bio
    });
   
  }
  handleAddTag = (add_tag) => {
    this.setState({
      add_tag
    });
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }


  handleNextButton =async()=> {

    const {gender, country, short_bio, company_name, interest} = this.state;
    let shortbio = short_bio.trim();

    if(isEmpty(company_name)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Valid Work Name'
      })
    }
    else if(isEmpty(short_bio)) {
      return this.setState({
        showAlert:true,
        message: 'Enter Bio data Information'
      })
    }
  
    let body = await {
     gender, country, short_bio:shortbio, company_name, interest  
    };

    this.props.setProfile(body);
    return this.props.navigation.navigate('LastPage')        
  }
  
  render () {
    const countryData = data
    const {isCompanyFocused, isShortBioFocused, title, message, 
      showAlert, showLoading, country, company_name, short_bio } = this.state;

    const pickerGender = [
      {title: 'Female', value: 'Female'},
      {title: 'Male', value: 'Male'},
    ];

   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default"/>
      <View style = {styles.navBar}>
        <TouchableOpacity
          style = {styles.headerImage}
          onPress={()=>this.props.navigation.goBack()}
          >
          <Image
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text={'BIO'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>      
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior = 'padding'> 
          <ScrollView 
            style={{flex:1,}}
            showsVerticalScrollIndicator={false}>
              {/* Gender modal selection */}
            {/* <View style = {styles.titleView}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Gender'}
              />
              <View style = {styles.selectView}> 
                <View style={styles.pickerView}>
                  <Picker
                    style={styles.userCathegoryView}
                    selectedValue={gender}
                    onValueChange={gender => this.setState({ gender })}>
                    <Picker.Item  label="male" value="male" />
                    <Picker.Item label="female" value="female" />
                  </Picker>
                </View>
                  
                <Image
                  source = {require('../../assets/images/down_arrow.png')}
                  style = {StyleSheet.flatten(styles.downArrow)}
                />
              </View>
    
            </View> */}
            <View style = {styles.formContainer}>
                <DisplayText
                  text={'Gender *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  onPress = {this.handleGender}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtgender}>
                    <Text style = {styles.genderText}>
                      {this.state.gender}
                    </Text>
                    <Image
                      source = {require('../../assets/images/down_arrow.png')}
                      style = {StyleSheet.flatten(styles.downArrow)}
                    />
                  </View>
                </TouchableOpacity>
                
              </View>
              <Modal
              animationType="slide"
              transparent={true}
              visible = {this.state.modalGenderVisible}
              onRequestClose={() => {console.log('Request was closed')}}>
              <View style={styles.modalContainer}> 
                <View style={styles.modalStyle}>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <DisplayText
                        style={styles.textHeaderStyle}
                        text ={' Gender '} 
                        />
                        {pickerGender.map((value, index) => {
                          return <TouchableHighlight key={index} onPress={() => this.setGenderPicker(value.value)}>
                            <Text style={styles.modalTxt}>{value.title}</Text>
                          </TouchableHighlight>;
                        })
                        }                    
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
          <View style = {styles.CountryView}>
          <DisplayText
            text={'Nationality'}
            styles = {styles.formHeaderTxt}
          />
          <TouchableOpacity 
            underlayColor={colors.white}
            onPress={() => this.showNationalityModal()}
            style = {styles.textBoderNationality}>
            <View style = {styles.viewTxtNationality}>
              <Text style = {styles.inputTxt}>
                {country}
              </Text>
              <Image
                source = {require('../../assets/images/down_arrow.png')}
                style = {StyleSheet.flatten(styles.downArrow)}
              />
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={this.hideNationalityModal}
            visible={this.state.nationalityModalVisible}>
            <View style={{ flex : 1, paddingLeft : 20, paddingRight : 20}}>
              <View style={{ flex: 7, marginTop: 10 }}>
              {/* Render the list of countries */}
              <FlatList
                data={countryData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                  ({ item }) =>
                    <TouchableWithoutFeedback onPress={() => this.selectNationality(item.name)}>
                      <View style={styles.countryStyle}>
                        <Text style={styles.textStyle}>
                          {item.flag} {item.name} 
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                      }
                    />
                  </View>
                  <View style={styles.closeButtonStyle}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => this.hideNationalityModal()}>
                    <Text style={styles.textBtn}>
                      Close
                    </Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style = {[styles.nameInputView, { 
              borderBottomColor: isCompanyFocused ? colors.green
              :theme.secondaryTextColor}]}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Company'}
              />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <InputField
                placeholderTextColor = {colors.blackShade}
                textColor={theme.primaryTextColor}
                inputType={'name'}
                keyboardType={'default'}
                onChangeText = {this.handleCompanyChange}
                autoCapitalize = "words"
                height = {30}
                width = {'100%'}
                borderBottomWidth = {0}
                borderColor = {colors.white}
                defaultValue={company_name}
                editable = {true}
                returnKeyType = {"next"}
                blurOnSubmit={false}
                onFocus={()=>this.setState({isCompanyFocused:true})}
                onBlur={()=>this.setState({isCompanyFocused:false})}
                onSubmitEditing={() => { 
                  this.shortBioRef && this.shortBioRef.focus()
                }}
                /> 
                <TouchableOpacity 
                  style = {{paddingLeft : 8}}
                  onPress = {this.handleCompanyStatus}>
                <Image
                  onPress = {this.handleCompanyStatus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style = {[styles.nameInputView, { 
            borderBottomColor: isShortBioFocused ? colors.green
            :theme.secondaryTextColor}]}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Short Bio'}
              />
            <View style = {{flexDirection : 'row', width : '90%'}}>
              <TextInput
                placeholder = {'Example: A decade of experience in photography jounalism. Love creating pieces that captivate and move to action'}
                numberOfLines = {5}
                multiline={true}
                onChangeText = {this.handleShortBio}
                style={styles.textInputStyles} 
                editable={true}
                refs={(input) => { this.shortBioRef = input; }}
                defaultValue={short_bio}
                returnKeyType = {"next"}
                blurOnSubmit={false}
                onFocus={()=>this.setState({isShortBioFocused:true})}
                onBlur={()=>this.setState({isShortBioFocused:false})}
                onSubmitEditing={() => { 
                 // this.jobTitleRef && this.isShortBioFocused.focus()
                }}
                
                />
              <TouchableOpacity 
                style = {{paddingLeft : 8}}
                onPress = {this.handleBiodataStatus}>
                <Image
                  onPress = {this.handleBiodataStatus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style = {styles.interestView}>
            
            {/* <View style = {styles.interestHeader}>
              <DisplayText
                styles={StyleSheet.flatten(styles.titleText)}
                text = {'Interest'}
              />
              
              <TouchableOpacity style = {styles.interestButton} onPress = {this.handleInterestStatus}>
                <Image
                  onPress = {this.handleInterestStatus}
                  source = {require('../../assets/images/edit.png')}
                  style = {StyleSheet.flatten(styles.penIcon)}
                />
              </TouchableOpacity>
            </View> */}
            {/* <View style = {styles.tagView}>
              
            </View>
            <View style = {styles.selectedInterest}>
              <TouchableOpacity 
                onPress = {this.handleAddMore}
                style = {styles.addmoreBtn}>
                <TextInput
                  placeholder = {' +Add More '}
                  onChangeText = {this.handleAddTag}

                  onPress = {this.handleAddMore}
                  style = {StyleSheet.flatten(styles.addMore)}
                />
              </TouchableOpacity>
            </View> */}
            
          </View>
          <View style = {styles.btnViewNext}> 
            <TouchableOpacity 
              onPress = {this.handleNextButton}
              style = {styles.buttonView}>
              <DisplayText
                onPress = {this.handleNextButton}
                text={'NEXT'}
                styles = {StyleSheet.flatten(styles.txtNext)}
              />
              <Image
                onPress = {this.handleNextButton}
                source = {require('../../assets/images/foward_arrow.png')}
                style = {StyleSheet.flatten(styles.nextIcon)}
              />
            </TouchableOpacity>
          </View>
            
        </ScrollView>
      </KeyboardAvoidingView>
      <ErrorAlert
        title = {'Error!'} 
        message = {message}
        handleCloseNotification = {this.handleCloseNotification}
        visible = {showAlert}
      />
    </SafeAreaView>
    )
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return  {
    profile: state.ProfileReducer.profile

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      setProfile: (data) =>{dispatch(addProfile(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingBio)
