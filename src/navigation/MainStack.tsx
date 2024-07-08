import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import TabNav from './TabNav';
import ScanScreen from '../pages/scanner/ScanScreen';
import ScanReader from '../pages/scanner/ScanReader';
import DemoEvent from '../pages/events/DemoEvent';
import BoothScreen from '../pages/booth/BoothScreen';
import Hall_1 from '../pages/halls/Hall_1';
import { COLORS } from '../constants';
import Notification from '../pages/notification/Notification';
import SearchScreen from '../pages/search/SearchScreen';


type Props = {}

const Stack = createNativeStackNavigator();

const MainStack = (props: Props) => {

    return (
        <Stack.Navigator screenOptions={{ statusBarColor: COLORS.background ,headerShown: false}}>
            <Stack.Screen name='HomeTab' component={TabNav} options={{ orientation: 'portrait' }} />
            {/* <Stack.Screen name='Scan' component={ScanScreen} options={{ orientation: 'portrait' }} />
            <Stack.Screen name='ScanReader' component={ScanReader} options={{ orientation: 'portrait' }} />
            <Stack.Screen name="Event" component={DemoEvent} options={{ orientation: 'landscape', statusBarHidden: true }} />
            <Stack.Screen name="Booth" component={BoothScreen} options={{ orientation: 'landscape', statusBarHidden: true }} />
            <Stack.Screen name="Hall_1" component={Hall_1} options={{orientation: 'portrait'}}/> */}
        </Stack.Navigator>
    )
}

export default MainStack

