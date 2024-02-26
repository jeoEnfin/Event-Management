import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { COLORS, TXT_SIZE } from '../../constants'
import HallSmallCard from './HallSmallCard'
import { useNavigation } from '@react-navigation/native'

type Props = {
    title?: string;
    data: any;
}

type ItemProps = {
    id: any;
    title: string;
    data: any;
}

const HallsCardList = (props: Props) => {

    const navigation:any = useNavigation()

    const audi_url_validator = (value:any)=>{
        if(value.audi_url === null || value.audi_url === undefined){
            Alert.alert('Its not available now !!', 'video url not available', [
                {text: 'OK',style: 'cancel'},
              ]);
        } else {
            navigation.navigate('Hall_1',{url:value.audi_url ,title:value.audi_title,data: value,halls_data: props.data})
        }
    }

    const Item = ({ id, title, data }: ItemProps) => {
        return (
            <HallSmallCard
                key={id}
                title={title} 
                onPress={()=>audi_url_validator(data)}
            />
        )
    }


    return (
        <View style={{marginTop: 10}}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: TXT_SIZE.XL,
                color: COLORS.baseWhite,
                marginLeft: 10,
                marginBottom: 5
            }}>{props.title}</Text>
            <FlatList
                data={props.data}
                renderItem={({ item }) =>
                    <Item
                        id={item.audi_id}
                        title={item.audi_title}
                        data={item}
                    />
                }
                horizontal={true}
                keyExtractor={(item: any) => item.audi_id}
                style={{ margin: 3 }}
                showsHorizontalScrollIndicator={false}

            />
        </View>
    )
}

export default HallsCardList

const styles = StyleSheet.create({})