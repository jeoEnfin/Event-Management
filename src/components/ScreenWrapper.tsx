import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
    children: ReactNode
}

const ScreenWrapper: React.FC<Props> = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS._background.primary} barStyle={'dark-content'} />
            {children}
        </SafeAreaView>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS._background.main,
        alignItems: 'center',
        width: '100%'
    }
})