import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../components/ScreenWrapper'
import { add, format } from 'date-fns'
import { COLORS } from '../../../constants'
import { Icon } from 'react-native-elements'
import CountdownTimer from '../components/CountdownTimer'
import { add30Minutes, isDateNotPassed, isDateTimeNotPassed, subtract30Minutes } from '../../../utils/common'
import CustomTab from './components/CustomTab'

type Props = {
    route: any
}

const Schedule = ({ route }: Props) => {
    const { data, expAddress ,expVenue} = route.params;
    const isStarted = isDateTimeNotPassed(data.schStartDateTime);
    const isEnded = isDateTimeNotPassed(add30Minutes(data.schEndDateTime));
    return (
        <ScreenWrapper>
            <View style={{flex: 1, width: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.countdownContainer}>
                        {isEnded ? isStarted ? <><Text style={styles.countDownTxt}>Event starts in</Text>
                            <CountdownTimer endTime={data?.schStartDateTime} /></> :
                            <Text style={styles.countDownTxt}>Event Started</Text>
                            :
                            <Text style={[styles.countDownTxt, { color: COLORS.text.error }]}>Event Ended</Text>}
                    </View>
                    {data &&
                        <View>
                            <Text style={styles.headTxt}>{data.schName}</Text>
                            <View style={styles.dateContainer}>
                                <Text style={styles.dateTxt}>{format(data?.schStartDateTime, "dd MMMM, EEEE, hh:mm a")} -</Text>
                                <Text style={styles.dateTxt}>{format(data?.schEndDateTime, "hh:mm a")}</Text>
                            </View>
                        </View>}
                    {expAddress &&
                        <View style={styles.addressContainer}>
                            <Icon name='map-pin' type='feather' size={20} color={COLORS.secondary.main} />
                            <Text style={styles.addressTxt}>{expVenue}</Text>
                            <Text style={styles.addressTxt2}>{expAddress}</Text>
                        </View>}
                </View>
                {/* <CustomTab
                    // attendeesClick={() => { navigation.navigate('Attendees') }}
                    // chatClick={handleMessageClick}
                    // helpClick={() => { navigation.navigate('Help') }}
                    position='portrait' /> */}
            </View>
        </ScreenWrapper>
    )
}

export default Schedule

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18
    },
    headTxt: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 28,
        color: COLORS.text.main
    },
    dateTxt: {
        color: COLORS.text.main,
        fontSize: 16,
        fontWeight: '400',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 18
    },
    addressTxt: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 28,
        color: COLORS.text.main
    },
    addressTxt2: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 28,
        color: COLORS.text.main
    },
    addressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 38,
        marginBottom: 28,
        gap: 10
    },
    countdownContainer: {
        marginBottom: 38,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    countDownTxt: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text.main,
        //marginBottom: 10
    }
})