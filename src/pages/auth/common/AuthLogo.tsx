import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


type Props = {}

const AuthLogo = (props: Props) => {
    return (
        <View style={styles.container}>
        <Image source={require('../../../assets/ci/logo.png')}
            resizeMode='contain'
            style={{
                width: 180,
                height: 31
            }}
        />
        </View>
    )
}

export default AuthLogo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 5
    }
})