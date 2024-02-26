import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Dimensions, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

type Props = {
    width: any;
    data?: any;
    booth_Data: any;
    audi_Data?: any;
    main_BackgroundColor?: string;
    booth_textColor?: string;
    booth_backgroundColor?: string;
    audi_textColor?: string;
    audi_backgroundColor?: string;
    seperator_Color: string;
}

type BoothItem_Props = {
    id: string;
    title: string;
    data: any;
}

type AudiItem_Props = {
    id: string;
    title: string;
    data: any;
}

const Booth4 = (props: Props) => {
    const [isWidth,setIsWidth] = useState<number>(screenWidth) 
    const navigation: any = useNavigation()

    useEffect(() =>{
        if(screenWidth > screenHeight){
            setIsWidth(screenWidth)
        }else {
            setIsWidth(screenHeight)
        }
    },[screenHeight,screenWidth])

    const audi_url_validator = (value:any)=>{
        if(value.audi_url === null || value.audi_url === undefined){
            Alert.alert('Its not available now !!', 'video url not available', [
                {text: 'OK',style: 'cancel'},
              ]);
        } else {
            navigation.navigate('Hall_1',{url:value.audi_url ,title:value.audi_title,data: value,halls_data: props.audi_Data})
        }
    }

    const Booth_Item = ({ id, title, data }: BoothItem_Props) => {
        return (
            <TouchableOpacity
                key={id}
                style={[styles.booth_container]}
                onPress={() => navigation.navigate('Booth', { boothData: data, width: props.width })}>
                <Text style={[styles.btn_txt, { color: props.booth_textColor }]}>{title.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    const Audi_Item = ({ id, title, data }: AudiItem_Props) => {
        return (
            <TouchableOpacity
                key={id}
                style={[styles.booth_container]}
                onPress={() => audi_url_validator(data)}>
                <Text style={[styles.btn_txt, { color: props.audi_textColor,fontWeight: '700' }]}>{title.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.main_container,{backgroundColor: props.main_BackgroundColor}]}>
            <FlatList
                data={props.booth_Data}
                renderItem={({ item }) =>
                    <Booth_Item
                        id={item.booth_id}
                        title={item.booth_name}
                        data={item}
                    />
                }
                horizontal={true}
                keyExtractor={item => item.booth_id}
                ItemSeparatorComponent={() =>
                    <View
                        style={{
                            height: 40,
                            backgroundColor: props.seperator_Color,
                            width: 1,
                            margin: 5
                        }}>
                    </View>}    
                style={{maxWidth: isWidth/2,backgroundColor: props.booth_backgroundColor}}
            />
             {props.audi_Data &&<FlatList
                data={props.audi_Data}
                renderItem={({ item }) =>
                    <Audi_Item
                        id={item.audi_id}
                        title={item.audi_title}
                        data={item}
                    />
                }
                horizontal={true}
                keyExtractor={item => item.audi_id}
                ItemSeparatorComponent={() =>
                    <View
                        style={{
                            height: 40,
                            backgroundColor: props.seperator_Color,
                            width: 1,
                            margin: 5
                        }}>
                    </View>}
                style={{maxWidth: isWidth/3,backgroundColor: props.audi_backgroundColor }}   
            />}
        </View>
    )
}

export default Booth4

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: '#3C4858',
        height: 50,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    booth_container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        padding: 5,
        borderRadius: 3,
    },
    btn_txt: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500'
    },
})