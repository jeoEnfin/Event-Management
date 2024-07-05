import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { format } from 'date-fns';

type Props = {
    imgUrl: string;
    onPressButton?: ()=>void;
    buttonLabel?: string;
    startDate?: string;
    endDate?: string;
    title?: string;
    subTitle?: string;
}

const screenWidth = Dimensions.get("window").width;

const EventBanner = (props: Props) => {
  return (
    <View style={{
        width: screenWidth,
        height: 240,
    }}>
        <View
            style={{
                width: screenWidth,
                borderRadius: 10,
                overflow: 'hidden',
                padding: 5,
                height: 230,
            }}>
            <Image
                style={{ width: '100%', height: '100%',borderRadius: 10}}
                resizeMode='stretch'
                source={{ uri: props.imgUrl }}
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
                    <Text style={styles.text2}>{props.subTitle}</Text>
                    <Text style={styles.dateTxt}>{props.startDate && format(new Date(props.startDate), 'dd MMM yyyy')}-{props.endDate && format(new Date(props.endDate), 'dd MMM yyyy')}</Text>
                    {props.buttonLabel && <TouchableOpacity style={styles.btnBody} onPress={props.onPressButton}>
                        <Text style={styles.btnText}>{props.buttonLabel}</Text>
                    </TouchableOpacity>}
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
        fontWeight: '400'
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
    },
    subBody: {
        backgroundColor: COLORS.default.dark,
    },
    shade: {
        width: '100%', 
        height: 220,
        position: 'absolute',
        left: 5,
        top: 5
    },
    dateTxt: {
        color: COLORS.text.primary,
        fontSize: 13,
        fontWeight: '600'
      },
})