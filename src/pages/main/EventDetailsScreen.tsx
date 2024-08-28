import { Alert, BackHandler, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import EventBanner from '../../components/common/EventBanner'
import ActivityElement from '../../components/common/ActivityElement'
import SubHeader from '../../components/common/SubHeader'
import SpeakerCardList from '../../components/common/SpeakerCardList'
import AgendaList from '../../components/common/AgendaList'
import { COLORS } from '../../constants'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AddressCard from '../../components/cards/AddressCard'
import PolicesCard from '../../components/cards/PolicesCard'
import { OrderListAPI } from './apis/OrderListApi'
import { getModuleAccessRules } from '../../utils/services/aclLibrary'
import QRCodeModal from './components/QRCodeModal'
import { QrCodeAPI } from '../profile/apis/QrCodeAPI'
import AsyncStorageUtil from '../../utils/services/LocalCache'
import { ExpoDetailsAPI } from './apis/ExpoDetailsApi'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, tenant } from '../../store/actions'
import { config } from '../../utils/config'
import { isDateTimeNotPassed } from '../../utils/common'
import { showToast } from '../../store/toast/ToastActions'




type Props = {
    route: any
}

const EventDetailsScreen = ({ route }: Props) => {
    const { event, tenantId } = route.params;
    const navigation: any = useNavigation();
    const paymentState = useSelector((state: any) => state.payment.value);
    const [data, setData] = useState<any>();
    const [speakers, setSpeakers] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [schedule, setSchedule] = useState<any>([]);
    const [isOrder, setIsOrder] = useState<boolean>(false);
    const [order, setOrder] = useState<any>([]);
    const [userRules, setUserRules] = useState<any>(null);
    const [isScanner, setIsScanner] = useState<boolean>(false)
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [orderQrCode, setOrderQrCode] = useState<any>(null);
    const dispatch: any = useDispatch();
    const [isTenant, setIsTenant] = useState<boolean>(false);
    const [isQrCodeView, setIsQrCodeView] = useState<boolean>(false);
    const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        if (data) {
            getTokenCheck();
        }
    }, [data])

    useEffect(() => {
        if (tenantId) {
            isTenantCheck();
        }
    }, [tenantId])

    useEffect(() => {
        onRefresh();
    }, [paymentState])

    const backAction = () => {
        if (navigation.isFocused()) {
            backHandle();
            return true;
        };
    }

    useFocusEffect(
       useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );

            return () => {
                backHandler.remove();
            };
        }, [])
    );

    useEffect(() => {
        const init = async () => {
            const token = await AsyncStorageUtil.getData('token');
            if (token && isTenant) {
                const userRules: any = await getModuleAccessRules('expo');
                setUserRules(userRules?.access);
            }
        }
        init();
    }, [isTenant]);

    useEffect(() => {
        if (userRules && isTenant) {
            if (isTenant) {
                setIsOrder(true);
                setIsScanner(userRules?.qrScanner?.permission);
                setIsQrCodeView(false);
            }
        }
    }, [userRules, isTenant])

    useEffect(() => {
        if (event && tenantId) {
            fetchData();
        }
    }, [event])

    useEffect(() => {
        if (data && order) {
            if (order.length !== 0) {
                setIsOrder(true);
                if (!isTenant) {
                    getQrCode();
                    setIsQrCodeView(true);
                }
            }
        }
    }, [data, order])

    const backHandle = async () => {
        if (route.name === 'EventDetails') {
            await AsyncStorageUtil.saveData('tenant_id', config.DEFAULT_TENANT);
            navigation.goBack();
        } else {
            navigation.goBack();
        }
    }

    const getTokenCheck = async () => {
        const token = await AsyncStorageUtil.getData('token');
        if (token) {
            orderdetails();
        }
    }

    const isTenantCheck = async () => {
        const _tenantId = await AsyncStorageUtil.getData('user_tenant_id');
        if (_tenantId === tenantId) {
            setIsTenant(true);
        } else {
            setIsTenant(false);
        }
    }

    const getQrCode = async () => {
        const _userData = await AsyncStorageUtil.getData('userData');
        if (_userData) {
            const _data = {
                epUserId: _userData.uuid,
                epExpoId: data.id,
                attType: data.expType
            }
            try {
                const qrCode = await QrCodeAPI({ data: _data });
                if (qrCode) {
                    setOrderQrCode(qrCode.data);
                }
            } catch (err: any) {
                console.log(err.response.data, 'error')
            }
        }
    };

    const orderdetails = async () => {
        if(!data?.id && !tenantId) return ;
        setIsOrderLoading(true);
        try {
            const order = await OrderListAPI({ expId: data?.id, tenantId });
            if (order) {
                setOrder(order?.data?.data?.data);
            }
            setIsOrderLoading(false);
        } catch (err: any) {
            console.log(err.response, 'order error')
            setIsOrderLoading(false);
            throw err;
        }
    }

    const checkExpoIdInOrders = (expoId: any, orders: any) => {
        if (!Array.isArray(orders)) {
            throw new Error('Orders data should be an array');
        }
        return orders.some(order => {
            try {
                const itemDetails = JSON.parse(order.eoItemDetails);
                return itemDetails.expId === expoId;
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
            const response = await ExpoDetailsAPI({ url, tenant: tenantId });
            const _data = response?.data?.data;
            setData(_data?.expo)
            setSpeakers(_data?.speakers)
            setSchedule(_data?.schedules)
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            console.log(error.response.data, 'error---')
            //dispatch(showToast('Something went wrong', 'error'));
        }
    };

    const onRefresh = async () => {
        await AsyncStorageUtil.saveData('tenant_id', tenantId);
        if (event) {
            fetchData();
            if (!isTenant) {
                orderdetails();
            }
        }
    };

    const handleJoin = async () => {
        const token = await AsyncStorageUtil.getData('token');
        const eventData = {
            id: data.id,
            expName: data.expName,
            expPrice: data.expPrice,
            expStartDate: data.expStartDate,
            expEndDate: data.expEndDate
        }

        if (token) {
            if (data.expIsRegistrationEnabled) {
                navigation.navigate('Registration', { event: data, tenantId })
            } else {
                Alert.alert('Registration Closed', 'The registration for this event has temperory closed.', [
                    { text: 'OK' },
                ]);
            }
        } else {
            Alert.alert('Login Required', 'Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => { dispatch(Logout()) },
                }
            ]);
            return;
        }

    };

    const handleJoinExpo = async () => {
        //    let dateValid = isDateInFuture(data.expStartDate);
        const token = await AsyncStorageUtil.getData('token');
        if (token) {
            if (isOrder) {
                if (isTenant) {
                    navigation.navigate('Lobby', { event: data.id, varient: data.expType, tenantId });
                } else {
                    if (!isDateTimeNotPassed(data.expStartDate)) {
                        navigation.navigate('Lobby', { event: data.id, varient: data.expType, tenantId });
                    } else {
                        dispatch(showToast('Event not started', 'alert'));
                    }
                }
            }
        } else {
            Alert.alert('Login Required', 'Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => { dispatch(Logout()) },
                }
            ]);
            return;
        }
    }

    const handleSchedule = async (_data: any) => {
        const token = await AsyncStorageUtil.getData('token');
        if (token) {
            if (isOrder && isTenant) {
                navigation.navigate('Schedule', { data: _data, expAddress: data.expAddress, expVenue: data.expVenue })
            } else if (isOrder) {
                if (isOrder && !isDateTimeNotPassed(data.expStartDate)) {
                    navigation.navigate('Schedule', { data: _data, expAddress: data.expAddress, expVenue: data.expVenue })
                } else {
                    dispatch(showToast('Event not started', 'alert'))
                }
            } else {
                if (isDateTimeNotPassed(data.expRegistrationEndDate) && data.expIsRegistrationEnabled) {
                    dispatch(showToast('Please register the event', 'alert'))
                } else if (data.expIsRegistrationEnabled) {
                    dispatch(showToast('Event registration ended', 'error'))
                } else {
                    dispatch(showToast('Event registration closed', 'alert'))
                }

            }
        } else {
            Alert.alert('Login Required', 'Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => { dispatch(Logout()) },
                }
            ]);
            return;
        }
    }

    const ItemData = []

    if (data) {
        ItemData.push(
            <EventBanner
                title={data.expName}
                imgUrl={data.expBanerImage}
                startDate={data.expStartDate}
                endDate={data.expEndDate}
                expRegStart={data.expRegistrationStartDate}
                expRegEnd={data.expRegistrationEndDate}
                price={data.expPrice ? data.expPrice : ''}
                buttonLabel={data.expIsRegistrationEnabled ?
                    (data.expPrice ? `BUY` : 'Register')
                    : (data.expPrice ? `BUY` : 'Join')}
                subTitle={data.expCreator}
                onPressButton={handleJoin}
                isOrder={isOrder}
                qrCodePress={() => { setModalVisible(true) }}
                onPressButtonAfterOrdered={() => { handleJoinExpo() }}
                isTenant={isScanner}
                tenantId={data.expTenantId}
                isRegistration={data.expIsRegistrationEnabled}
                isQrCodeView={isQrCodeView}
                isLoading={isOrderLoading}
            />
        );
        ItemData.push(
            <SubHeader
                title='About'
                message={data.expDescription}
            />
        );
        ItemData.push(
            <AddressCard
                venue={data.expVenue}
                address={data.expAddress}
            />
        );
        ItemData.push(
            <SpeakerCardList
                title='Speakers'
                data={speakers}
                tenantId={tenantId}
            />
        );
        ItemData.push(
            <AgendaList
                startDate={data.expStartDate}
                endDate={data.expEndDate}
                schedules={schedule}
                isJoin={isOrder}
                onPress={(val) => { handleSchedule(val) }}
            />
        );
        ItemData.push(
            <PolicesCard
                title='Terms & Conditions'
                data={data.expTermsConditionIsEnabled ? data.expTermsAndConditions : ''}
            />
        );
    }

    // if(!data){
    //     return <ActivityElement />
    // }

    return (
        <ScreenWrapper>
            <TopBar
                // notification
                back
                profile
                scanner={(isScanner && isTenant) || false}
                scannerPress={() => { navigation.navigate('Scan', { eventId: data.id, tenantId }) }}
                backPress={() => { backHandle() }}
            />
            {!isLoading ?
                <View style={{ width: '100%' }}>
                    { data ?
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
                        /> : 
                        <View style={styles.nullContainer}>
                            <Text style={styles.noDataTxt}>No Data Found</Text>
                        </View>
                    }
                    {data && <QRCodeModal
                        isModalVisible={isModalVisible}
                        toggleModal={() => toggleModal()}
                        eventName={data.expName}
                        eventStartDate={data.expStartDate}
                        eventEndDate={data.expEndDate}
                        url={orderQrCode}
                    />}
                </View> : <ActivityElement />}
        </ScreenWrapper>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({
    noDataTxt: {
        color: COLORS.text.default,
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center'
    },
    nullContainer: {
        marginTop: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})