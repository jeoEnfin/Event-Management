import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import EventListButton from '../../components/EventListButton'
import { useNavigation } from '@react-navigation/native'
import { DATA } from '../../constants/demoData'
import TopBar from '../../components/TopBar'
import ScreenWrapper from '../../components/ScreenWrapper'
import ThreeButtonTab from '../../components/ThreeButtonTab'
import FloatingButton from '../../components/FloatingButton'

const screenWidth = Dimensions.get("window").width;

type Props = {}

type ItemProps = {
    title: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    screen: string;
    booth: any;
    event: any;
    poster: any;
    audi: any;
    data: any;
}

const EventList = (props: Props) => {
    const navigation: any = useNavigation()
    const [activeTab, setActiveTab] = useState<number>(1)


    const Item = ({ title, timeFrom, date, timeTo, screen, booth, event, poster, audi,data }: ItemProps) => (
        <EventListButton
            title={title}
            date={date}
            timeFrom={timeFrom}
            timeTo={timeTo}
            join={() => {
                navigation.navigate('Event',
                    {
                        event: screen,
                        boothData: booth,
                        event_details: event,
                        audiData: audi,
                        data: data,
                        poster: poster,
                    })
            }}
            buttonTitle='Join'
            poster={poster}
        />
    );

    return (
        <ScreenWrapper>
            <TopBar title='Event List' scanner />
            <ThreeButtonTab
                title_1='Live'
                title_2='Past'
                title_3='Upcoming'
                active={(value) => { setActiveTab(value) }}
            />
            {activeTab === 1 && <View style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) =>
                        <Item
                            title={item.title}
                            date={item.date}
                            timeFrom={item.timeFrom}
                            timeTo={item.timeTo}
                            screen={item.screen}
                            booth={item.booth}
                            event={item.event}
                            poster={item.img}
                            audi={item.audi}
                            data={item}
                        />}
                    pagingEnabled
                    style={{ width: screenWidth, flex: 1 }}
                />
            </View>}
            {activeTab === 2 && <View style={styles.container}></View>}
            {activeTab === 3 && <View style={styles.container}></View>}
            <FloatingButton />
        </ScreenWrapper>
    )
}

export default EventList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    }
})