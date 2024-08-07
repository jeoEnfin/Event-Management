import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';

type Props = {
    title: string;
    message: string;
}

const SubHeader = ({
    title,
    message
}: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

export default SubHeader

const styles = StyleSheet.create({
    title: {
        color: COLORS.text.main,
        fontSize: 16,
        fontWeight: '600'
    },
    container: {
        gap: 10,
        marginVertical: 20
    },
    message: {
        color: COLORS.text.secondary,
        fontSize: 14,
        lineHeight: 20
    }
})