import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';

type ButtonVarient = 'fill' | 'outline'

type Props = {
    label: string;
    buttonClick?: () => void;
    loading?: boolean;
    variant?: ButtonVarient;
    color?: string;
}

const Button = ({
    label,
    buttonClick,
    loading,
    variant = 'fill',
    color = COLORS.secondary.main
}: Props) => {
    return (
        <TouchableOpacity
            disabled={loading}
            style={[styles.btn , variant === 'fill' && {backgroundColor: color},{borderColor: color}]} onPress={buttonClick}>
            {!loading ? <Text style={[styles.btnTxt,variant === 'fill' && {color: COLORS.text.primary} ]}>{label}</Text> :
                <ActivityIndicator color={variant === 'fill' ? COLORS.text.primary : COLORS.secondary.main } />
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
        //borderColor: COLORS.secondary.main,
        height: 54
    },
    btnTxt: {
        color: COLORS.secondary.main,
        fontSize: 18,
        fontWeight: '500'
    },
})