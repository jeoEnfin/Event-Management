import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState,useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';


type Props = {
    label?: string;
    iconName?: string;
    placeholder: string;
    autoComplete: any;
    textSecure: boolean;
    showText?: ()=>void;
    hideText?: ()=>void;
    inputMode?: any;
    onDataChanged?: (data: any) => void;
    keyboardType?: any;
    value?: any;
    error?: boolean;
    errorTxt?: string;
    defaultValue?: string;
    backgroundColor?: string;
}

const InputText = (props: Props) => {

    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

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
        <View style={styles.txtBody}>
        <View style={[styles.txtField,props.error ? {borderColor: COLORS.redButton} : {borderColor: COLORS.text.secondary }, isFocused && {borderColor: COLORS.secondary.main} ]}>
            <TextInput
                style={[styles.txtFieldText]}
                placeholder={props.placeholder}
                placeholderTextColor={COLORS.btnBackground}
                autoComplete={props.autoComplete}
                secureTextEntry={props.textSecure}
                inputMode={props.inputMode}
                value={props.value}
                onChangeText={handleTextChange}
                keyboardType={props.keyboardType}
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)}
                defaultValue={props.defaultValue}
            />
            {props.iconName &&
            <TouchableOpacity style={{position: 'absolute',left: '90%',opacity: props.textSecure ?  0.5 : 1}} onPress={props.showText} >
                <Ionicons name={props.textSecure ? 'eye-off-outline': 'eye-outline'} size={28} color={COLORS.background2} />
            </TouchableOpacity>}
        </View>
        {props.label && <Text style={[styles.label,{backgroundColor: props.backgroundColor}]}>{props.label}</Text>}
        {props.errorTxt && <Text style={styles.errorTxt}>{props.errorTxt}</Text>}
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    txtField: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtFieldText: {
        color: COLORS.default.dark,
        height: 40,
        width: '100%'
    },
    txtBody: {
        margin: 5,
    },
    errorTxt: {
        fontSize: 12,
        paddingLeft: 2,
        color: COLORS.text.error,
        fontWeight: '500',
        marginTop: 2
    },
    label: {
        fontSize: 13,
        marginBottom: 5,
        color: COLORS.text.secondary,
        fontWeight: '500',
        position: 'absolute',
        top: -11,
        left: 8,
        padding: 2
    },
})
