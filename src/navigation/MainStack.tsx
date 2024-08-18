import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import TabNav from './TabNav';
import ScanScreen from '../pages/scanner/ScanScreen';
import ScanReader from '../pages/scanner/ScanReader';
import Hall_1 from '../pages/halls/Hall_1';
import { COLORS } from '../constants';
import Notification from '../pages/notification/Notification';
import FavouriteContacts from '../pages/profile/FavouriteContacts';
import EventDetailsScreen from '../pages/main/EventDetailsScreen';
import OfflineLobby from '../pages/main/OfflineLobby';
import Payment from '../pages/payment';
import ProfileEdit from '../pages/profile/ProfileEdit';
import Welcome from '../pages/auth/Welcome';
import ResetPassword from '../pages/profile/ResetPassword';
import PaymentSucess from '../pages/payment/PaymentSucess';
import PaymentFail from '../pages/payment/PaymentFail';
import Lobby from '../pages/event/lobby/Lobby';
import Attendees from '../pages/event/attendees';
import Messages from '../pages/event/messages';
import Help from '../pages/event/help';
import Enquiry from '../pages/enquiry';

type Props = {}

const Stack = createNativeStackNavigator();

const MainStack = (props: Props) => {

    return (
        <Stack.Navigator screenOptions={{ statusBarColor: COLORS.background ,headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='Home' component={TabNav}  />
            <Stack.Screen name='Favorites' component={FavouriteContacts} options={{headerShown: true}}/>
            <Stack.Screen name='Edit Profile' component={ProfileEdit} options={{headerShown: true}}/>
            <Stack.Screen name='EventDetails' component={EventDetailsScreen} />
            <Stack.Screen name='OfflineLobby' component={OfflineLobby} />
            <Stack.Screen name='Registration' component={Payment} options={{headerShown: true}}/>
            <Stack.Screen name='Reset Password' component={ResetPassword} options={{headerShown: true}}/>
            <Stack.Screen name='SucessPage' component={PaymentSucess} />
            <Stack.Screen name='FailPage' component={PaymentFail} />
            <Stack.Screen name='Scan' component={ScanScreen} options={{ orientation: 'portrait' }} />
            <Stack.Screen name='ScanReader' component={ScanReader} options={{ orientation: 'portrait' }} />
            <Stack.Screen name='Lobby' component={Lobby } />
            <Stack.Screen name="Notification" component={Notification} options={{ orientation: 'portrait', headerShown: true}} />
            <Stack.Screen name="Attendees" component={Attendees} options={{ orientation: 'portrait', headerShown: true}} />
            <Stack.Screen name="Messages" component={Messages} options={{ orientation: 'portrait', headerShown: true}} />
            <Stack.Screen name="Help" component={Help} options={{ orientation: 'portrait', headerShown: true}} />
            <Stack.Screen name="Talk to us" component={Enquiry} options={{ orientation: 'portrait', headerShown: true}} />
            

            {/* 
            <Stack.Screen name="Hall_1" component={Hall_1} options={{orientation: 'portrait'}}/> */}
        </Stack.Navigator>
    )
}

export default MainStack

