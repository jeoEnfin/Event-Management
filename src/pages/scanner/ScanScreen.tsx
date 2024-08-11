import React, { Component, useEffect, useState } from 'react';

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
import QRMarker from './components/QrMarker';
import { Icon } from 'react-native-elements';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

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
    const [isFlash, setIsFlash] = useState<boolean>(false);
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    // useEffect(() => {
    //     const checkPermission = async () => {
    //         const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    //         const status = await check(permissionType);

    //         if (status === RESULTS.GRANTED) {
    //             setHasPermission(true);
    //         } else {
    //             setHasPermission(false);
    //         }
    //     };

    //     checkPermission();
    // }, []);

    // useEffect(() => {
    //     if (hasPermission === false) {
    //         requestPermission();
    //     }
    // }, [hasPermission]);

    // const requestPermission = async () => {
    //     const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    //     const status = await request(permissionType);

    //     if (status === RESULTS.GRANTED) {
    //         setHasPermission(true);
    //     } else {
    //         Alert.alert(
    //             'Permission Required',
    //             'Camera permission is required to scan QR codes.',
    //             [{ text: 'OK', onPress: () => navigation.goBack() }]
    //         );
    //         setHasPermission(false);
    //     }
    // };

    const onSuccess = (e: any) => {
        if (e.data) {
            markAttendence(e.data);
            //setIsRetake(false)   
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
        //console.log(data)
        setIsLoading(true);
        try {
            const attendance = await UserAttendenceApi({ data: data, platform: platformName })
            console.log(attendance);
            setIsAlreadyRegistered(false);
            if (attendance) {
                console.log('data', attendance?.data?.data?.user);
                setUserData(attendance?.data?.data?.user);
                setExpoData(attendance?.data?.data?.expo);
            }
            setIsModalVisible(true);
            setIsLoading(false);
        } catch (err: any) {
            if (err.response) {
                if (err?.response?.data) {
                    const message = err?.response?.data?.message
                    const _data = err?.response?.data?.data
                    console.log(message)
                    if (message == 'Attendance already marked') {
                        if (_data) {
                            setUserData(_data?.user);
                            setExpoData(_data?.expo);
                            setIsModalVisible(true);
                            setIsAlreadyRegistered(true);
                        }
                    } else {
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
                reactivateTimeout={5000}
                cameraStyle={{ height: '100%' }}
                //markerStyle={{ borderColor: COLORS.secondary.main }}
                cameraTimeout={300000}
                flashMode={isFlash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                customMarker={<QRMarker />}
                checkAndroid6Permissions={true}
            />
            {userData && <UserSuccessModal
                isModalVisible={isModalVisible}
                toggleModal={() => modalToggle()}
                userData={userData}
                eventName={expoData?.expName}
                eventStartDate={expoData?.expStartDate}
                eventEndDate={expoData?.expEndDate}
                isRegistered={isAlreadyRegistered}
            />}
            {isLoading && <ActivityElement />}
            <TouchableOpacity
                style={[styles.torchButton, isFlash && {
                    backgroundColor: COLORS.secondary.main,
                    borderColor: COLORS.secondary.main,
                }]}
                onPress={() => {
                    setIsFlash(!isFlash);
                }}>
                <Icon name={isFlash ? 'flash-on' : 'flash-off'} size={28} color={COLORS.text.primary} />
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default ScanScreen

const styles = StyleSheet.create({
    torchButton: {
        position: 'absolute',
        top: '10%',
        right: 10,
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.text.primary,
    }
});
