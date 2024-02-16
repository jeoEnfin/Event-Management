import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState,useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

type Props = {
    iconName?: string;
    placeholder: string;
    autoComplete: any;
    textSecure: boolean;
    showText: ()=>void;
    hideText?: ()=>void;
    inputMode?: any;
    onDataChanged?: (data: any) => void;
    keyboardType?: any;
    value?: any;
    error?: boolean;
}

const InputText = (props: Props) => {

    const [text, setText] = useState('');

    const handleTextChange = useCallback(
        (newText: string) => {
          setText(newText);
          if (props.onDataChanged) {
            props.onDataChanged(newText);
          }
        },
        [props.onDataChanged]
      );

    return (
        <View style={[styles.txtField,props.error ? {borderColor: COLORS.redButton} : {borderColor: COLORS.background }]}>
            <TextInput
                style={styles.txtFieldText}
                placeholder={props.placeholder}
                placeholderTextColor={COLORS.btnBackground}
                autoComplete={props.autoComplete}
                secureTextEntry={props.textSecure}
                inputMode={props.inputMode}
                value={props.value}
                onChangeText={handleTextChange}
                keyboardType={props.keyboardType}
            />
            {props.iconName &&
            <TouchableOpacity style={{position: 'absolute',left: '90%',opacity: props.textSecure ?  0.5 : 1}} onPressIn={props.showText} onPressOut={props.hideText}>
                <Ionicons name={props.textSecure ? 'eye-off-outline': 'eye-outline'} size={30} color={COLORS.background2} />
            </TouchableOpacity>}
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    txtField: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtFieldText: {
        color: COLORS.background,
        height: 40,
        width: '100%'
    }
})
