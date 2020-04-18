'use strict';
import React from 'react';
import { Image } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
import Dashboard from '../Dashboard';
import Logout from '../Logout';
import DocumentUpload from '../DocumentUpload';
import ContactTracing from '../ContactTracing';
import CustomSidebarMenu from './CustomSidebarMenu';
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

// const Dashboard_StackNavigator = createStackNavigator({
//   Dashboard: {
//     screen: Dashboard,
//     navigationOptions: {
//       header: null,
//     },
//   },
// });

// const ContactTracing_StackNavigator = createStackNavigator({
//   ContactTracing: {
//     screen: ContactTracing,
//     navigationOptions: {
//       header: null,
//     },
//   },
// });

// const DocumentUpload_StackNavigator = createStackNavigator({
//   DocumentUpload: {
//     screen: DocumentUpload,
//     navigationOptions: {
//       header: null,
//     },
//   },
// });

// const Logout_StackNavigator = createStackNavigator({
//   Logout: {
//     screen: Logout,
//     navigationOptions: {
//       header: null,
//     },
//   },
// });

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Dashboard: Dashboard_StackNavigator,
//     DocumentUpload: DocumentUpload_StackNavigator,
//     ContactTracing: ContactTracing_StackNavigator,
//     Logout: Logout_StackNavigator,
//   },
//   {
//     contentComponent: CustomSidebarMenu,
//     drawerWidth: 250,
//     overlayColor: 'rgba(0,0,0,0.6)',
//     contentOptions: {
//       activeTintColor: colors.blue,
//       activeBackgroundColor: '#6b52ae',
//     },
//   },
// );
// const AppDrawer = createAppContainer(DrawerNavigator);

const BottomTab = createBottomTabNavigator(
  {
    DashBoard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('assets/images/home.png')}
            style={{
              height: 20,
              width: 20,
              tintColor: tintColor,
              resizeMode: 'contain',
            }}
          />
        ),
      },
    },

    Profile: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('assets/images/home.png')}
            style={{
              height: 20,
              width: 20,
              tintColor: tintColor,
              resizeMode: 'contain',
            }}
          />
        ),
      },
    },

    Notification: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('assets/images/home.png')}
            style={{
              height: 20,
              width: 20,
              tintColor: tintColor,
              resizeMode: 'contain',
            }}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: theme.primaryTextColor,
      inactiveTintColor: theme.secondaryTextColor,
      style: {
        backgroundColor: colors.white,
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        elevation: 4,
        height: 50,
      },
    },
  },
);

const App = createAppContainer(BottomTab);
export default App;

// export default AppDrawer;
