import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DemoAuditorium from '../DemoAuditorium'
import { useNavigation } from '@react-navigation/native'
import RoundButton from '../RoundButton'
import { COLORS } from '../../constants'
import MessagingModal from '../MessagingModal'
import Booth3 from '../booths/Booth3'
import Booth4 from '../booths/Booth4'
import { ResponsiveWidthComponent } from '../../utils/validations'

const screenWidth:any = Dimensions.get("window").width;

type Props = {
    boothData?: any;
    audiData?: any;
    width?: any;
    event?: any;
    data?: any;
}

type ItemProps = {
    id: string;
    title: string;
    data: any;
}

const Event1 = (props: Props) => {
    const navigation: any = useNavigation()
    const [messageModal, setMessageModal] = useState<boolean>(false)
    const Width: any = ResponsiveWidthComponent(screenWidth)

    const Item = ({ id, title, data }: ItemProps) => {
        return (
            <Booth3
                key={id}
                title={title}
                onPress={() => navigation.navigate('Booth', { boothData: data, width: props.width })}
            />)
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../assets/events/eventpage.png')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
            <View style={[styles.top_button_container, { width: Width }]}>
                <View style={styles.top_button_body}>
                    <RoundButton
                        iconName='chatbox'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { setMessageModal(true) }}
                    />
                    <RoundButton
                        iconName='download'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { setMessageModal(true) }}
                    />
                </View>
            </View>
            <View style={styles.stage1}><DemoAuditorium bHeight={100} bWidth={160} onPress={() => { navigation.navigate('Test2', { url: props.event.event_url }) }} /></View>
            <View style={styles.boothBody}>
                <Booth4
                    booth_Data={props.boothData}
                    width={props.width}
                    main_BackgroundColor={COLORS.background3}
                    booth_textColor={COLORS.text_color}
                    audi_textColor={COLORS.text_color2}
                    seperator_Color={COLORS.baseWhite}
                    audi_Data={props.audiData}
                    audi_backgroundColor='#F9F6EE'
                />
            </View>
            <MessagingModal
                modalVisible={messageModal}
                onPress={() => { }}
                onRequestClose={() => setMessageModal(false)}
                closePress={() => setMessageModal(false)}
            />
        </View>
    )
}

export default Event1

const styles = StyleSheet.create({

    stage1: {
        position: 'absolute',
        top: 55,
        left: 290
    },
    boothBody: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: '80%',
    },
    top_button_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    top_button_body: {
        flexDirection: 'row'
    }
})