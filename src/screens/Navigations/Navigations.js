'use strict';
import React from 'react';
import { Image } from 'react-native';
import colors from 'assets/colors';
import theme from 'assets/theme';
import Dashboard from '../Dashboard';
import Profile from '../Profile';
import { Icons } from 'components';
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomTab = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icons
            name={'ios-home'}
            color={tintColor}
            iconSize={hp('4%')}
            iconStyle={{}}
          />
        ),
      },
    },

    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icons
            name={'md-person'}
            color={tintColor}
            iconSize={hp('4%')}
            iconStyle={{}}
          />
        ),
      },
    },

    Notification: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icons
            name={'ios-notifications'}
            color={tintColor}
            iconSize={hp('4%')}
            iconStyle={{}}
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
        height: hp('7%'),
      },
    },
  },
);

const App = createAppContainer(BottomTab);
export default App;

// export default AppDrawer;
