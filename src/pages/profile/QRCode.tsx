import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import { QrCodeAPI } from './apis/QrCodeAPI'
import AsyncStorageUtil from '../../utils/services/LocalCache'


type Props = {
    data?: any
}

const QRCode = ({ data }: Props) => {
    const [qrcode, setQrcode] = useState(null)

    useEffect(() => {
        if (data) {
            checkQrcode(data);
        }
    },[])

    const checkQrcode = async (data:any) => {
        const _prvQrcode = await AsyncStorageUtil.getData(`QrCode_${data.uuid}`)
        if (_prvQrcode === null) {
            getQrcode();
        } else {
            setQrcode(_prvQrcode)
        }
    }

    const getQrcode = async () => {
        try {
            const qrCode = await QrCodeAPI({ data });
            setQrcode(qrCode.data)
            await AsyncStorageUtil.saveData(`QrCode_${data.uuid}`, qrCode.data)
        } catch (err) {
            console.log('QRCodeerror', err)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.head_Text}>Share your Profile</Text>
            <Text style={styles.message_Text}>Scan the QR code to share your profile</Text>
            <View style={styles.qrBody}>
                {qrcode && <Image source={{ uri: qrcode }} style={{ width: '100%', height: '100%' }} />}
            </View>
        </View>
    )
}

export default QRCode

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    head_Text: {
        color: COLORS.text.main,
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 5
    },
    message_Text: {
        color: COLORS.text.main,
        fontWeight: '400',
        fontSize: 14
    },
    qrBody: {
        height: 250,
        width: 250
    }
})