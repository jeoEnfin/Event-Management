import React from 'react';
import { View, Text } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { COLORS } from '../constants';
import { config } from '../utils/config';
import { useNavigation } from '@react-navigation/native';

type Props = {

}

const FloatingButton = (props: Props) => {
    const navigation: any = useNavigation()
    const actions = [
        {
            icon: require('../assets/qr-code.png'),
            name: 'lobby',
            position: 1,
        },
        {
            icon: require('../assets/user.png'),
            name: 'attendees',
            position: 2,
        },
        {
            icon: require('../assets/call.png'),
            name: 'chat',
            position: 3,
        },
        {
            icon: require('../assets/customer-care.png'),
            name: 'care',
            position: 4,
        },
    ];

    const handleActionPress = (name: string) => {
        if (name === 'call') {
            // navigation.navigate('Home', {
            //     apiKey: config.API_KEY,
            //     sessionId: config.SESSION_ID,
            //     token: config.TOKEN
            // })
        } else if (name === 'profile') {
            // navigation.navigate('Profile')
        } else if (name === 'scanner') {
            // navigation.navigate('Scan')
        }
    };

    return (
        <>
            <FloatingAction
                actions={actions}
                onPressItem={(name: any) => handleActionPress(name)}
                floatingIcon={require('../assets/add.png')}
                //overrideWithAction
                color={COLORS.secondary.main}
                position="right"
            />
        </>
    );
};

export default FloatingButton;
