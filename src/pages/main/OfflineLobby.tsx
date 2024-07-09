import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExpoListingAPI } from './apis/ExpoListApi';
import ScreenWrapper from '../../components/ScreenWrapper';
import TopBar from '../../components/TopBar';
import { getCurrentDateSchedules } from '../../utils/common';
import { COLORS } from '../../constants';
import ActivityElement from '../../components/common/ActivityElement';

type Props = {
    route: any;
}


const OfflineLobby = ({ route }: Props) => {
    const { event } = route.params;
    const [schedule, setSchedule] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hall, setHall] = useState<any[]>([]);

    useEffect(() => {
        if (event) {
            getData();
        }
    }, [event])

    useEffect(() => {
        if (schedule) {
            filterHall(schedule)
        }
    }, [schedule])

    const filterHall = (schedules: any) => {
        let _halls = getCurrentDateSchedules(schedules);
        setHall(_halls);
    }

    const getData = async () => {
        setIsLoading(true)
        let url = `/${event}`
        try {
            const response = await ExpoListingAPI({ url });
            const _data = response?.data?.data;
            setSchedule(_data?.schedules)
            setIsLoading(false);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
        }
    }

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.hallButtonBody}>
            <Text style={styles.hallButtonTxt}>{item.hallName}</Text>
        </TouchableOpacity>
    )

    if(isLoading){
        return <ActivityElement />
    }

    return (
        <ScreenWrapper>
            <TopBar notification profile />
            {hall.length !== 0 ?
                <FlatList
                    data={hall}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.hallName}
                    style={{width: '100%',padding: 5,marginTop: 10,marginBottom: 10}}
                />
                : <View style={styles.noDataBody}>
                    <Text style={styles.noDataText}>Today's schedule does not include any halls.</Text>
                </View>}
        </ScreenWrapper>
    )
}

export default OfflineLobby

const styles = StyleSheet.create({
    hallButtonBody: {
        height: 60,
        width: '100%',
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: COLORS.default.dark,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    hallButtonTxt: {
        fontSize: 22,
        color: COLORS.text.main,
        fontWeight: '700'
    },
    noDataBody: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text.default
    }

})