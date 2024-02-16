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

const Booth1 = (props: Props) => {

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container} >
      <Image resizeMode='contain' source={require('../../assets/booths/booth4.png')} style={{ width: screenWidth >= screenHeight ? screenWidth/7 : screenHeight/7 , height: 100 }} />
      <Text style={styles.txt}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default Booth1

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  txt: {
    color: COLORS.blackBackground,
    fontSize: 15,
    fontWeight: '500'
  }
})