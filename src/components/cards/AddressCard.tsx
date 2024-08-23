import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { Icon } from 'react-native-elements'

type Props = {
    address?: string;
    venue?: string;
    onTextPress?: ()=>void;
}

const AddressCard = ({ address,onTextPress,venue }: Props) => {

    if(!address){
        return null;
    }

    return (
        <View style={{ width: '100%', marginTop: 10, marginBottom: 20 }}>
            <Text style={{
                fontWeight: '600',
                fontSize: 16,
                color: COLORS.text.main,
                marginBottom: 5
            }}>Venue</Text>
            <View style={{
                flexDirection: 'row',
                marginTop: 14,
                gap: 15,
                width: '100%',
            }}>
                <Icon name='map-pin' type='feather' size={20} color={COLORS.default.dark} />
                <View style={{gap: 7,flex:1}}>
                <Text onPress={onTextPress} style={styles.addTxt}>{venue}</Text>
                <Text onPress={onTextPress} style={styles.addTxt2}>{address}</Text>
                </View>
            </View>

        </View>
    )
}

export default AddressCard

const styles = StyleSheet.create({
    addTxt: {
        color: COLORS.text.default,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        flex: 1
    },
    addTxt2: {
        color: COLORS.text.default,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        flex: 1,
    }
})