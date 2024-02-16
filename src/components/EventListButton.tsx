import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, TXT_SIZE } from '../constants'
import moment from 'moment'

type Props = {
    title?: string;
    date?: string;
    timeFrom?: string;
    timeTo?: string;
    buttonTitle?: string;
    join?: () => void;
    poster?: any;
}

const EventListButton = (props: Props) => {
    return (
        <View>
            <ImageBackground
                source={{ uri: props.poster }}
                style={styles.container}
                resizeMode='contain'>
                <View style={styles.body}>
                    <Text style={styles.headTxt}>{props.title}</Text>
                    <Text style={styles.date}>{moment(props.date).format('D MMM,YYYY')}</Text>
                </View>
                <View style={styles.subBody}>
                    <View style={styles.timeBody}>
                        <Text style={styles.time}>{moment(props.timeFrom).format('h a')} -</Text>
                        <Text style={styles.time}> {moment(props.timeTo).format('h a')}</Text></View>
                    <TouchableOpacity style={styles.btn} onPress={props.join}>
                        <Text style={styles.btnTxt}>{props.buttonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default EventListButton

const styles = StyleSheet.create({
    container: {
        height: 80,
        padding: 10,
        justifyContent: 'space-between',
        margin: 3,
        borderRadius: 5,
        backgroundColor: COLORS.background3,
        elevation: 5,
        overflow: 'hidden'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        width: '30%',
        backgroundColor: COLORS.btnBackground2,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 10
    },
    headTxt: {
        color: COLORS.baseWhite,
        fontSize: TXT_SIZE.XL,
        fontWeight: '700'
    },
    date: {
        color: COLORS.baseWhite,
        fontSize: TXT_SIZE.S,
        fontWeight: '700'
    },
    time: {
        color: COLORS.baseWhite,
        fontSize: TXT_SIZE.S,
        fontWeight: '700'
    },
    btnTxt: {
        color: COLORS.baseWhite,
        fontSize: TXT_SIZE.M,
        fontWeight: '600'
    },
    timeBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})