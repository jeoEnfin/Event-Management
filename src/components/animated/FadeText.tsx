import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

type Props = {
    isVisible: boolean;
    text: string;
}

export const FadeText = ({ isVisible, text }:Props) => {
    const opacity = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      if (isVisible) {
        fadeIn();
      } else {
        fadeOut();
      }
    }, [isVisible]);
  
    const fadeIn = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500, // Fade-in duration in milliseconds
        useNativeDriver: true,
      }).start();
    };
  
    const fadeOut = () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500, // Fade-out duration in milliseconds
        useNativeDriver: true,
      }).start();
    };
  
    return (
      <Animated.Text style={[styles.text, { opacity }]}>
        {text}
      </Animated.Text>
    );
  };
  

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold',
      },
})