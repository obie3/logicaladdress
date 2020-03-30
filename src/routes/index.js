import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { StatusBar } from 'react-native';
import Home from '../screens/Home';
import Register from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import Logout from '../screens/Logout';
import Login from '../screens/Login';
import LinkExpire from '../screens/LinkExpire';
import ResetPassword from '../screens/ResetPassword';
import VerificationScreen from '../screens/Verification/VerificationScreen';
import Dashboard from '../screens/DashBoard';
import LastPage from '../screens/LastPage';
import Navigations from '../screens/Navigations/Navigations';
import Settings from '../screens/Settings/Settings';
import Notification from '../screens/Notification/Notification';
import About from '../screens/About/About';
import Map from '../screens/Map/Map';

const AuthStack = createStackNavigator({
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

  ForgetPassword: {
    screen: ForgetPassword,
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

  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    },
  },
});

export const VerificationStack = createStackNavigator({
  VerificationScreen: {
    screen: VerificationScreen,
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
    mode: 'modal',
    cardStyle: { paddingTop: StatusBar.currentHeight }, //Setting the tb to go under the sb
    headerMode: 'none',
  },
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: Home,
    Auth: AuthStack,
    Verification: VerificationStack,
    App: AppStack,
    // OnBoard:OnBoardingStack,
    // Menu:MenuStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(AppSwitchNavigator);
