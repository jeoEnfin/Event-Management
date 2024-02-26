import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Booth4 from '../booths/Booth4';
import { COLORS } from '../../constants';
import Poster1 from '../poster/Poster1';
import EventWrapper from '../common/EventWrapper';


type Props = {
    boothData?: any;
    width?: any;
    audiData?: any;
    poster_url?: string;
}

const Event3 = (props: Props) => {
    const url: any = props.poster_url;
    return (
        <EventWrapper>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between' }}>
                <Image source={require('../../assets/events/eventpage3.jpg')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
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
                        main_BackgroundColor={COLORS.background3}
                        booth_textColor={COLORS.text_color}
                        audi_textColor={COLORS.text_color}
                        seperator_Color={COLORS.baseWhite}
                        audi_Data={props.audiData}
                        audi_backgroundColor='#B2022F'
                    />
                </View>
            </View>
        </EventWrapper>
    )
}

export default Event3

const styles = StyleSheet.create({
    stage: {
        width: 80,
        height: 80,
        position: 'absolute',
        left: 345,
        top: 195,
    },
    boothBody: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
})