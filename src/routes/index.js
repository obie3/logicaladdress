import { createSwitchNavigator, StackNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { StatusBar,  Animated, Easing } from 'react-native';
import Home  from '../screens/Home';
import Register  from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import Logout from '../screens/Logout';
import Profile from '../screens/Profile';
import Login  from '../screens/Login';
import LinkExpire from '../screens/LinkExpire';
import ActivateEmail from '../screens/ActivateEmail';
import ResetPassword from '../screens/ResetPassword';
import VerificationScreen from '../screens/Verification/VerificationScreen';
import Dashboard from '../screens/DashBoard';
import OnboardingProfile from '../screens/OnboardingProfile';
import OnboardingBio from '../screens/OnboardingBio';
import LastPage from '../screens/LastPage';
import OnboardingSocial from '../screens/OnboardingSocial';
import AllDone from '../screens/AllDone/AllDone';
import Navigations from '../screens/Navigations/Navigations';
import Settings from '../screens/Settings/Settings';
import Notification from '../screens/Notification/Notification';
import Programs from '../screens/Programs/Programs';
import Help from '../screens/Help/Help';
import About from '../screens/About/About';
import AboutConference from '../screens/AboutConference/AboutConference';
import Venue from '../screens/Venue/Venue';
import Organisers from '../screens/Organisers/Organisers';
import Sponsor from '../screens/Sponsor/Sponsor';
import SponsorDetails from '../screens/SponsorDetails/SponsorDetails';
import MyPrograms from '../screens/MyPrograms/MyPrograms';
import ProgramDetails from '../screens/ProgramDetails/ProgramDetails';
import People from '../screens/People/People';
import PeopleMain from '../screens/PeopleMain/PeopleMain';
import Resources from '../screens/Resources/Resources';

const AuthStack = createStackNavigator({ 

  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
     navigationOptions : {
       header: null
     }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },

  ForgetPassword: {
   screen: ForgetPassword,
    navigationOptions: {
     header: null
    }
  },
  
  Logout: {
    screen: Logout,
    navigationOptions: {
      header: null,
    }
  }, 

  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    }
  },
});


export const VerificationStack = createStackNavigator({
  VerificationScreen : {
    screen : VerificationScreen,
    navigationOptions : {
      header : null,
    }
  },
})

export const AppStack = createStackNavigator({


  Navigations : {
    screen : Navigations,
    navigationOptions : {
      header : null,
    }
  },
  Dashboard : {
    screen : Dashboard,
    navigationOptions : {
      header : null,
    }
  },
    
  Settings : {
    screen : Settings,
    navigationOptions : {
      header : null,
    }
  },
  Settings : {
    screen : Settings,
    navigationOptions : {
      header : null,
    }
  },
  Notification : {
    screen : Notification,
    navigationOptions : {
      header : null,
    }
  },
  Programs : {
    screen : Programs,
    navigationOptions : {
      header : null,
    }
  },
  People : {
    screen : People,
    navigationOptions : {
      header : null,
    }
  },
  Help : {
    screen : Help,
    navigationOptions : {
      header : null,
    }
  },
  About : {
    screen : About,
    navigationOptions : {
      header : null,
    }
  },
  AboutConference : {
    screen : AboutConference,
    navigationOptions : {
      header : null,
    }
  },
  Venue : {
    screen : Venue,
    navigationOptions : {
      header : null,
    }
  },
  Organisers : {
    screen : Organisers,
    navigationOptions : {
      header : null,
    }
  },
  Sponsor :{
    screen : Sponsor,
    navigationOptions : {
      header : null
    }
  },
  SponsorDetails : {
    screen : SponsorDetails,
    navigationOptions : {
      header : null,
    },
  },
  MyPrograms : {
    screen : MyPrograms,
    navigationOptions : {
      header : null,
    }
  },
  ProgramDetails : {
    screen : ProgramDetails,
    navigationOptions : {
      header : null,
    }
  },
  People : {
    screen : People,
    navigationOptions : {
      header : null,
    }
  },
    PeopleMain : {
      screen : PeopleMain,
      navigationOptions : {
        header : null,
      }
    },
    Resources : {
      screen : Resources,
      navigationOptions : {
        header : null,
      }
    },
  },
  {
    mode: 'modal',
    cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
    headerMode: 'none'
});

// export const OnBoardingStack = createStackNavigator({ 

//   OnboardingProfile : {
//     screen : OnboardingProfile,
//     navigationOptions : {
//       header : null,
//     }
//   },
  
//   OnboardingBio: {
//     screen: OnboardingBio,
//     navigationOptions: {
//       header: null,
//     }
//   },
  
//   LastPage : {
//     screen : LastPage,
//     navigationOptions : {
//       header : null,
//     }
//   },
//   OnboardingSocial : {
//     screen : OnboardingSocial,
//     navigationOptions : {
//       header : null,
//     }
//   },
//   AllDone : {
//     screen : AllDone,
//     navigationOptions : {
//       header : null,
//     }
//   }
// },
//   {
//     mode: 'modal',
//     cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
//     headerMode: 'none',
//     transitionConfig: ()=>({
//       transitionSpec: {
//         duration: 750,
//         easing: Easing.out(Easing.poly(4)),
//         timing: Animated.timing,
//         useNativeDriver: true,
//       },
//       screenInterpolator : sceneProps => {
//         const { position, layout, scene, index, scenes } = sceneProps
  
//         const thisSceneIndex = scene.index
//         const height = layout.initHeight
//         const width = layout.initWidth
  
//         // We can access our navigation params on the scene's 'route' property
//         var thisSceneParams = scene.route.params || {}
  
//         const translateX = position.interpolate({
//           inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//           outputRange: [width, 0, 0]
//         })
  
//         const translateY = position.interpolate({
//           inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//           outputRange: [height, 0, 0]
//         })
  
//         const opacity = position.interpolate({
//           inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
//           outputRange: [0, 1, 1],
//         })
  
//         const scale = position.interpolate({
//           inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//           outputRange: [4, 1, 1]
//         })
  
//         const slideFromRight = { transform: [{ translateX }] }
//         const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
//         const slideInFromBottom = { transform: [{ translateY }] }
  
//         if (thisSceneParams.plain) return slideInFromBottom  //slideFromRight
//         else if (index < 3) return slideFromRight   //slideInFromBottom
//         else return scaleWithOpacity
//       },
//       screenInterpolator: sceneProps => {
//           const { position, layout, scene, index, scenes } = sceneProps
//           const toIndex = index
//           const thisSceneIndex = scene.index
//           const height = layout.initHeight
//           const width = layout.initWidth
    
//           const translateX = position.interpolate({
//             inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//             outputRange: [width, 0, 0]
//           })
    
//           // Since we want the card to take the same amount of time
//           // to animate downwards no matter if it's 3rd on the stack
//           // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
//           const translateY = position.interpolate({
//             inputRange: [0, thisSceneIndex],
//             outputRange: [height, 0]
//           })
    
//           const slideFromRight = { transform: [{ translateX }] }
//           const slideFromBottom = { transform: [{ translateY }] }
    
//           const lastSceneIndex = scenes[scenes.length - 1].index
    
//           // Test whether we're skipping back more than one screen
//           if (lastSceneIndex - toIndex > 1) {
//             // Do not transoform the screen being navigated to
//             if (scene.index === toIndex) return
//             // Hide all screens in between
//             if (scene.index !== lastSceneIndex) return { opacity: 0 }
//             // Slide top screen down
//             return slideFromBottom
//           }  
//           return slideFromRight
//         },
      
//     })
//   });
//   export const MenuStack = createStackNavigator({
  
//     Navigations : {
//       screen : Navigations,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     DashBoard : {
//       screen : DashBoard,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Settings : {
//       screen : Settings,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Notification : {
//       screen : Notification,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Programs : {
//       screen : Programs,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     People : {
//       screen : People,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Help : {
//       screen : Help,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     About : {
//       screen : About,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     AboutConference : {
//       screen : AboutConference,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Venue : {
//       screen : Venue,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Organisers : {
//       screen : Organisers,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Sponsor :{
//       screen : Sponsor,
//       navigationOptions : {
//         header : null
//       }
//     },
//     SponsorDetails : {
//       screen : SponsorDetails,
//       navigationOptions : {
//         header : null,
//       },
//     },
//     MyPrograms : {
//       screen : MyPrograms,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     ProgramDetails : {
//       screen : ProgramDetails,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     People : {
//       screen : People,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     PeopleMain : {
//       screen : PeopleMain,
//       navigationOptions : {
//         header : null,
//       }
//     },
//     Resources : {
//       screen : Resources,
//       navigationOptions : {
//         header : null,
//       }
//     },
//   },
//   {
//     mode: 'modal',
//     cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
//     headerMode: 'none'
//   });

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading:Home,
  Auth: AuthStack,
  Verification: VerificationStack,
  App: AppStack,
 // OnBoard:OnBoardingStack,
 // Menu:MenuStack,
},
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(AppSwitchNavigator);