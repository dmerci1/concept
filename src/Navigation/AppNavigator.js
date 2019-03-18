import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import colors from '../../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';

import SignInScreen from '../Auth/SignInScreen';
import MembersScreen from '../Members/MembersScreen';
import MembersListItem from '../Members/MembersComponents/MembersListItem';
import ProfileScreen from '../Profile/ProfileScreen'
import UserProfileScreen from '../Profile/UserProfileScreen';
import ChallengesScreen from '../Challenges/ChallengesScreen';
import MessengerScreen from '../Messenger/MessengerScreen';
import SettingsScreen from '../Settings/SettingsScreen';

const getTabBarIcon = icon => ({ tintColor}) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor}} />
);

const ContestantsScreen = createStackNavigator(
  {
    Members: {
      screen: MembersScreen,
    },
    MemberProfile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Members',
    navigationOptions: {
    tabBarIcon: getTabBarIcon('people'),
    },
  },
);


const HomeNav = createBottomTabNavigator({
  contestants: ContestantsScreen,
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: getTabBarIcon('person'),
    },
  },
  ChallengesScreen: {
    screen: ChallengesScreen,
    navigationOptions: {
      title: 'Events',
      tabBarIcon: getTabBarIcon('map'),
    },
  },
  MessengerScreen: {
    screen: MessengerScreen,
    navigationOptions: {
      title: 'Talk Shit',
      tabBarIcon: getTabBarIcon('chat'),
    },
   },
   Settings: {
     screen: SettingsScreen,
     navigationOptions: {
       title: 'Settings',
       tabBarIcon: getTabBarIcon('settings'),
     },
  },
},
{
  initialRouteName: 'ChallengesScreen',
  tabBarOptions: {
    style: {
      backgroundColor: 'black',
    },

  activeTintColor: 'yellow',
  inactiveTintColor: 'white',
},
}
);


const AppNavigator = createBottomTabNavigator({
  signIn: { screen: SignInScreen,
      navigationOptions: {
        tabBarVisible: false
        }
      },
  home: { screen: HomeNav,
      navigationOptions: {
        tabBarVisible: false
        }
      },
    }
);

export default createAppContainer(AppNavigator);
