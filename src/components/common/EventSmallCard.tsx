import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants'

type Props = {
    url?: string;
    onPress?: () => void;
}

const EventSmallCard = (props: Props) => {
  return (
    <TouchableOpacity 
    onPress={props.onPress}
    style={styles.container}>
        <ImageBackground 
        source={{uri: props.url}}
        style={{height: '100%', width: '100%'}}
        >
        </ImageBackground>
    </TouchableOpacity>
  )
}

export default EventSmallCard

const styles = StyleSheet.create({
    container: {
        width: 145,
        height: 220,
        backgroundColor: COLORS.btnBackground,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 2,
        elevation: 2,
        overflow: 'hidden',
    },
})