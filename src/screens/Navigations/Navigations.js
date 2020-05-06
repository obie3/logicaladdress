'use strict';
import React from 'react';
import colors from 'assets/colors';
import theme from 'assets/theme';
import Dashboard from '../Dashboard';
import Profile from '../Profile';
import Notification from '../Notification';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomTab = createBottomTabNavigator(
  {
    Dashboard: Dashboard,
    Profile: Profile,
    Notification: Notification,
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Dashboard':
            iconName = 'home';
            break;
          case 'Profile':
            iconName = 'person';
            break;
          case 'Notification':
            iconName = 'notifications';
            break;
        }
        return <Icon name={iconName} color={tintColor} size={hp('4%')} />;
      },
    }),

    tabBarOptions: {
      activeTintColor: colors.blue,
      inactiveTintColor: theme.secondaryTextColor,
      style: {
        backgroundColor: colors.white,
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        elevation: 4,
        height: hp('7%'),
      },
    },
  },
);

export default createAppContainer(BottomTab);
