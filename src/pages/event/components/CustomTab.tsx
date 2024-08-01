import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'
import { Icon } from 'react-native-elements';


type Props = {
    position?: 'portrait' | 'landscape';
    attendeesClick?: ()=>void;
    chatClick?: ()=>void;
    helpClick?: ()=>void;
    selected?: 'attendees' | 'chat' | 'help'
}

const CustomTab = ({
    position = 'portrait',
    attendeesClick,
    chatClick,
    helpClick
}: Props) => {
    return (
        <View style={position === 'portrait' ? styles.containerP : styles.containerL}>
            <TouchableOpacity style={styles.iconContainer} onPress={attendeesClick}>
                <Icon name={'group'} size={26} color={COLORS.text.primary} />
                <Text style={styles.iconLabel}>Attendees</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={chatClick}>
                <Icon name={'chat'} size={26} color={COLORS.text.primary} />
                <Text style={styles.iconLabel}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={helpClick}>
                <Icon name={'help'} size={26} color={COLORS.text.primary} />
                <Text style={styles.iconLabel}>Help</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomTab

const styles = StyleSheet.create({
    containerP: {
        flexDirection: 'row',
        height: 54,
        backgroundColor: COLORS.secondary.main,
        position: 'absolute',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 48,
        bottom: 0
    },
    containerL: {
        flexDirection: 'column',
        height: '100%',
        backgroundColor: COLORS.secondary.main,
        position: 'absolute',
        width: 54,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 48,
        left: 0
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
    },
    iconLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.text.primary
    }
})