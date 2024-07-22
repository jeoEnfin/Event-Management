import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, TXT_SIZE } from '../../constants'
import SpeakerCard from '../cards/SpeakerCard';

type Props = {
    title: string;
    data: any;
}

type ItemProps = {
    id: string;
    data: any;
}


const SpeakerCardList = ({ title, data }: Props) => {

    const Item = ({ id, data }: ItemProps) => {
        return (
            <SpeakerCard
                key={id}
                avatar={data.userImage}
                firstName={data.firstName}
                lastName={data.lastName}
            />
        )
    }

    if (data.length === 0) {
        return null
    }

    return (
        <View style={{ marginTop: 12, width: '100%' }}>
            <Text style={{
                fontWeight: '600',
                fontSize: 16,
                color: COLORS.text.main,
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
                keyExtractor={(item: any) => item.title}
                style={{ margin: 3 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default SpeakerCardList

const styles = StyleSheet.create({})