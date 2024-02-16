import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
  bWidth: number,
  bHeight: number,
  onPress: () => void
}

const DemoBooth = (props: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={require('../assets/booths/booth1.png')}
          style={{ width: props.bWidth, height: props.bHeight }} />
      </TouchableOpacity>
    </View>
  )
}

export default DemoBooth

const styles = StyleSheet.create({})