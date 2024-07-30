import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import { styles } from './styles';
import ActivityElement from '../../components/common/ActivityElement';
import ProfileCard from '../profile/ProfileCard';
import { UserAttendenceApi } from './apis/UserAttendenceApi';

type Props = {
    route: any;
    navigation: any;
}

const ScanReader = ({ route, navigation }: Props) => {
    const { data, tenant } = route.params
    const platformName = Platform.OS;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (data) {
            markAttendence(data);
        }
    }, [data]);

    const markAttendence = async (data: any) => {
        setIsLoading(true);
        let _data = JSON.parse(data);
        let newField = 'attDeviceinfo'

        try {
            const attendance = await UserAttendenceApi({data: _data,platform : platformName})
            if(attendance){
                console.log('data', attendance);
            }
            setIsLoading(false);
        } catch (err:any) {
            console.log('error', err.response.data);
            setIsLoading(false);
        };

    };
    

    return (
        <ScreenWrapper>
            <TopBar scanner />
            {!isLoading ? 
            <View style={styles.container}>
              {userData && <View>
                <ProfileCard name='jeo' />
                </View>}  
            </View> : <ActivityElement />}
        </ScreenWrapper>
    )
}

export default ScanReader

