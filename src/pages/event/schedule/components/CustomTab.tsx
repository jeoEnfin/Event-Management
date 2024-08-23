import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { Icon } from 'react-native-elements';
import { COLORS } from '../../../../constants';


type Props = {
    position?: 'portrait' | 'landscape';
    qAndAClick?: ()=>void;
    chatClick?: ()=>void;
    pollsClick?: ()=>void;
    selected?: 'attendees' | 'chat' | 'help'
}

const CustomTab = ({
    position = 'portrait',
    qAndAClick,
    chatClick,
    pollsClick
}: Props) => {
    return (
        <View style={position === 'portrait' ? styles.containerP : styles.containerL}>
            <TouchableOpacity style={styles.iconContainer} onPress={qAndAClick}>
                <Icon name={'group'} size={26} color={COLORS.text.primary} />
                <Text style={styles.iconLabel}>Q & A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={chatClick}>
                <Icon name={'chat'} size={26} color={COLORS.text.primary} />
                <Text style={styles.iconLabel}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={pollsClick}>
                <Icon name={'ballot'} size={26} color={COLORS.text.primary} />
                <Text style={styles.iconLabel}>Polls</Text>
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
        right: 0
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