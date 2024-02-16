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
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';
import ScreenWrapper from '../../components/ScreenWrapper';
import TopBar from '../../components/TopBar';
import { Alert } from 'react-native';
import parse from 'url-parse';
import { config } from '../../utils/config';

const SCREEN_HEIGHT = Dimensions.get("window").height;

type Props = {}

const ScanScreen = (props: Props) => {
    const [url, setUrl] = useState('')
    const [isRetake, setIsRetake] = useState(false)
    const navigation: any = useNavigation()
    const onSuccess = (e: any) => {
        const Url = parse(e.data, true);
        if (config.URL_PROTOCOL === Url.protocol && config.URL_HOST === Url.host) {
            navigation.navigate('ScanReader',{url: e.data})
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
            <TopBar title='Scan QR-code' />
            <QRCodeScanner
                onRead={onSuccess}
                showMarker={true}
                reactivate={true}
                reactivateTimeout={1000}
                cameraStyle={{ height: '100%' }}
            />
        </ScreenWrapper>
    )
}

export default ScanScreen
