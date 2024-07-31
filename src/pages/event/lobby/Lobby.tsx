import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../components/ScreenWrapper'
import FloatingButton from '../../../components/FloatingButton';

type Props = {
    route: any;
}

const Lobby = ({route}: Props) => {
 const { event, varient} = route.params;
  return (
    <ScreenWrapper>
      <Text>Lobby</Text>
      <Text>{varient}</Text>
      <FloatingButton />
    </ScreenWrapper>
  )
}

export default Lobby

const styles = StyleSheet.create({})