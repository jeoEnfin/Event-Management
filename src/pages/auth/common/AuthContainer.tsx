import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../../../constants';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {
    children: ReactNode;
}

const AuthContainer = ({ children }: Props) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.body}>
                    {children}
            </View>
        </KeyboardAvoidingView>
    )
}

export default AuthContainer

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    body: {
        backgroundColor: COLORS.baseWhite,
        paddingHorizontal: 20,
        paddingTop: '20%',
        height: '100%',
        paddingBottom: '5%'
    },
})