import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'


type Props = {
  route: any
}

const Test2Screen = ({route}: Props) => {
  const {url} = route.params
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} />
    </View>
  )
}

export default Test2Screen

const styles = StyleSheet.create({})