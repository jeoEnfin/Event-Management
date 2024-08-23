import { Animated, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../../../constants'
import { breakTextIntoChunksWithTail } from '../../../utils/common'
import ScheduleListModal from './ScheduleListModal'


type Props = {
    data: any;
    onPressHall:(data:any) => void;
    isSelected?: boolean;
    position?: 'portrait' | 'landscape';
}

type hallTyps = {
    id: string;
    title: string;
    data: any
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

const HallTab = ({ data, onPressHall ,isSelected= false, position="portrait"}: Props) => {
    const [isScheduleView, setIsScheduleView] = useState<boolean>(false);
    const fadeAnim = useRef(new Animated.Value(isScheduleView ? 1 : 0)).current;
    const [selectedTab, setSelectedTab] = useState<string | null>(null);


    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isScheduleView ? 1 : 0,
            duration: 500,
            useNativeDriver: true,  // Optimizes the animation performance
        }).start();
    }, [isScheduleView, fadeAnim]);

    const handleScheduleModal = (data: any) => {
        // setIsScheduleView(true);
        setSelectedTab(data.hallid)
        if(data){
           onPressHall(data)
        }
        //console.log('data', data)
    }

    const Hall_Item = ({ id, title, data }: hallTyps) => {
        return (
            <TouchableOpacity style={styles.hall} onPress={() => { handleScheduleModal(data) }} >
                <Text style={[styles.hallName ,selectedTab === id && isSelected && {color: COLORS.secondary.main}]}>{breakTextIntoChunksWithTail(title === 'defaultLobby' ? 'Lobby' : title)}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <View style={[styles.container, position === 'landscape' && {bottom: 10}]}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <Hall_Item
                            id={item.hallid}
                            title={item.hallName}
                            data={item}
                        />
                    }
                    horizontal={true}
                    keyExtractor={item => item.hallid}
                    ItemSeparatorComponent={() =>
                        <View
                            style={{
                                height: 40,
                                width: 1,
                                marginHorizontal: 5,
                                backgroundColor: COLORS._background.secondary
                            }}>
                        </View>}
                    style={styles.body}
                />
            </View>
            {/* <ScheduleListModal isModalVisible={isScheduleView} toggleModal={() => setIsScheduleView(!isScheduleView)} /> */}
        </>
    )
}

export default HallTab

const styles = StyleSheet.create({
    container: {
        height: 54,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        left: 0,
        right: 0,
        bottom: 80
    },
    body: {
        backgroundColor: COLORS._background.primary,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',
        width: 'auto',
        height: '100%',
        maxWidth: '80%'
    },
    hall: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    hallName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text.main
    },
    scheduleContainer: {
        height: '70%',
        position: 'absolute',
        width: '100%',
        left: 0,
        right: 0,
        //bottom: 0,
 
       // flex: 1,
        backgroundColor: COLORS._background.secondary,
        borderRadius: 10,
        overflow: 'hidden',
        // justifyContent: 'center',
        // alignItems: 'center',
    }
})