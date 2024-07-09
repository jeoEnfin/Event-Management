import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

type Props = {
    isLoading: boolean;
    onRefresh: () => void;
}

const Refresh = ({isLoading,onRefresh}: Props) => {
    return (
        <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[COLORS.secondary.main]}
        />
    )
}

export default Refresh

const styles = StyleSheet.create({})