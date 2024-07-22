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
import AddressCard from '../../components/cards/AddressCard'
import PolicesCard from '../../components/cards/PolicesCard'
import AsyncStorageUtil from '../../utils/services/LocalCache'
import { OrderListAPI } from './apis/OrderListApi'


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
    const [isOrder, setIsOrder] = useState<boolean>(false);
    const [order, setOrder] = useState<any>([]);

    useEffect(() => {
        // const _order: any = AsyncStorageUtil.getData('MyOrders')
        // if (_order.length > 0) {
        //     setOrder(_order);
        // } else {
            orderdetails();
        // }
    }, [])

    useEffect(() => {
        if (event) {
            fetchData();
        }
    }, [event])

    useEffect(() => {
        if (data && order) {
            const _order = checkExpoIdInOrders(data.id, order)
            if(_order){
                setIsOrder(_order);
            }
        }
    }, [data, order])

    const orderdetails = async () => {
        try {
            const order = await OrderListAPI();
            if (order) {
                setOrder(order?.data?.data?.data);
            }
        } catch (err) {
            console.log(err, 'err-----')
            throw err;
        }
    }

    const checkExpoIdInOrders = (expoId:any, orders:any) => {
        if (!Array.isArray(orders)) {
            throw new Error('Orders data should be an array');
        }
        return orders.some(order => {
            try {
                const itemDetails = JSON.parse(order.eoItemDetails);
                return itemDetails.expoId === expoId;
            } catch (error) {
                console.error('Error parsing itemDetails:', error);
                return false;
            }
        });
    };

    const fetchData = async () => {
        setIsLoading(true);
        const url = `/${event}`
        try {
            const response = await ExpoListingAPI({ url });
            const _data = response?.data?.data;
            // console.log(_data,'resp---------------')
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
        // if (data.expExpoMode === 'Public') {
        //     let dateValid = isDateInFuture(data.expStartDate)
        //     if (dateValid) {
        //         Alert.alert('Event Not Started', 'The event has not started yet. Please check back later.', [
        //             { text: 'OK'},
        //         ]);
        //     } else {
        //         navigation.navigate('OfflineLobby', { event: data.id })
        //     }
        // }
        const eventData = {
            id: data.id,
            expName: data.expName,
            expPrice: data.expPrice
        }

        if (data.expIsRegistrationEnabled) {
            navigation.navigate('Registration',{ event: eventData})
        }
        // navigation.navigate('payment')
    };

    const ItemData = []

    if (data) {
        ItemData.push(
            <EventBanner
                title={data.expName}
                imgUrl={data.expImage}
                startDate={data.expStartDate}
                endDate={data.expEndDate}
                expRegEnd={data.expRegistrationEndDate}
                price={data.expPrice ? data.expPrice : ''}
                buttonLabel={data.expIsRegistrationEnabled ?
                    (data.expPrice ? `${data.expPrice} /- ` : 'Register')
                    : 'Join'}
                subTitle={data.expCreator}
                onPressButton={handleJoin}
                isOrder={isOrder}
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
        ItemData.push(
            <AddressCard
                address={data.expAddress}
            />
        );
        ItemData.push(
            <PolicesCard
                title='Terms & Conditions'
                data={data.expTermsConditionIsEnabled ? data.expTermsAndConditions : ''}
            />
        );
    }

    return (
        <ScreenWrapper>
            <TopBar notification profile />
            {!isLoading ?
                <View style={{ width: '100%' }}>
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
                            style={{
                                marginHorizontal: 18,
                                marginBottom: 70
                            }}
                        />
                    }
                </View> : <ActivityElement />}
        </ScreenWrapper>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({})