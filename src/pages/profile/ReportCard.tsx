import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { style } from '../../constants/styles'
import { NumberFormatter } from '../../utils/validations'

type Props = {
    events?: number;
    participant?: number;
    created?: number;
}

const ReportCard = (props: Props) => {

    return (
        <View style={styles.report_container}>
            <View style={styles.report_body}>
                <Text style={style.txt_3}>Events</Text>
                <NumberFormatter value={props.events} />
            </View>
            <View style={styles.report_body}>
                <Text style={style.txt_3}>Participant</Text>
                <NumberFormatter value={props.participant} />
            </View>
            <View style={styles.report_body}>
                <Text style={style.txt_3}>Created</Text>
                <NumberFormatter value={props.created} />
            </View>
        </View>
    )
}

export default ReportCard

