import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../../../constants';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {
    children: ReactNode;
}

const AuthContainer = ({ children }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                    {children}
            </View>
        </SafeAreaView>
    )
}

export default AuthContainer

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS._background.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    body: {
        backgroundColor: COLORS.baseWhite,
        paddingHorizontal: 20,
        paddingTop: '16%',
        height: '100%',
        paddingBottom: '5%'
    },
})