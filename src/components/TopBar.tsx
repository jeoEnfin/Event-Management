import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, TXT_SIZE } from '../constants'
import RoundButton from './RoundButton'
import { useNavigation } from '@react-navigation/native'

type Props = {
    title?: string;
    scanner?: boolean;
    menu?: boolean;
    onPressMenu?: () => void;
    onPressShare?: () => void;
    home?: boolean;
    share?: boolean;
}

const TopBar = (props: Props) => {
    const navigation: any = useNavigation()
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.btnBackground} />
            <Text style={styles.title_text}>{props.title}</Text>
            <View style={styles.button_container}>
                {props.scanner && (
                    <RoundButton
                        iconName='scan'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { navigation.navigate('Scan') }}
                    />)}
                {props.share && (
                    <RoundButton
                        iconName='share-social'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={props.onPressShare}
                    />)}
                {props.menu && (
                    <RoundButton
                        iconName='menu'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={props.onPressMenu}
                    />)}
                {props.home && (
                    <RoundButton
                        iconName='home'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { navigation.navigate('Join') }}
                    />)}
            </View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: COLORS.btnBackground,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: COLORS.baseWhite,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 10,
        width: '100%'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: TXT_SIZE.XXL,
        color: COLORS.baseWhite,
        marginLeft: 5
    },
    button_container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})