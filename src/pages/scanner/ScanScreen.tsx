import React, { Component, useState } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    Dimensions,
    View,
    Platform
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import TopBar from '../../components/TopBar';
import { Alert } from 'react-native';
import { COLORS } from '../../constants';
import UserSuccessModal from './components/UserSuccessModal';
import { UserAttendenceApi } from './apis/UserAttendenceApi';
import ActivityElement from '../../components/common/ActivityElement';
import { RNCamera } from 'react-native-camera';

const SCREEN_HEIGHT = Dimensions.get("window").height;

type Props = {}

const ScanScreen = (props: Props) => {
    const [url, setUrl] = useState('')
    const [isRetake, setIsRetake] = useState<boolean>(true);
    const navigation: any = useNavigation()
    const platformName = Platform.OS;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);
    const [expoData, setExpoData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const onSuccess = (e: any) => {
        if (e.data) {
            setIsRetake(false)
            markAttendence(e.data);
        } else {
            Alert.alert('This url not work in this app', e.data,
                [{ text: 'OK', onPress: () => { setIsRetake(true) } }],
                {
                    cancelable: false,
                });
        }
        setUrl(e.data);
    };

    const markAttendence = async (data: any) => {
        setIsLoading(true);
        try {
            const attendance = await UserAttendenceApi({ data: data, platform: platformName })
            if (attendance) {
                //console.log('data', attendance?.data?.data?.user);
                setUserData(attendance?.data?.data?.user);
                setExpoData(attendance?.data?.data?.expo);
            }
            setIsModalVisible(true);
            setIsLoading(false);
        } catch (err: any) {
            if (err.response.status !== 500) {
                if (err?.response?.data) {
                    const message = err?.response?.data?.message
                    if (message == 'Attendance already marked') {
                        Alert.alert(message, '', [
                            { text: 'OK', onPress: () => { setIsRetake(true) } }
                        ])
                    }
                } else {
                    Alert.alert('Not a valid QR Code', '', [
                        { text: 'OK', onPress: () => { setIsRetake(true) } }
                    ])
                }
            } else {
                Alert.alert('Not a valid QR Code', '', [
                    { text: 'OK', onPress: () => { setIsRetake(true) } }
                ])
            }
            setIsLoading(false);
        };

    };

    const modalToggle = () => {
        setIsModalVisible(!isModalVisible);
        setIsRetake(true);
    };


    return (
        <ScreenWrapper>
            <TopBar home back homePress={() => navigation.navigate('HomeTab')} />
            <QRCodeScanner
                onRead={onSuccess}
                showMarker={true}
                reactivate={true}
                reactivateTimeout={3000}
                cameraStyle={{ height: '100%' }}
                markerStyle={{ borderColor: COLORS.secondary.main }}
                cameraTimeout={300000}
                flashMode={RNCamera.Constants.FlashMode.auto}
            />
            {userData && <UserSuccessModal
                isModalVisible={isModalVisible}
                toggleModal={() => modalToggle()}
                userData={userData}
                eventName={expoData?.expName}
                eventStartDate={expoData?.expStartDate}
                eventEndDate={expoData?.expEndDate}
            />}
             {isLoading && <ActivityElement />}
        </ScreenWrapper>
    )
}

export default ScanScreen
