import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, TXT_SIZE } from '../../constants'
import Button from '../Button'


type Props = {
    avatar: string;
    firstName: string;
    lastName?: string;
    email?: string;
}

const ProfileSmallCard = (props: Props) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scale, { toValue: 1.2, useNativeDriver: true }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    };
    
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[styles.container]}>
            <View >
                <Animated.Image
                    source={{ uri: props.avatar }}
                    style={[styles.img_View,{ transform: [{ scale }] }]}
                    defaultSource={require('../../assets/profileIcons/img_avatar1.png')}
                />
            </View>
            <View style={{alignItems: 'center',width: 100}}>
                <Animated.Text
                    style={[styles.txt_name]}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >{props.firstName} {props.lastName}</Animated.Text>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.txt_email}
                >{props.email}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Button
                    title='follow'
                    onPress={() => { }}
                    backgroundColor={COLORS.btnBackground2}
                />
            </View>
        </TouchableOpacity>
    )
}

export default ProfileSmallCard

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 165,
        backgroundColor: COLORS.btnBackground,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 2,
        elevation: 2
    },
    img_View: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: COLORS.baseWhite
    },
    txt_name: {
        color: COLORS.text_color,
        fontSize: TXT_SIZE.XS,
        fontWeight: '700'
    },
    txt_email: {
        color: COLORS.text_color,
        fontSize: TXT_SIZE.XXS
    }
})