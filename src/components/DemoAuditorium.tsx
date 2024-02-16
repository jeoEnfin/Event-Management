import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

type Props = {
    bWidth: number,
    bHeight: number,
    onPress: () => void
}

const DemoAuditorium = (props: Props) => {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <Image source={require('../assets/stages/stage1.jpg')} style={{ width: props.bWidth, height: props.bHeight }} />
            </TouchableOpacity>
        </View>
    )
}

export default DemoAuditorium

const styles = StyleSheet.create({})