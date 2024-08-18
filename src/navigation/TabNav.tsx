import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { COLORS } from '../constants';
import { Icon } from 'react-native-elements';

import Profile from '../pages/profile';
import HomeScreen from '../pages/main/HomeScreen';
import EventScreen from '../pages/main/EventScreen';
import { Platform } from 'react-native';

type Props = {}

const TabNav = (props: Props) => {
  const platform = Platform.OS

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          let variant: any;
          let _size: any;
          if (route.name === 'Events') {
            iconName = focused ? 'list' : 'list';
            variant = 'ionicon'
            _size = 26
          } else if (route.name === 'Registered') {
            iconName = focused ? 'app-registration' : 'app-registration';
            variant = 'material'
            _size = 26
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            variant = 'ionicon'
            _size = 26
          }

          return <Icon name={iconName} size={_size} color={color} type={variant}/>;
        },
        tabBarActiveTintColor: COLORS.secondary.main,
        tabBarInactiveTintColor: COLORS._background.secondary,
        tabBarActiveBackgroundColor: COLORS._background.primary,
        tabBarInactiveBackgroundColor: COLORS._background.primary,
        headerShown: false,
        tabBarStyle: {
          height: platform === 'ios' ? 85 : 60, 
          paddingBottom: platform === 'ios' ? 30 : 10},
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600'
        }  
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

