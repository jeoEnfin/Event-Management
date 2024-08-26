import { Animated, Dimensions, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../../../components/ScreenWrapper'
import CustomTab from '../components/CustomTab';
import { COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { ExpoDetailsAPI } from '../apis/ExpoDetailsApi';
import { groupWithHallName } from '../helpers';
import { Icon } from 'react-native-elements';
import HallTab from '../components/HallTab';
import ScheduleListModal from '../components/ScheduleListModal';
import ScheduleCards from '../components/ScheduleCard';
import OverlayLoader from '../../../components/modals/OverlayLoader';
import AsyncStorageUtil from '../../../utils/services/LocalCache';



type Props = {
    route: any;
}

const Lobby = ({ route }: Props) => {
    const { event, varient, tenantId } = route.params;
    const navigation: any = useNavigation();
    const platformName = Platform.OS || 'android';
    const [loading, setLoading] = useState<boolean>(false);
    const [expoData, setExpoData] = useState<any>(null)
    const [schedule, setSchedule] = useState<any>([]);
    const [halls, setHalls] = useState<any[]>([]);
    const [isScheduleView, setIsScheduleView] = useState<boolean>(false);
    const fadeAnim = useRef(new Animated.Value(isScheduleView ? 1 : 0)).current;
    const [isScheduleViewData, setIsScheduleViewData] = useState<any>(null);
    const [orientation, setOrientation] = useState<any>('portrait');
    const [isTenant, setIsTenant] = useState<boolean>(false);

    useEffect(() => {
      const updateOrientation = () => {
        const { width, height } = Dimensions.get('window');
        if (width > height) {
          setOrientation('landscape');
        } else {
          setOrientation('portrait');
        }
      };
      updateOrientation();
      const subscription = Dimensions.addEventListener('change', updateOrientation);
      // Cleanup
      return () => subscription?.remove();
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isScheduleView ? 1 : 0,
            duration: 500,
            useNativeDriver: true,  // Optimizes the animation performance
        }).start();
    }, [isScheduleView, fadeAnim]);

    useEffect(() => {
        if (event) {
            getExpo();
        }
    }, [event])

    useEffect(() => {
        if (schedule) {
            const _halls = groupWithHallName(schedule);
            setHalls(_halls);
        }
    }, [schedule])

    useEffect(() => {
        if (tenantId) {
            isTenantCheck();
        }
    }, [tenantId])

    const isTenantCheck = async () => {
        const _tenantId = await AsyncStorageUtil.getData('user_tenant_id');
        if (_tenantId === tenantId) {
            setIsTenant(true);
        } else {
            setIsTenant(false);
        }
    }


    const getExpo = async () => {
        await AsyncStorageUtil.saveData('tenant_id', tenantId);
        setLoading(true);
        const url = `/${event}`
        try {
            const resp = await ExpoDetailsAPI({ url });
            if (resp) {
                const _data = resp?.data?.data;
                setExpoData(_data?.expo);
                setLoading(false);
                setSchedule(_data?.schedules);
            }
        } catch (e: any) {
            console.log('error', e)
            setLoading(false);
        }
    }

    const handleScheduleView = (data: any) => {
        setIsScheduleView(true);
        setIsScheduleViewData(data);
    }

    const handleMessageClick = async () => {
        const userData = await AsyncStorageUtil.getData('userData');
        //console.log(userData, 'userData')
        const data = {
            expName: expoData.expName,
            email: userData?.data?.email,
            show_announcement: true
        }
        navigation.navigate('Messages', { data, expId: expoData?.id });
    };

    const handleSchedulePress = async (data: any) => {
        if (data) {
            navigation.navigate('Schedule', { data, expAddress: expoData?.expAddress, expVenue: expoData?.expVenue });
        }
    };

    return (
        <ScreenWrapper>
            <StatusBar hidden={platformName === 'android' ? true : false} />
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <Image source={require('../../../assets/ci/expo/offlineLobby.png')} style={styles.background} />
                {halls && <HallTab position={orientation || 'portrait'} data={halls} onPressHall={(val) => { handleScheduleView(val) }} isSelected={isScheduleView} />}
                <CustomTab
                    attendeesClick={() => { navigation.navigate('Attendees') }}
                    chatClick={handleMessageClick}
                    helpClick={() => { navigation.navigate('Help') }}
                    position={orientation || 'portrait'} />
                {isScheduleView &&
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Animated.View style={[styles.scheduleContainer, { opacity: fadeAnim }, orientation === 'landscape' && {width: '100%', height: '100%', borderRadius: 0}]}>
                            <View style={styles.scheduleCardHeader}>
                                <Text style={styles.title}> Halls</Text>
                                <TouchableOpacity onPress={() => { setIsScheduleView(!isScheduleView) }}>
                                    <Icon name='close' size={27} color={COLORS.text.main} />
                                </TouchableOpacity>
                            </View>
                            {isScheduleViewData && <ScheduleCards
                                position={orientation || 'portrait'}
                                schedules={isScheduleViewData?.schedules}
                                hallName={isScheduleViewData?.hallName}
                                eventStartDate={expoData?.expStartDate || ''}
                                eventEndDate={expoData?.expEndDate || ''}
                                onPress={(val) => { handleSchedulePress(val) }}
                            />}
                        </Animated.View>
                    </View>}
            </View>
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
                style={[styles.backbutton, platformName === 'ios' && { top: 80 }]}>
                <Icon name={platformName === 'ios' ? 'arrow-back-ios' : 'arrow-back'} size={30} color={COLORS.text.primary} />
            </TouchableOpacity>
            <OverlayLoader visible={loading} />
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
    },
    hallTab: {
        position: 'absolute',
        bottom: 80
    },
    scheduleContainer: {
        height: '85%',
        width: '90%',
        backgroundColor: COLORS._background.primary,
        borderRadius: 10,
        overflow: 'hidden',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text.main
    },
    scheduleCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 54,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: COLORS._background.primary,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderBottomWidth: 1,
        borderBottomColor: COLORS._background.secondary
    }
})