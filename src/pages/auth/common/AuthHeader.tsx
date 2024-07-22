import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'

type Props = {
    title: string;
    subTitle?: string;
    linkButtonLabel?: string;
    isLinkButton?: boolean;
    linkButtonClick?: ()=>void;
}

const AuthHeader = (props: Props) => {
    return (
        <View style={styles.headBody}>
            <Text style={styles.headTxt}>{props.title}</Text>
            <Text style={styles.subText}>{props.subTitle} {props.isLinkButton && <Text 
            style={{color: COLORS.secondary.main, fontWeight: '500'}}
            onPress={props.linkButtonClick}>{props.linkButtonLabel}</Text>}</Text>
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    headTxt: {
        fontSize: 34,
        color: COLORS.default.dark,
        fontWeight: 'bold',
        marginBottom: 5
    },
    headBody: {
        alignItems: 'center',
        marginVertical: 17
    },
    subText: {
        fontSize: 14,
        color: COLORS.text.main
    }
})