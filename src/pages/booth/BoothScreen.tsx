import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import RoundButton from '../../components/RoundButton'
import MessagingModal from '../../components/MessagingModal';
import { sendEmail } from '../../utils/services/MailConfig';
import { Linking } from 'react-native';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

type Props = {
    route: any
}

const BoothScreen = ({ route }: Props) => {
    const { boothData } = route.params;
    const [width, setWidth] = useState(screenWidth / 5)
    const [height, setHeight] = useState(screenHeight / 3)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (screenWidth > screenHeight) {
            setWidth(screenWidth / 5);
            setHeight(screenHeight / 3);
        } else {
            setWidth(screenHeight / 5);
            setHeight(screenWidth / 3);
        }
    }, [])

    const openWhatsApp = () => {
        const phoneNumber = boothData.booth_phone_no;
        const url = `whatsapp://send?phone=${phoneNumber}`;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.baseWhite }}>
            <Image resizeMode='contain' source={require('../../assets/booths/booth3.png')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
            <View style={styles.controller}>
                <Text style={styles.headText}>{boothData.booth_name}</Text>
            </View>
            <View style={styles.btnController}>
                <View>
                    {boothData.booth_Ad_1 && <Image resizeMode='stretch' source={{ uri: boothData.booth_Ad_1 }} style={{ width: width, height: height }} />}
                    {boothData.booth_Ad_2 && <Image resizeMode='stretch' source={{ uri: boothData.booth_Ad_2 }} style={{ width: width, height: height }} />}
                    {boothData.booth_Ad_3 && <Image resizeMode='stretch' source={{ uri: boothData.booth_Ad_3 }} style={{ width: width, height: height }} />}
                </View>
                <View>
                    <RoundButton
                        iconName='chatbox'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { setModalVisible(true); }}
                    />
                    {boothData.booth_email && <RoundButton
                        iconName='mail'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => {
                            Linking.openURL(`mailto:${boothData.booth_email}`)
                                .catch((err) => console.error('An error occurred', err));
                        }}
                    />}
                    {boothData.booth_phone_no && <RoundButton
                        iconName='calendar-clear'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => {openWhatsApp()}}
                    />}
                </View>
            </View>
            <MessagingModal
                modalVisible={modalVisible}
                onPress={() => { }}
                closePress={() => setModalVisible(false)}
                onRequestClose={() => { setModalVisible(false) }}
            />
        </View>
    )
}

export default BoothScreen

const styles = StyleSheet.create({
    headText: {
        color: COLORS.blackBackground,
        fontSize: 27,
        fontWeight: 'bold'
    },
    controller: {
        width: 160,
        height: 100,
        backgroundColor: COLORS.baseWhite,
        position: 'absolute',
        left: 440,
        top: 40,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnController: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})