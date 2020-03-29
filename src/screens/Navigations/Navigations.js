'use strict';
import React, {Component} from 'react';
import {StatusBar, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './styles';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

import { 
  createDrawerNavigator, 
  createAppContainer, 
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

//Import screen
import DashBoard from '../DashBoard/DashBoard';
import People from '../People/People';
import Logout from '../Logout/Logout';
import Sponsor from '../Sponsor/Sponsor';
import Resources from '../Resources/Resources';
import CustomSidebarMenu from './CustomSidebarMenu';

class Navigations extends Component {
  

  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  
  render(){
    return(
      <SafeAreaView style={{ flexDirection: 'row'}}>
         <StatusBar barStyle="default"/>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}> */}
          {/*Donute Button Image */}
           <Image
            source={require('../../assets/images/menu.png')}
            style={styles.imageLogo}
            onPress={this.toggleDrawer.bind(this)}
          /> 
          
      </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const DashBoard_StackNavigator = createStackNavigator({
  //All the screen from the DashBoard will be indexed here
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      header : null
    }
  },
});

const Logout_StackNavigator = createStackNavigator({
  //All the screen from the Referral will be indexed here
  Logout: {
    screen: Logout,
    navigationOptions: {
      header : null,
    }
  },
});

const DrawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen : DashBoard_StackNavigator,
    navigationOptions: {
      // drawerLabel: "DashBoard"
      header : null
    }
  },

  Logout : {
    screen : Logout_StackNavigator,
    navigationOptions: {
      drawerLabel: "Logout",
    },
    tab : {}
  },
},
{
  contentComponent : CustomSidebarMenu,
  drawerWidth : 250,
  contentOptions : {
    activeTintColor : theme.backgroundColor
  }
});
const AppDrawer = createAppContainer(DrawerNavigator);

const BottomTab = createBottomTabNavigator({
  DashBoard: {
    screen: AppDrawer,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/home.png')} 
        style={{height: 20, width: 20, tintColor: tintColor, resizeMode: 'contain' }} />      
      )
    }
  },
  
  People: {
    screen: People,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/group.png')} 
        style={{height: 20, width: 20, tintColor: tintColor, resizeMode: 'contain' }} />      
      )
    }
  },
  Resources: {
    screen: Resources,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/resources.png')} 
        style={{height: 20, width: 20, tintColor: tintColor,resizeMode: 'contain' }} />      
      )
    }
  },
  Logout: {
    screen: Sponsor,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/logout.png')} 
        style={{height: 20, width: 20, tintColor: tintColor, resizeMode: 'contain' }} />      
      )
    }
  },
},
{
  tabBarOptions: {
    activeTintColor: theme.primaryColor,
    inactiveTintColor: theme.secondaryTextColor,
    style: {
      backgroundColor: colors.white,
      borderTopWidth: 0,
      shadowOffset: {width: 5, height: 3},
      shadowColor: 'gray',
      shadowOpacity: 0.2,
      elevation: 4,
      height : 60
    }
  }
});

//const App = createAppContainer(BottomTab);
//export default App;


export default AppDrawer;
