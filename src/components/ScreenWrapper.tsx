import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../constants'

type Props = {
    children: ReactNode
}

const ScreenWrapper: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.background} />
            {children}
        </View>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        width: '100%',
    }
})