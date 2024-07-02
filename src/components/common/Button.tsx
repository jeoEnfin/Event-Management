import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';

type Props = {
    label: string;
    buttonClick: ()=>void;
}

const Button = (props: Props) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={props.buttonClick}>
            <Text style={styles.btnTxt}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: COLORS._background.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.secondary.main
    },
    btnTxt: {
        color: COLORS.secondary.main,
        fontSize: 18,
        fontWeight: '500'
    },
})