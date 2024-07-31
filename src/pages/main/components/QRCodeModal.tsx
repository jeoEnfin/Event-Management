import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SlideUpModal from '../../../components/common/SlideUpModal';
import { COLORS } from '../../../constants';
import { format } from 'date-fns';

type Props = {
    isModalVisible: boolean;
    toggleModal: () => void;
    url?: string;
    eventName?: string;
    eventStartDate?: string;
    eventEndDate?: string;
}

const QRCodeModal = ({
    isModalVisible = false,
    toggleModal,
    url,
    eventName,
    eventEndDate,
    eventStartDate
}: Props) => {

    return (
        <SlideUpModal isVisible={isModalVisible} onClose={toggleModal}>
            <View style={styles.container}>
                <Text style={styles.text1}>Your QR Code</Text>
                <Text style={styles.text2}>Scan the QR code to share your profile</Text>
                <View style={styles.qrcodeContainer}>
                    {url && <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />}
                </View>
                {eventName && <View style={styles.eventDetails}>
                    <Text style={styles.text3}>Event Name:</Text>
                    <Text style={styles.text2}>{eventName}</Text>
                </View>}
                {eventStartDate && eventEndDate && <View style={styles.eventDetails}>
                    <Text style={styles.text3}>Event Date:</Text>
                    <Text style={styles.text2}>{format(eventStartDate, 'dd MMMM yyyy')} - {format(eventEndDate, 'dd MMMM yyyy')}</Text>
                </View>}
            </View>
        </SlideUpModal>
    )
}

export default QRCodeModal

const styles = StyleSheet.create({
    container: {
        // height: '80%',
        paddingVertical: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text.main
    },
    text2: {
        fontSize: 12,
        fontWeight: '400',
        color: COLORS.text.main,
        marginTop: 2
    },
    qrcodeContainer: {
        width: 220,
        height: 220,
        marginTop: 10 
    },
    text3: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.text.main
    },
    eventDetails: {
        alignItems: 'center',
        gap: 5,
        marginVertical: 10
    }
})