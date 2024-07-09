import { Alert, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import EventBanner from '../../components/common/EventBanner'
import { ExpoListingAPI } from './apis/ExpoListApi'
import ActivityElement from '../../components/common/ActivityElement'
import SubHeader from '../../components/common/SubHeader'
import SpeakerCardList from '../../components/common/SpeakerCardList'
import AgendaList from '../../components/common/AgendaList'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { isDateInFuture } from '../../utils/common'


type Props = {
    route: any
}

const EventDetailsScreen = ({ route }: Props) => {
    const { event } = route.params;
    const navigation: any = useNavigation();
    const [data, setData] = useState<any>();
    const [speakers, setSpeakers] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [schedule, setSchedule] = useState<any>([]);

    useEffect(() => {
        if (event) {
            fetchData();
        }
    }, [event])

    const fetchData = async () => {
        setIsLoading(true);
        const url = `/${event}`
        try {
            const response = await ExpoListingAPI({ url });
            const _data = response?.data?.data;
            setData(_data?.expo)
            setSpeakers(_data?.speakers)
            setSchedule(_data?.schedules)
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            console.log(error.response.data, 'error-------------------------')
        }
    };

    const onRefresh = async () => {
        if (event) {
            fetchData();
        }
    };

    const handleJoin = async () => {
        if (data.expExpoMode === 'Public') {
            let dateValid = isDateInFuture(data.expStartDate)
            if (dateValid) {
                Alert.alert('Event Not Started', 'The event has not started yet. Please check back later.', [
                    { text: 'OK'},
                ]);
            } else {
                navigation.navigate('OfflineLobby', { event: data.id })
            }
        }
    };

    const ItemData = []

    if (data) {
        ItemData.push(
            <EventBanner
                title={data.expName}
                imgUrl={data.expImage}
                startDate={data.expStartDate}
                endDate={data.expEndDate}
                buttonLabel='Join'
                subTitle='Lucus'
                onPressButton={handleJoin}
            />
        );
        ItemData.push(
            <SubHeader
                title='About'
                message={data.expDescription}
            />
        );
        ItemData.push(
            <SpeakerCardList
                title='Speakers'
                data={speakers}
            />
        );
        ItemData.push(
            <AgendaList
                startDate={data.expStartDate}
                endDate={data.expEndDate}
                schedules={schedule}
            />
        );
    }

    return (
        <ScreenWrapper>
            <TopBar notification profile />
            {!isLoading ?
                <View style={{ width: '100%'}}>
                    {data &&
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={ItemData}
                            renderItem={({ item }) => item}
                            keyExtractor={(_, index) => index.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={onRefresh}
                                    colors={[COLORS.secondary.main]}
                                />
                            }
                        />
                    }
                </View> : <ActivityElement />}
        </ScreenWrapper>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({})