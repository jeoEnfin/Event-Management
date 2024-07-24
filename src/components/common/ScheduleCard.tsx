import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';
import { fitNamesInArea } from '../../utils/common';

type Props = {
    title: string;
    timeDuration: string;
    speaker: string;
    onPress?: () => void;
    onButtonPress?: () => void;
    startTime?: string;
    isJoin?: boolean;
}

const ScheduleCard = ({
    title,
    timeDuration,
    speaker,
    onPress,
    onButtonPress,
    startTime,
    isJoin
}: Props) => {

    const measureWidth = (text:any) => {
        // Assuming each character has a fixed width for simplicity
        const charWidth = 10;
        return text.length * charWidth;
      };

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.timeBoxText}>{startTime && format(startTime, 'hh:mm')}</Text>
                <Text style={styles.timeBoxTextSecondary}>{startTime && format(startTime, 'a')}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.timeTxt} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
                <Text style={styles.speakerTag}>Speakers: <Text style={styles.speakerTxt}>{fitNamesInArea(speaker, 150, measureWidth)}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.speakerTag}>Duration: <Text style={styles.speakerTxt}>{timeDuration}</Text></Text>
                </View>
            </View>
            {isJoin && <Text style={styles.joinTxt}>Join</Text>}
        </TouchableOpacity>
    )
}

export default ScheduleCard

const styles = StyleSheet.create({
    container: {
        height: 98,
        width: '100%',
        borderRadius: 6,
        backgroundColor: COLORS._background.primary,
        padding: 12,
        elevation: 3,
        flexDirection: 'row',
        marginVertical: 5,
    },
    timeContainer: {
        height: 74,
        width: 86,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondary.main,
        borderRadius: 6,
        elevation: 2
    },
    timeBoxText: {
        fontWeight: '600',
        fontSize: 24,
        color: COLORS.text.primary
    },
    timeBoxTextSecondary: {
        fontWeight: '600',
        fontSize: 21,
        color: COLORS.text.primary
    },
    timeTxt: {
        fontWeight: '600',
        fontSize: 14,
        color: COLORS.text.main
    },
    titleTxt: {
        fontWeight: '500',
        fontSize: 12,
        color: COLORS.text.main
    },
    speakerTxt: {
        fontWeight: '500',
        fontSize: 11,
        color: COLORS.text.main
    },
    speakerTag: {
        fontWeight: '600',
        fontSize: 10,
        color: COLORS.text.default
    },
    detailsContainer: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        flex: 1
    },
    joinTxt: {
        color: COLORS.secondary.main,
        position: 'absolute',
        right: 18,
        bottom: 10,
        fontWeight: '600'
    }
})