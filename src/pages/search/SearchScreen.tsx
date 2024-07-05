import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from '../../components/common/Search'
import ScreenWrapper from '../../components/ScreenWrapper'

type Props = {}

const SearchScreen = (props: Props) => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
            <Search
                placeholder='Search'
                onChangeText={() => { }}
                value=''
            />
            </View>
        </ScreenWrapper>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10
    }
})