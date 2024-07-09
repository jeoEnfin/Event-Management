import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventSmallCard from '../cards/EventSmallCard';
import { COLORS, DUMMY_DATA, TXT_SIZE } from '../../constants';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
    data: any;
    isWatched?: boolean;
}

type ItemProps = {
    id: string;
    data: any;
}

const EventCardList = ({title,data,isWatched}: Props) => {
    const navigation: any = useNavigation()

    const Item = ({ id, data }: ItemProps) => {
        return (
            <View style={{width: 220}}>
            <EventSmallCard
                key={id}
                url={data.expImage}
                eventType={data.expType}
                startDate={data.expStartDate}
                endDate={data.expEndDate}
                eventTitle={data.expName}
                isWatched={isWatched}
                isPaid={data.expIsPaid}
                regStartDate={data.expRegistrationStartDate}
                regEndDate={data.expRegistrationEndDate}
                createrName={data.creator}
                onPress={() => navigation.navigate('EventDetails',{ event: data.id })}
                buttonPress={() => navigation.navigate('EventDetails',{ event: data.id })}
            /></View>
        )
    }

    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: TXT_SIZE.XL,
                color: COLORS.text.main,
                marginLeft: 10,
                marginBottom: 5
            }}>{title}</Text>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Item
                        key={item.id}
                        id={item.id}
                        data={item}
                    />
                }
                horizontal={true}
                keyExtractor={(item: any) => item.id}
                style={{ margin: 3 }}
                showsHorizontalScrollIndicator={false}

            />
        </View>
    )
}

export default EventCardList

const styles = StyleSheet.create({})