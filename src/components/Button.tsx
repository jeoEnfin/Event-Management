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
  const scale = useRef(new Animated.Value(1)).current;

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const onPressIn = () => {
    if(props.hapticFeedback==true) {
      ReactNativeHapticFeedback.trigger("impactHeavy", options);}
    Animated.spring(scale, { toValue: 1.3, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };


  return (
    <TouchableOpacity
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut} >
      <Animated.View style={[styles.container, { transform: [{ scale }], backgroundColor: props.backgroundColor }]}>
       <Text style={styles.txt}>{props.title}</Text>
      </Animated.View>
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
    borderWidth: 0.5,
    borderColor: COLORS.baseWhite,
  },
  txt: {
    color: COLORS.text_color,
    fontSize: TXT_SIZE.M,
    fontWeight: '700',
  }
})