import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';


import JoinScreen from '../pages/joinScreen';
import EventList from '../pages/events/EventList';
import Profile from '../pages/profile';

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
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.btnBackground2,
        tabBarInactiveTintColor: COLORS.lightWhite,
        tabBarActiveBackgroundColor: COLORS.background,
        tabBarInactiveBackgroundColor: COLORS.background,
        headerShown: false,
      })
    }
    >
      <Tab.Screen name="Join" component={JoinScreen} />
      <Tab.Screen name="List" component={EventList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNav

