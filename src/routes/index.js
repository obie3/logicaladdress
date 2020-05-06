import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { fromLeft, zoomIn } from 'react-navigation-transitions';
import Home from 'screens/Home';
import Register from 'screens/Register';
import Logout from 'screens/Logout';
import Login from 'screens/Login';
import ContactTracing from 'screens/ContactTracing';
import VerificationScreen from 'screens/Verification/VerificationScreen';
import Dashboard from 'screens/Dashboard';
import Navigations from 'screens/Navigations/Navigations';
import Settings from 'screens/Settings/Settings';
import Notification from 'screens/Notification/Notification';
import Profile from 'screens/Profile/Profile';
import Map from 'screens/Map/Map';
import Loader from 'screens/Loader/Loader';
import DocumentUpload from 'screens/DocumentUpload/DocumentUpload';
import Dialer from 'screens/Dialer/Dialer';
import SelectFields from 'screens/SelectFields/SelectFields';
import ContactLists from 'screens/ContactLists/ContactLists';
import DocumentLists from 'screens/DocumentLists/DocumentLists';
import ConnectionRequests from 'screens/ConnectionRequests/ConnectionRequests';
import LookupDetails from 'screens/LookupDetails/LookupDetails';
import RequestDetails from 'screens/RequestDetails/RequestDetails';
import PhoneVerification from 'screens/PhoneVerification/PhoneVerification';
import Permissions from 'screens/Permissions/Permissions';

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
  Register: {
    screen: Register,
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

    ContactTracing: {
      screen: ContactTracing,
      navigationOptions: {
        header: null,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },

    DocumentUpload: {
      screen: DocumentUpload,
      navigationOptions: {
        header: null,
      },
    },

    Dialer: {
      screen: Dialer,
      navigationOptions: {
        header: null,
      },
    },

    SelectFields: {
      screen: SelectFields,
      navigationOptions: {
        header: null,
      },
    },

    ContactLists: {
      screen: ContactLists,
      navigationOptions: {
        header: null,
      },
    },

    DocumentLists: {
      screen: DocumentLists,
      navigationOptions: {
        header: null,
      },
    },

    ConnectionRequests: {
      screen: ConnectionRequests,
      navigationOptions: {
        header: null,
      },
    },

    LookupDetails: {
      screen: LookupDetails,
      navigationOptions: {
        header: null,
      },
    },

    RequestDetails: {
      screen: RequestDetails,
      navigationOptions: {
        header: null,
      },
    },

    PhoneVerification: {
      screen: PhoneVerification,
      navigationOptions: {
        header: null,
      },
    },

    Permissions: {
      screen: Permissions,
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
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(AppSwitchNavigator);
