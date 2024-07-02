import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';

type Props = {
    toggleCheckBox?: boolean;
    setToggleCheckBox?: (data: any) => void;
    label?: string;
}

const CheckboxWithLabel = (props: Props) => {
    return (
        <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>{props.label}</Text>
        </View>
    )
}

export default CheckboxWithLabel

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleText: {
        marginLeft: 8,
        color: COLORS.default.dark
    },
})