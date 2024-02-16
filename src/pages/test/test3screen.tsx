import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { COLORS } from '../../constants'

type Props = {}

const Test3screen = (props: Props) => {
  return (
    <View style={{flex: 1}}>
       <WebView style={{backgroundColor: COLORS.blackBackground}} source={{ uri: 'https://player.vimeo.com/video/891579431?h=50f91bde9b'}}/>
    </View>
  )
}

export default Test3screen

const styles = StyleSheet.create({})