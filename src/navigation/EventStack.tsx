import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants';
import EventScreen from '../pages/main/EventScreen';
import EventDetailsScreen from '../pages/main/EventDetailsScreen';

export default function EventStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ statusBarColor: COLORS.background, headerShown: false }}>
            <Stack.Screen name='Event' component={EventScreen} />
        </Stack.Navigator>
    )
}
