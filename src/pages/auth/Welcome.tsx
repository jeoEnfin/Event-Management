import { ActivityIndicator, Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { config } from '../../utils/config';
import { COLORS } from '../../constants';
import AsyncStorageUtil from '../../utils/services/LocalCache';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {}

const Welcome = (props: Props) => {
    const navigation: any = useNavigation()
    const [login,setLogin] = useState(false)
    const isAuth = useSelector((state: any) => state.AuthReducers.authentication);

    useEffect(()=>{
        const authCheck = async () => {
        const token:any = await AsyncStorageUtil.getData("token");
        console.log(token,'token')
        if(token !== null || isAuth){
            setLogin(true);
            setTimeout(()=>{
                setLogin(false);
                navigation.replace('Home')
            },1000)
        }}
        authCheck();
    },[])

    return (
        <View style={styles.container}>
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
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    buttonContainer: {
        width: '90%',
        height: 54,
        backgroundColor: COLORS.secondary.main,
        marginBottom: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: COLORS.text.primary,
        fontWeight: '600',
        fontSize: 18
    },
    container: {
        flex: 1,
        backgroundColor: COLORS._background.main,
        alignItems: 'center',
        width: '100%'
    }
})