import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../constants';
import HomeScreen from '../pages/main/HomeScreen';
import Notification from '../pages/notification/Notification';
import SearchScreen from '../pages/search/SearchScreen';
import EventDetailsScreen from '../pages/main/EventDetailsScreen';

const HomeStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ statusBarColor: COLORS.background, headerShown: false }}>
            <Stack.Screen name='EventHome' component={HomeScreen} />
            <Stack.Screen name="Notification" component={Notification} options={{ orientation: 'portrait', headerShown: true}} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ orientation: 'portrait', headerShown: true, headerTitle: '' }} />
            <Stack.Screen name='EventDetails' component={EventDetailsScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack

