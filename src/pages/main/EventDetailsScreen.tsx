import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import EventBanner from '../../components/common/EventBanner'
import { ExpoListingAPI } from './apis/ExpoListApi'
import ActivityElement from '../../components/common/ActivityElement'
import SubHeader from '../../components/common/SubHeader'

type Props = {
    route: any
}

const EventDetailsScreen = ({ route }: Props) => {
    const { event } = route.params;
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            setData(response?.data?.data?.expo)
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            console.log(error.response.data, 'error-------------------------')
        }
    };

    return (
        <ScreenWrapper>
            <TopBar notification profile />
            {!isLoading ?
                <>
                    {data &&
                        <>
                            <EventBanner
                                title={data.expName ? data.expName : 'demo'}
                                imgUrl={data.expImage ? data.expImage : 'demo'}
                                startDate={data.expStartDate ? data.expStartDate : 'demo'}
                                endDate={data.expEndDate ? data.expEndDate : 'demo'}
                                buttonLabel='Join'
                                subTitle={'Lucus'}
                            />
                            <SubHeader 
                                title='About'
                                message={data.expDescription}
                            />
                        </>
                    }
                </> : <ActivityElement />}
        </ScreenWrapper>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({})