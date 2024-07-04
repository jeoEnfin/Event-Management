import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'

type Props = {}

const EventScreen = (props: Props) => {
  return (
   <ScreenWrapper>
    <TopBar profile notification search/>
   </ScreenWrapper>
  )
}

export default EventScreen

const styles = StyleSheet.create({})