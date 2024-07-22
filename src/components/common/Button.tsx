import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';

type Props = {
    label: string;
    buttonClick?: ()=>void;
    loading?: boolean;
}

const Button = (props: Props) => {
    return (
        <TouchableOpacity 
        disabled={props.loading}
        style={styles.btn} onPress={props.buttonClick}>
            {!props.loading ? <Text style={styles.btnTxt}>{props.label}</Text>:
            <ActivityIndicator color={COLORS.secondary.main} />
            }
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        borderRadius: 10,
        padding: 10,
        margin: 5,
        // backgroundColor: COLORS._background.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.secondary.main,
        height: 54
    },
    btnTxt: {
        color: COLORS.secondary.main,
        fontSize: 18,
        fontWeight: '500'
    },
})