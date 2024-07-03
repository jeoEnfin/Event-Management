import { StyleSheet, Text, TouchableOpacity, View, Animated, Image } from 'react-native'
import React, { useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { COLORS, TXT_SIZE } from '../constants';

type Props = {
  iconName?: string,
  iconSize?: number,
  color: string,
  backgroundColor: string,
  hapticFeedback: boolean,
  onPress?: () => void,
  label?: string,
  imageUrl?: string,
  border?: boolean,
}

const RoundButton = (props: Props) => {
  const scale = useRef(new Animated.Value(1)).current;

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const onPressIn = () => {
    if (props.hapticFeedback == true) {
      ReactNativeHapticFeedback.trigger("impactHeavy", options);
    }
    Animated.spring(scale, { toValue: 1.3, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };


  return (
    <TouchableOpacity
      style={{ justifyContent: 'center', alignItems: 'center' }}
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut} >
      <Animated.View style={[styles.container, { transform: [{ scale }], backgroundColor: props.backgroundColor },props.border && {borderColor: COLORS.text.main , borderWidth: 1.5}]}>
        {(props.iconName && !props.imageUrl) && <Ionicons name={props.iconName} size={props.iconSize} color={props.color} />}
        {(props.imageUrl && !props.iconName) && <Image source={{ uri: props.imageUrl }}  style={{height: '100%',width: '100%'}} resizeMode='cover'/>}
      </Animated.View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
    </TouchableOpacity>
  )
}

export default RoundButton

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 5,
    overflow: 'hidden'
  },
  label: {
    fontSize: TXT_SIZE.XS,
    color: COLORS.text_color
  }
})