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
import IconWithBadge from './IconWithBadge';
import styles from './styles';

const HomeIconWithBadge = props => {
  return <IconWithBadge parentProps={props} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
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
      IconComponent = HomeIconWithBadge;
      break;
  }
  return (
    <IconComponent
      name={iconName}
      size={25}
      isFocused={focused}
      color={tintColor}
    />
  );
};

const BottomTab = createBottomTabNavigator(
  {
    Dashboard: Dashboard,
    Profile: Profile,
    Notification: Notification,
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return getTabBarIcon(navigation, focused, tintColor);
      },
    }),

    tabBarOptions: {
      activeTintColor: colors.blue,
      inactiveTintColor: theme.secondaryTextColor,
      style: styles.bottomTab,
    },
  },
);

export default createAppContainer(BottomTab);
