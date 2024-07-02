import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../../../constants';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {
    children: ReactNode;
}

const AuthContainer = ({ children }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {children}
            </View>
        </View>
    )
}

export default AuthContainer

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        backgroundColor: COLORS.baseWhite,
        width: screenWidth - 50,
        padding: 15,
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 15
    },
})