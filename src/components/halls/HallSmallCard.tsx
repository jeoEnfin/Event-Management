import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, TXT_SIZE } from '../../constants'

type Props = {
    onPress?: () => void;
    title?: string;
}

const HallSmallCard = (props: Props) => {
  return (
    <TouchableOpacity 
    onPress={props.onPress}
    style={styles.container}>
        <Text style={styles.title_txt}>{props.title?.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

export default HallSmallCard

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 160,
        backgroundColor: COLORS.background4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        elevation: 2,
        overflow: 'hidden'
    },
    title_txt: {
        color: COLORS.text_color,
        fontSize: TXT_SIZE.XXL,
        fontWeight: 'bold'
    }
})