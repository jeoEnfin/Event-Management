import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { COLORS } from '../../../constants';

type Props = {
    roleName?: string;
    onRolePress?: () => void;
}

const Rolecard = ({
    roleName,
    onRolePress
}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onRolePress}>
            <Text style={styles.nameTxt}>{roleName}</Text>
            <Icon name='arrow-forward' size={28} color={COLORS.secondary.main} />
        </TouchableOpacity>
    )
}

export default Rolecard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: COLORS.text.main,
    },
    nameTxt: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text.main
    }
})