import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../../components/ScreenWrapper'
import CustomTab from '../components/CustomTab';
import { COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { ExpoDetailsAPI } from '../apis/ExpoDetailsApi';
import { groupWithHallName } from '../helpers';
import { Icon } from 'react-native-elements';



type Props = {
    route: any;
}

const Lobby = ({ route }: Props) => {
    const { event, varient } = route.params;
    const navigation: any = useNavigation();
    const platformName = Platform.OS || 'android';
    const [loading, setLoading] = useState<boolean>(false);
    const [schedule, setSchedule] = useState<any>([]);

    useEffect(() => {
        if (event) {
            getExpo();
        }
    }, [event])

    useEffect(() => {
        if (schedule) {
            const halls = groupWithHallName(schedule);
            console.log('Schedule', halls);
        }
    }, [schedule])

    const getExpo = async () => {
        setLoading(true);
        const url = `/${event}`
        try {
            const resp = await ExpoDetailsAPI({ url });
            if (resp) {
                const _data = resp?.data?.data;
                console.log(_data?.schedules, 'www')
                setLoading(false);
                setSchedule(_data?.schedules);
            }
        } catch (e: any) {
            console.log('error', e)
            setLoading(false);
        }
    }

    return (
        <ScreenWrapper>
            <StatusBar hidden={platformName === 'android' ? true : false} />
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <Image source={require('../../../assets/ci/expo/offlineLobby.png')} style={styles.background} />
                <CustomTab
                    attendeesClick={() => { navigation.navigate('Attendees') }}
                    chatClick={() => { navigation.navigate('Messages') }}
                    helpClick={() => { navigation.navigate('Help') }}
                    position='portrait' />
            </View>
            <TouchableOpacity 
            onPress={()=>{navigation.goBack()}}
            style={[styles.backbutton, platformName === 'ios' && { top: 80 }]}>
                <Icon name={platformName === 'ios' ? 'arrow-back-ios' : 'arrow-back'} size={30} color={COLORS.text.primary} />
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default Lobby

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    backbutton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 999
    }
})