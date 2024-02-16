import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import Booth4 from '../booths/Booth4'
import { ResponsiveWidthComponent } from '../../utils/validations'
import Poster1 from '../poster/Poster1'

const screenWidth: any = Dimensions.get("window").width;

type Props = {
  boothData?: any;
  width?: any;
  audiData?: any;
  poster_url?: string;
}

const Event2 = (props: Props) => {
  const Width: any = ResponsiveWidthComponent(screenWidth)
  const url:any = props.poster_url;
  const navigation: any = useNavigation()
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Image source={require('../../assets/events/eventpage2.png')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <TouchableOpacity style={styles.stage} onPress={() => navigation.navigate('Test3')}></TouchableOpacity>
      <Poster1
        poster_1={url}
        poster_2={url}
        poster_3={url}
        poster_4={url}
        poster_5={url}
      />
      <View style={styles.boothBody}>
        <Booth4
          booth_Data={props.boothData}
          width={props.width}
          main_BackgroundColor={COLORS.baseWhite}
          booth_textColor={COLORS.text_color2}
          audi_textColor={COLORS.text_color}
          seperator_Color={COLORS.background2}
          audi_Data={props.audiData}
          audi_backgroundColor='#225691'
        />
      </View>
    </View>
  )
}

export default Event2

const styles = StyleSheet.create({
  stage: {
    width: 80,
    height: 80,
    //  borderWidth: 1,
    //  borderColor: COLORS.baseWhite,
    position: 'absolute',
    left: 345,
    top: 195,
  },
  booth: {
    width: 70,
    height: 80,
    // borderWidth: 1,
    // borderColor: COLORS.baseWhite,
    position: 'absolute',
    left: 135,
    top: 200,
  },
  boothBody: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})