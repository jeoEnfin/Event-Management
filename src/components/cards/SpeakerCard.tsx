import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, TXT_SIZE } from '../../constants'
import Button from '../Button'


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
                    source={{ uri: props.avatar !== 'default.jpg'  ? props.avatar : 'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=' }}
                    style={[styles.img_View]}
                    resizeMode='cover'
                />
            </View>
            <View style={{marginVertical: 5 ,alignItems: 'center', width: '100%'}}>
                <Animated.Text
                    style={[styles.txt_name]}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >{props.firstName} {props.lastName}</Animated.Text>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.txt_info}
                >{props.designation}</Text>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.txt_info}
                >{props.companyName}</Text>
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
        width: 100,
        height: 100,
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