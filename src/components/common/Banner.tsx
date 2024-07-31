import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import { COLORS } from '../../constants';
import { config } from '../../utils/config';

const screenWidth = Dimensions.get("window").width;

type Props = {
    onBannerPress?: () => void;
}

const Banner = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <View style={{
            marginHorizontal: 10,
            marginTop: 10,
            height: 200,
        }}>
            <TouchableOpacity
                onPress={() => { props.onBannerPress }}
                style={{
                    width: '100%',
                    borderRadius: 10,
                    overflow: 'hidden',
                    padding: 5,
                }}>
                {loading && (
                    <View style={styles.previewContainer}>
                        <Image source={require('../../assets/errors/plainBackground.jpg')} style={styles.preview} />
                        <ActivityIndicator style={styles.loader} size="large" color={COLORS.secondary.main} />
                    </View>
                )}
                <Image
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode='stretch'
                    source={{ uri: `${config.CLOUD_FRONT_URL}/uploads/${config.SERVER_DOMAIN}/default/banner/default-baner.jpg` }}
                    alt='No image'
                    onLoadEnd={() => setLoading(false)}
                    onError={() => {
                        console.info('error')
                        setLoading(false);
                        setError(true);
                    }}
                />
                {/* <Image
                    style={styles.shade}
                    resizeMode='stretch'
                    source={require('../../assets/ci/bannerShade.png')}
                    alt='No image'
                /> */}
                {/* <View style={styles.body}>
                        <Text style={styles.text1}>THE BEST INTERPRETING</Text>
                        <Text style={styles.text1}>AGENCEY FOR YOUR</Text>
                        <Image source={require('../../assets/ci/eventLogo.png')} style={styles.text2} resizeMode='contain' />
                        <TouchableOpacity style={styles.btnBody}>
                            <Text style={styles.btnText}>Talk to us</Text>
                        </TouchableOpacity>
                    </View> */}
            </TouchableOpacity>

        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    body: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        margin: 10,
        padding: 15,
        gap: 4
    },
    text1: {
        color: COLORS.text.primary,
        fontSize: 18,
        fontWeight: '400'
    },
    text2: {
        height: 24,
        width: 76
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
    previewContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    loader: {
        position: 'absolute',
    },
})