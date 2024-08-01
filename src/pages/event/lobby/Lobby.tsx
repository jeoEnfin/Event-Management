import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../components/ScreenWrapper'
import CustomTab from '../components/CustomTab';
import { COLORS } from '../../../constants';



type Props = {
    route: any;
}

const Lobby = ({ route }: Props) => {
    const { event, varient } = route.params;
    const platformName = Platform.OS || 'android';

    return (
        <ScreenWrapper>
            <StatusBar hidden={platformName === 'android' ? true : false} />
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <Image source={require('../../../assets/ci/expo/offlineLobby.png')} style={styles.background} />
                <CustomTab position='portrait' />
            </View>
        </ScreenWrapper>
    )
}

export default Lobby

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
})