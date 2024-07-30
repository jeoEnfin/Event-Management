import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import { styles } from './styles';
import ActivityElement from '../../components/common/ActivityElement';
import ProfileCard from '../profile/ProfileCard';
import { UserAttendenceApi } from './apis/UserAttendenceApi';
import { COLORS } from '../../constants';
import Button from '../../components/common/Button';

type Props = {
    route: any;
    navigation: any;
}

const ScanReader = ({ route, navigation }: Props) => {
    const { data, tenant } = route.params
    const platformName = Platform.OS;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);
    const [expoData, setExpoData] = useState<any>(null);

    useEffect(() => {
        if (data) {
            markAttendence(data);
        }
    }, [data]);

    const markAttendence = async (data: any) => {
        setIsLoading(true);

        try {
            const attendance = await UserAttendenceApi({ data: data, platform: platformName })
            if (attendance) {
                console.log('data', attendance?.data?.data?.user);
                setUserData(attendance?.data?.data?.user);
                setExpoData(attendance?.data?.data?.expo);
            }
            setIsLoading(false);
        } catch (err: any) {
            if(err.response.status !== 500){
            if (err?.response?.data) {
                const message = err?.response?.data?.message
                if (message == 'Attendance already marked') {
                    Alert.alert(message, '',[
                        {text: 'OK', onPress: () => navigation.goBack()}
                    ])
                }
            } else {
                Alert.alert('Not a valid QR Code', '',[
                    {text: 'OK', onPress: () => navigation.goBack()}
                ])
            }} else {
                Alert.alert('Not a valid QR Code', '',[
                    {text: 'OK', onPress: () => navigation.goBack()}
                ])
            }
            setIsLoading(false);
        };

    };


    return (
        <ScreenWrapper>
            <TopBar />
            {!isLoading ?
                <View style={styles.container}>
                    {userData && <View style={styles.card}>
                        <ProfileCard
                            name={`${userData?.firstName} ${userData?.lastName}`}
                            email={userData?.email}
                            imageUrl={userData?.userImage}
                        />

                    </View>}
                    <View style={styles.button}>
                        <Button label='Scan Another' buttonClick={() => {navigation.goBack()}} />
                    </View>
                </View> : <ActivityElement />}
        </ScreenWrapper>
    )
}

export default ScanReader

