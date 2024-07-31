import { ActivityIndicator, StyleSheet,View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

type Props = {}

const ActivityElement = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
      }}>
      <ActivityIndicator color={COLORS.secondary.main} size="large" />
    </View>
  )
}

export default ActivityElement

