import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import TabNav from './TabNav';
import ScanScreen from '../pages/scanner/ScanScreen';
import ScanReader from '../pages/scanner/ScanReader';
import HomeScreen from '../pages/homeScreen';
import TextScreen from '../pages/test/textScreen';
import Test3screen from '../pages/test/test3screen';
import DemoEvent from '../pages/events/DemoEvent';
import BoothScreen from '../pages/booth/BoothScreen';
import Test2Screen from '../pages/test/test2Screen';


type Props = {}

const Stack = createNativeStackNavigator();

const MainStack = (props: Props) => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name='HomeTab' component={TabNav} options={{ orientation: 'portrait' }} />
            <Stack.Screen name='Scan' component={ScanScreen} options={{ orientation: 'portrait' }} />
            <Stack.Screen name='ScanReader' component={ScanReader} options={{ orientation: 'portrait' }} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Test" component={TextScreen} options={{ orientation: 'landscape' }} />
            <Stack.Screen name="Test2" component={Test2Screen} options={{ orientation: 'landscape', statusBarHidden: true }} />
            <Stack.Screen name="Test3" component={Test3screen} options={{ orientation: 'landscape', statusBarHidden: true }} />
            <Stack.Screen name="Event" component={DemoEvent} options={{ orientation: 'landscape', statusBarHidden: true }} />
            <Stack.Screen name="Booth" component={BoothScreen} options={{ orientation: 'landscape', statusBarHidden: true }} />
        </Stack.Navigator>
    )
}

export default MainStack

