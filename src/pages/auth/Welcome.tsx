import { ActivityIndicator, Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { config } from '../../utils/config';
import { COLORS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {}

const Welcome = (props: Props) => {
    const navigation: any = useNavigation()
    const [login,setLogin] = useState(false)

    useEffect(()=>{
        const token:any = AsyncStorage.getItem("token");
        if(token !== null){
            setLogin(true);
            setTimeout(()=>{
                setLogin(false);
                navigation.replace('HomeTab')
            },1000)
        }
    },[])

    return (
        <ScreenWrapper>
            <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
            <View style={{ width: screenWidth, height: screenHeight, justifyContent: 'space-between',alignItems: 'center' }}>
                <Image
                    resizeMode='cover'
                    style={{ width: screenWidth, height: screenHeight, position: 'absolute'}}
                    source={require('../../assets/ci/splash.png')} />
                <View></View>
                {!login ?<TouchableOpacity style={styles.buttonContainer} onPress={()=>{navigation.replace('Login')}}>
                    <Text style={styles.text}>Get Start</Text>
                </TouchableOpacity>:
                <ActivityIndicator size={'large'} style={{marginBottom: 15}} color={COLORS.secondary.main} />}
            </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    buttonContainer: {
        width: '90%',
        height: 54,
        backgroundColor: COLORS.secondary.main,
        marginBottom: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: COLORS.text.primary,
        fontWeight: '600',
        fontSize: 18
    }
})