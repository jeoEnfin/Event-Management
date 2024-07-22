import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { Icon } from 'react-native-elements';

type Props = {
    title: string;
    time: string;
    speaker: string;
    onPress?: () => void;
    onButtonPress?: () => void;
}

const ScheduleCard = ({
    title,
    time,
    speaker,
    onPress,
    onButtonPress
}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.timeTxt}>{time}</Text>
            <Text style={styles.titleTxt}>{title}</Text>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.speakerTag}>Speaker: <Text style={styles.speakerTxt}>{speaker}</Text></Text>
                <TouchableOpacity
                    onPress={onButtonPress}
                    style={{
                        backgroundColor: COLORS.secondary.main,
                        height: 28, width: 28,
                        borderRadius: 14,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Icon name='arrow-forward' size={26} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ScheduleCard

const styles = StyleSheet.create({
    container: {
        height: 118,
        width: '100%',
        borderRadius: 6,
        backgroundColor: COLORS._background.primary,
        padding: 12,
        justifyContent: 'space-between',
        elevation: 1
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
        fontSize: 12,
        color: COLORS.text.main
    },
    speakerTag: {
        fontWeight: '600',
        fontSize: 11,
        color: COLORS.text.default
    }
})