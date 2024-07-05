import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationCard from '../../components/notification/NotificationCard'

type Props = {}

const Notification = (props: Props) => {
  return (
    <View>
      <NotificationCard
          title="New Message"
          message="You have received a new message."
          timestamp="Just now"
        />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})