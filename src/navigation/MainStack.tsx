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
import FavouriteContacts from '../pages/profile/FavouriteContacts';
import EditForm from '../pages/profile/EditForm';
import EventDetailsScreen from '../pages/main/EventDetailsScreen';
import OfflineLobby from '../pages/main/OfflineLobby';
import Payment from '../pages/payment';


type Props = {}

const Stack = createNativeStackNavigator();

const MainStack = (props: Props) => {

    return (
        <Stack.Navigator screenOptions={{ statusBarColor: COLORS.background ,headerShown: false}}>
            <Stack.Screen name='HomeTab' component={TabNav}  />
            <Stack.Screen name='Favorites' component={FavouriteContacts} options={{headerShown: true}}/>
            <Stack.Screen name='Profile Edit' component={EditForm} options={{headerShown: true}}/>
            <Stack.Screen name='EventDetails' component={EventDetailsScreen} />
            <Stack.Screen name='OfflineLobby' component={OfflineLobby} />
            <Stack.Screen name='payment' component={Payment} />
            {/* <Stack.Screen name='Scan' component={ScanScreen} options={{ orientation: 'portrait' }} />
            <Stack.Screen name='ScanReader' component={ScanReader} options={{ orientation: 'portrait' }} />
            <Stack.Screen name="Event" component={DemoEvent} options={{ orientation: 'landscape', statusBarHidden: true }} />
            <Stack.Screen name="Booth" component={BoothScreen} options={{ orientation: 'landscape', statusBarHidden: true }} />
            <Stack.Screen name="Hall_1" component={Hall_1} options={{orientation: 'portrait'}}/> */}
        </Stack.Navigator>
    )
}

export default MainStack

