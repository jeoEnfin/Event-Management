import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

import EventList from '../pages/events/EventList';
import Profile from '../pages/profile';
import HomeScreen from '../pages/main/HomeScreen';
import EventScreen from '../pages/main/EventScreen';

type Props = {}


const TabNav = (props: Props) => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Join') {
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
      <Tab.Screen name="Join" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNav

