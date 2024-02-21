import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import RoundButton from '../components/RoundButton'
import { useNavigation } from '@react-navigation/native'
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import { COLORS } from '../constants';

type Props = {
    route: any
}

const HomeScreen = ({ route }: Props) => {
    const { apiKey, sessionId, token } = route.params
    const [isAudio, setIsAudio] = useState<boolean>(true);
    const [isVideo, setIsVideo] = useState<boolean>(true);


    const navigation: any = useNavigation();
    const endCall = () => {
        navigation.navigate('Join')
    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Video Chat</Text>
            </View>
            <View>
                <OTSession
                    apiKey={apiKey}
                    sessionId={sessionId}
                    token={token}>
                    <OTSubscriber style={[styles.videoBody, { width: 350, height: 400 }]} />
                    <OTPublisher
                        properties={{
                            publishAudio: isAudio,
                            publishVideo: isVideo
                        }}
                        style={{ width: 350, height: 200 }} />
                </OTSession>
            </View>
            <View style={styles.controller} >
                <RoundButton
                    iconName={isAudio ? 'mic' : 'mic-off'}
                    iconSize={28}
                    color='#E5E7EB'
                    backgroundColor={isAudio ? COLORS.btnBackground : COLORS.redButton}
                    hapticFeedback={true}
                    onPress={() => setIsAudio(!isAudio)} />
                <RoundButton
                    iconName={isVideo ? 'videocam' : 'videocam-off'}
                    iconSize={28}
                    color='#E5E7EB'
                    backgroundColor={isVideo ? COLORS.btnBackground : COLORS.redButton}
                    hapticFeedback={true}
                    onPress={() => setIsVideo(!isVideo)} />
                <RoundButton
                    iconName='tv'
                    iconSize={28}
                    color={COLORS.lightWhite}
                    backgroundColor={COLORS.btnBackground}
                    hapticFeedback={true}
                    onPress={() => { }}/>
                <RoundButton
                    iconName='chatbox'
                    iconSize={28}
                    color={COLORS.lightWhite}
                    backgroundColor={COLORS.btnBackground}
                    hapticFeedback={false}
                    onPress={() => { }}
                />
                <RoundButton
                    iconName='call'
                    iconSize={28}
                    color={COLORS.baseWhite}
                    backgroundColor={COLORS.redButton}
                    hapticFeedback={true}
                    onPress={() => endCall()} />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: COLORS.background
    },
    controller: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 70,
        borderRadius: 30
    },
    title: {
        color: COLORS.baseWhite,
        fontSize: 20,
        fontWeight: 'bold',
    },
    videoBody: {
        borderWidth: 3,
        borderColor: COLORS.baseWhite,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    }
})