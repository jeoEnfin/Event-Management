import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomTab from '../components/CustomTab'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../../components/ScreenWrapper'

type Props = {}

const Attendees = (props: Props) => {
  const navigation: any = useNavigation();
  return (
    <View>
      <Text>Attendees</Text>
    </View>
  )
}

export default Attendees

const styles = StyleSheet.create({})