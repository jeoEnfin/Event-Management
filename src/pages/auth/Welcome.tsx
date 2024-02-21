import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { config } from '../../utils/config';
import { COLORS } from '../../constants';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {}

const Welcome = (props: Props) => {
    const navigation: any = useNavigation()
    return (
        <ScreenWrapper>
            <View style={{ width: screenWidth, height: screenHeight, justifyContent: 'space-between' }}>
                <Image
                    resizeMode='cover'
                    style={{ width: screenWidth, height: screenHeight, position: 'absolute', opacity: 0.6 }}
                    source={{ uri: config.WELCOME_URL }} />
                <View></View>
                <Button
                    title='GET STARTED'
                    backgroundColor= {COLORS.background}
                    onPress={() => { navigation.replace('Login') }}
                />
            </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({})