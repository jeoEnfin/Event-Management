import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventSmallCard from '../cards/EventSmallCard';
import { COLORS, DUMMY_DATA, TXT_SIZE } from '../../constants';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
    data?: any[];
    isWatched?: boolean;
    noDataText?: string;
}

type ItemProps = {
    id: string;
    data: any;
}

const EventCardList = ({ title, data, isWatched, noDataText }: Props) => {
    const navigation: any = useNavigation()

    const Item = ({ id, data }: ItemProps) => {
        return (
            <View style={{ width: 220 }}>
                <EventSmallCard
                    key={id}
                    url={data.expImage}
                    eventType={data.expType}
                    startDate={data.expStartDate}
                    endDate={data.expEndDate}
                    eventTitle={data.expName}
                    isWatched={isWatched}
                    isPaid={data.expIsPaid}
                    price={data.expPrice}
                    regStartDate={data.expRegistrationStartDate}
                    regEndDate={data.expRegistrationEndDate}
                    createrName={data.expCreator}
                    isRegistrationEnabled={data.expIsRegistrationEnabled}
                    onPress={() => navigation.navigate('EventDetails', { event: data.id , order: isWatched})}
                    buttonPress={() => navigation.navigate('EventDetails', { event: data.id })}
                /></View>
        )
    }

    if(data?.length === 0){
        return null;
    }

    return (
        <View style={{ marginTop: 10,marginLeft: 10 }}>
            <View style={styles.headerBody}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: TXT_SIZE.XL,
                    color: COLORS.text.main,
                    marginLeft: 10,
                    marginBottom: 5
                }}>{title}</Text>
                {!isWatched && <Text style={styles.headTxt} onPress={() => { navigation.navigate('Events') }}>View all</Text>}
            </View>
            {data ? <FlatList
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

            /> : <View style={{ height: 70, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    fontWeight: '500',
                    color: COLORS.text.default
                }}>{noDataText}</Text>
            </View>}
        </View>
    )
}

export default EventCardList

const styles = StyleSheet.create({
    headerBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        alignItems: 'center',
        marginBottom: 5
    },
    headTxt: {
        color: COLORS.secondary.main,
        fontWeight: '500',
        fontSize: 14,
        marginRight: 10
    }
})