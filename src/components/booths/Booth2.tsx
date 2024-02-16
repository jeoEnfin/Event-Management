import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React,{useEffect} from 'react'
import { COLORS } from '../../constants';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {
  onPress: () => void;
  title?: string;
  width?: any;
}

const Booth2 = (props: Props) => {

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container} >
      <Image resizeMode='contain' source={require('../../assets/booths/booth1.png')} style={{ width: screenWidth >= screenHeight ? screenWidth/7 : screenHeight/7 , height: 100,marginBottom: -15 }} />
      <Text style={styles.txt}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default Booth2

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  txt: {
    color: COLORS.baseWhite,
    fontSize: 15,
    fontWeight: '500'
  }
})