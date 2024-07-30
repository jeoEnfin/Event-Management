import React, { Component, useState } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    Dimensions,
    View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import TopBar from '../../components/TopBar';
import { Alert } from 'react-native';
import parse from 'url-parse';
import { config } from '../../utils/config';
import { COLORS } from '../../constants';

const SCREEN_HEIGHT = Dimensions.get("window").height;

type Props = {}

const ScanScreen = (props: Props) => {
    const [url, setUrl] = useState('')
    const [isRetake, setIsRetake] = useState(false)
    const navigation: any = useNavigation()
    const onSuccess = (e: any) => {
        // console.log('e',e.data);
        if (e.data) {
            navigation.navigate('ScanReader',{data: e.data, tenant: ''})
        } else {
            Alert.alert('This url not work in this app', e.data,
                [{ text: 'OK', onPress: () => { setIsRetake(true) } }],
                {
                    cancelable: false,
                });
        }
        setUrl(e.data);
    };



    return (
        <ScreenWrapper>
            <TopBar home back homePress={()=>navigation.navigate('HomeTab')}/>
            <QRCodeScanner
                onRead={onSuccess}
                showMarker={true}
                reactivate={true}
                reactivateTimeout={1000}
                cameraStyle={{ height: '100%' }}
                markerStyle={{borderColor: COLORS.secondary.main}}
            />
        </ScreenWrapper>
    )
}

export default ScanScreen
