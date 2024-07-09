import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef } from 'react'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { COLORS, TXT_SIZE } from '../constants';

type Props = {
  title: string;
  backgroundColor: string,
  hapticFeedback?: boolean,
  onPress?: () => void
}

const Button = (props: Props) => {
  
  return (
    <TouchableOpacity
      onPress={props.onPress}
     >
      <View style={[styles.container, {backgroundColor: props.backgroundColor }]}>
       <Text style={styles.txt}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    // borderWidth: 0.5,
    // borderColor: COLORS.baseWhite,
  },
  txt: {
    color: COLORS.text.main,
    fontSize: TXT_SIZE.M,
    fontWeight: '700',
  }
})