import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { COLORS } from '../constants';
import { Icon } from 'react-native-elements';

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
          let variant: any;
          if (route.name === 'Events') {
            iconName = focused ? 'list' : 'list';
            variant = 'ionicons'
          } else if (route.name === 'Registered') {
            iconName = focused ? 'app-registration' : 'app-registration';
            variant = 'material'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            variant = 'ionicons'
          }

          return <Icon name={iconName} size={size} color={color} type={variant}/>;
        },
        tabBarActiveTintColor: COLORS.secondary.main,
        tabBarInactiveTintColor: COLORS._background.secondary,
        tabBarActiveBackgroundColor: COLORS._background.primary,
        tabBarInactiveBackgroundColor: COLORS._background.primary,
        headerShown: false,
      })
    }
    >
      <Tab.Screen name="Events" component={HomeScreen} />
      <Tab.Screen name="Registered" component={EventScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNav

