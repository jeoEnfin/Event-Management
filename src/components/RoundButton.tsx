import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

type Props = {
  iconName: string,
  iconSize: number,
  color: string,
  backgroundColor: string,
  hapticFeedback: boolean,
  onPress?: () => void
}

const RoundButton = (props: Props) => {
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
        <Ionicons name={props.iconName} size={props.iconSize} color={props.color} />
      </Animated.View>
    </TouchableOpacity>
  )
}

export default RoundButton

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 5
  }
})