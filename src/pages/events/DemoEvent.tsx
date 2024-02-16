import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

const screenHeight = Dimensions.get("window").height;

//Events Screens
import Event1 from '../../components/events/Event1';
import Event2 from '../../components/events/Event2';
import Event3 from '../../components/events/Event3';

type Props = {
    route: any
}

const DemoEvent = ({ route }: Props) => {
    const { event, boothData, event_details, audiData, data,poster } = route.params
    console.log('booth', boothData)
    console.log('event', event_details)
    console.log('audiData',audiData)

    return (
        <View style={{ flex: 1 }}>
            {event == '1' && <Event1 data={data} boothData={boothData} width={screenHeight} audiData={audiData} event={event_details}/>}
            {event == '2' && <Event2 boothData={boothData} width={screenHeight} audiData={audiData} poster_url={poster}/>}
            {event == '3' && <Event3 boothData={boothData} width={screenHeight} audiData={audiData} poster_url={poster}/>}
        </View>
    )
}

export default DemoEvent

const styles = StyleSheet.create({

})