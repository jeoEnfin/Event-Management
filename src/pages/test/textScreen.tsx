import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native-video';
import RoundButton from '../../components/RoundButton';
import { COLORS } from '../../constants';

type Props = {}

const TextScreen = (props: Props) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isRepeat, setIsRepeat] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    return (
        <View style={{ flex: 1 }}>
            <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
                style={styles.backgroundVideo}
                fullscreen={isFullScreen}
                controls={true}
                repeat={isRepeat}
                muted={isMuted}
            />
            <View style={styles.controls}>
                <View>
                    <RoundButton
                        iconName={isFullScreen ? 'contract' : 'expand'}
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { setIsFullScreen(!isFullScreen) }}
                    />
                </View>
                <View>
                    <RoundButton
                        iconName={'repeat'}
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={isRepeat ? COLORS.redButton : COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { setIsRepeat(!isRepeat) }}
                    />
                    <RoundButton
                        iconName={isMuted ? 'volume-mute' : 'volume-high'}
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={isMuted ? COLORS.redButton : COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={() => { setIsMuted(!isMuted) }}
                    />
                </View>
            </View>


        </View>
    )
}

export default TextScreen

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})