import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';


type Props = {
    toggleCheckBox?: boolean;
    setToggleCheckBox?: (data: any) => void;
    label?: string;
    isChecked?: boolean;
    onPress?: ()=>void;
}

const CheckboxWithLabel = (props: Props) => {
    return (
            <TouchableOpacity onPress={props.onPress} style={styles.toggleContainer}>
                <Ionicons
                    name={props.isChecked ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={props.isChecked ? COLORS.secondary.main : COLORS.default.dark}
                />
                <Text style={styles.toggleText}>{props.label}</Text>
            </TouchableOpacity>
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
    checkboxContainer: {

    }
})