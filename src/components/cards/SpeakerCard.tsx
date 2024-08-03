import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, TXT_SIZE } from '../../constants'
import Button from '../Button'
import { config } from '../../utils/config'


type Props = {
    avatar?: string;
    firstName?: string;
    lastName?: string;
    designation?: string;
    companyName?: string;
}

const SpeakerCard = (props: Props) => {


    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.container]}>
            <View >
                <Image
                    source={{
                        uri: props.avatar === 'default.webp'
                            ? `${config.CLOUD_FRONT_URL}/uploads/ci/default/speaker/default.webp`
                            : (props.avatar && (props.avatar.startsWith('https') || props.avatar.startsWith('http')))
                                ? props.avatar
                                : `${config.CLOUD_FRONT_URL}/uploads/ci/${config.SERVER_DOMAIN}/speaker/${props.avatar}`
                    }} style={[styles.img_View]}
                    resizeMode='cover'
                />
            </View>
            <View style={{ marginVertical: 5, alignItems: 'center', width: '100%' }}>
                <Animated.Text
                    style={[styles.txt_name]}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >{props.firstName} {props.lastName}</Animated.Text>
                {props.designation && <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.txt_info}
                >{props.designation}</Text>}
                {props.companyName && <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.txt_info}
                >{props.companyName}</Text>}
            </View>
        </TouchableOpacity>
    )
}

export default SpeakerCard

const styles = StyleSheet.create({
    container: {
        width: 140,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    img_View: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    txt_name: {
        color: COLORS.text.main,
        fontSize: TXT_SIZE.S,
        fontWeight: '600'
    },
    txt_info: {
        color: COLORS.text.main,
        fontSize: TXT_SIZE.XXS,
    }
})