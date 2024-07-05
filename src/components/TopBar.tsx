import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, TXT_SIZE } from '../constants'
import RoundButton from './RoundButton'
import { useNavigation } from '@react-navigation/native'


type Props = {
    title?: string;
    scanner?: boolean;
    notification?: boolean;
    onPressMenu?: () => void;
    onPressShare?: () => void;
    profile?: boolean;
    share?: boolean;
    back?: boolean;
    search?: boolean;
}

const TopBar = (props: Props) => {
    const navigation: any = useNavigation()
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS._background.primary} barStyle={'dark-content'} />
            <View style={styles.title_container}>
                {props.back && (
                    <RoundButton
                        iconName='arrow-back'
                        iconSize={26}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.background}
                        hapticFeedback={true}
                        onPress={() => { navigation.goBack() }}
                    />
                )}
                <Image
                    source={require('../assets/ci/logo.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.button_container}>
                {props.search && (
                    <RoundButton
                        iconName='search'
                        iconSize={28}
                        color={COLORS.text.main}
                        backgroundColor={COLORS._background.primary}
                        hapticFeedback={true}
                        onPress={()=>{navigation.navigate('Search')}}
                    />)}
                {props.scanner && (
                    <RoundButton
                        iconName='scan'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS._background.primary}
                        hapticFeedback={true}
                        onPress={() => { navigation.navigate('Scan') }}
                    />)}
                {props.share && (
                    <RoundButton
                        iconName='share-social'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS._background.primary}
                        hapticFeedback={true}
                        onPress={props.onPressShare}
                    />)}
                {props.notification && (
                    <RoundButton
                        iconName="notifications-outline"
                        iconSize={28}
                        color={COLORS.text.main}
                        backgroundColor={COLORS._background.primary}
                        hapticFeedback={true}
                        onPress={()=>{navigation.navigate('Notification')}}
                    />)}
                {props.profile && (
                    <RoundButton
                        imageUrl='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS._background.primary}
                        hapticFeedback={true}
                        onPress={props.onPressMenu}
                        border
                    />)}
            </View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: COLORS._background.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        width: '100%',
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: TXT_SIZE.XXL,
        color: COLORS.baseWhite,
        marginLeft: 5,
        marginBottom: 10,
        textTransform: 'capitalize'
    },
    button_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -10
    },
    logo: {
        height: 27.84,
        width: 150,
        marginLeft: 10
    }
})