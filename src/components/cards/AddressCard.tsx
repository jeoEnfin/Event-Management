import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { Icon } from 'react-native-elements'

type Props = {
    address?: string;
}

const AddressCard = ({ address }: Props) => {

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
            }}>Address</Text>
            <View style={{
                flexDirection: 'row',
                marginTop: 14,
                gap: 7,
                width: '100%',
            }}>
                <Icon name='map-pin' type='feather' size={20} color={COLORS.default.dark} />
                <Text style={styles.addTxt}>{address}</Text>
            </View>

        </View>
    )
}

export default AddressCard

const styles = StyleSheet.create({
    addTxt: {
        color: COLORS.text.default,
        fontSize: 14,
        fontWeight: '600'
    }
})