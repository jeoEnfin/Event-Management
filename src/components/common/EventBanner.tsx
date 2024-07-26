import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { format } from 'date-fns';
import { config } from '../../utils/config';
import { Icon } from 'react-native-elements';
import { isDateNotPassed } from '../../utils/common';

type Props = {
    imgUrl: string;
    onPressButton?: () => void;
    buttonLabel?: string;
    startDate?: string;
    endDate?: string;
    title?: string;
    subTitle?: string;
    price?: string;
    expRegStart?: string;
    expRegEnd?: string;
    isOrder?: boolean;
    onPressButtonAfterOrdered?: () => void;
}

const screenWidth = Dimensions.get("window").width;

const EventBanner = (props: Props) => {
    const isRegisterEnded = isDateNotPassed(props.expRegEnd || '');
    return (
        <View style={{
            width: '100%',
            height: 200,
            marginTop: 20
        }}>
            <View
                style={{
                    width: '100%',
                    borderRadius: 10,
                    overflow: 'hidden',
                    height: 200,
                }}>
                <Image
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode='stretch'
                    source={{ 
                        uri: props.imgUrl === 'default.jpg' 
                          ? `${config.CLOUD_FRONT_URL}/uploads/${config.SERVER_DOMAIN}/default/expo/default.jpg` 
                          : (props.imgUrl && (props.imgUrl.startsWith('https') ||props.imgUrl.startsWith('http')))
                            ? props.imgUrl 
                            : `${config.CLOUD_FRONT_URL}/uploads/${config.SERVER_DOMAIN}/default/expo/${props.imgUrl}` 
                      }}
                    alt='No image'
                />
                <Image
                    style={styles.shade}
                    resizeMode='stretch'
                    source={require('../../assets/ci/bannerShade2.png')}
                    alt='No image'
                />
                <View style={styles.body}>
                    <Text style={styles.text1}>{props.title}</Text>
                    {/* <Text style={styles.text2}>{props.subTitle}</Text> */}
                    <Text style={styles.dateTxt}>{props.startDate && format(new Date(props.startDate), 'dd MMM yyyy')}-{props.endDate && format(new Date(props.endDate), 'dd MMM yyyy')}</Text>
                    {!props.isOrder ? isRegisterEnded ? props.buttonLabel && <TouchableOpacity style={styles.btnBody} onPress={props.onPressButton}>
                        {props.price && <Icon name='euro' color={COLORS.text.primary} size={13} />}
                        <Text style={styles.btnText}>{props.buttonLabel}</Text>
                    </TouchableOpacity> : <Text style={[styles.btnText,{color: COLORS.text.error}]}>Expo Registration Ended</Text>:  <TouchableOpacity style={styles.btnBody} onPress={props.onPressButtonAfterOrdered}>
                        <Text style={styles.btnText}>Join</Text>
                    </TouchableOpacity> }
                </View>
            </View>

        </View>
    )
}

export default EventBanner

const styles = StyleSheet.create({
    body: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        margin: 10,
        padding: 15,
        gap: 4,
        width: '80%'
    },
    text1: {
        color: COLORS.text.primary,
        fontSize: 18,
        fontWeight: '600'
    },
    text2: {
        color: COLORS.text.primary,
        fontSize: 14,
        fontWeight: '400'
    },
    btnText: {
        color: COLORS.text.primary,
        fontWeight: '600'
    },
    btnBody: {
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: COLORS.text.primary,
        height: 39,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        gap: 2
    },
    subBody: {
        backgroundColor: COLORS.default.dark,
    },
    shade: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 10
    },
    dateTxt: {
        color: COLORS.text.primary,
        fontSize: 13,
        fontWeight: '600'
    },
})