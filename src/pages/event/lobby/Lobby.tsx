import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../components/ScreenWrapper'
import CustomTab from '../components/CustomTab';



type Props = {
    route: any;
}

const Lobby = ({ route }: Props) => {
    const { event, varient } = route.params;
    return (
        <ScreenWrapper>
            <StatusBar hidden />
            <View style={{flex: 1, width: '100%', height: '100%'}}>
                <Image source={require('../../../assets/ci/expo/offlineLobby.png')} style={styles.background} />
               
            </View>
            <CustomTab position='portrait'/>
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