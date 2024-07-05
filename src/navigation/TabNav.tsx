import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

import Profile from '../pages/profile';
import HomeScreen from '../pages/main/HomeScreen';
import EventScreen from '../pages/main/EventScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailsScreen from '../pages/main/EventDetailsScreen';
import Notification from '../pages/notification/Notification';
import SearchScreen from '../pages/search/SearchScreen';
import HomeStack from './HomeStack';
import EventStack from './EventStack';

type Props = {}


const TabNav = (props: Props) => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.secondary.main,
        tabBarInactiveTintColor: COLORS._background.secondary,
        tabBarActiveBackgroundColor: COLORS._background.primary,
        tabBarInactiveBackgroundColor: COLORS._background.primary,
        headerShown: false,
      })
    }
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Events" component={EventStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNav

