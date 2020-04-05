import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  fromLeft,
  fromRight,
  fadeIn,
  zoomIn,
  zoomOut,
} from 'react-navigation-transitions';
import Home from '../screens/Home';
import Register from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import Logout from '../screens/Logout';
import Login from '../screens/Login';
import LinkExpire from '../screens/LinkExpire';
import ResetPassword from '../screens/ResetPassword';
import VerificationScreen from '../screens/Verification/VerificationScreen';
import Dashboard from '../screens/DashBoard';
import Navigations from '../screens/Navigations/Navigations';
import Settings from '../screens/Settings/Settings';
import Notification from '../screens/Notification/Notification';
import Map from '../screens/Map/Map';
import Loader from '../screens/Loader/Loader';

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  // console.log({prevScene})
  // Custom transitions go there
  if (
    prevScene &&
    prevScene.route.routeName === 'Home' &&
    nextScene.route.routeName === 'Register'
  ) {
    return zoomIn();
  }
  return fromLeft();
};

const AuthStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },

    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },

    Logout: {
      screen: Logout,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    transitionConfig: () => fromLeft(1000),
    //transitionConfig: (nav) => handleCustomTransition(nav)
  },
);

export const VerificationStack = createStackNavigator({
  VerificationScreen: {
    screen: VerificationScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export const OnBoardingStack = createStackNavigator({
  Loader: {
    screen: Loader,
    navigationOptions: {
      header: null,
    },
  },
});

export const AppStack = createStackNavigator(
  {
    Navigations: {
      screen: Navigations,
      navigationOptions: {
        header: null,
      },
    },

    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null,
      },
    },

    Map: {
      screen: Map,
      navigationOptions: {
        header: null,
      },
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
      },
    },

    Notification: {
      screen: Notification,
      navigationOptions: {
        header: null,
      },
    },
  },

  {
    transitionConfig: () => fromLeft(1000),
    //transitionConfig: (nav) => handleCustomTransition(nav)
  },
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: Home,
    Auth: AuthStack,
    Verification: VerificationStack,
    App: AppStack,
    OnBoarding: OnBoardingStack,
    // Menu:MenuStack,
  },
  {
    initialRouteName: 'AuthLoading',
    //transitionConfig: (nav) => handleCustomTransition(nav)
  },
);

export default createAppContainer(AppSwitchNavigator);
