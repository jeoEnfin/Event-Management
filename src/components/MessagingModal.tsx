import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, StatusBar } from 'react-native';
import RoundButton from './RoundButton';
import { COLORS } from '../constants';

type Props = {
    modalVisible: boolean;
    onPress: () => void;
    closePress: () => void;
    onRequestClose?: () => void;
}

const MessagingModal = (props: Props) => {
    const [message, setMessage] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={props.onRequestClose}
            >
                <View style={styles.modalView}>
                    <View style={styles.messageContainer}></View>
                    <View style={styles.textContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your message here"
                            placeholderTextColor={COLORS.background}
                            value={message}
                            onChangeText={setMessage}
                        />
                        <View style={styles.buttonContainer}>
                        <RoundButton
                            iconName='send'
                            iconSize={28}
                            color={COLORS.lightWhite}
                            backgroundColor={COLORS.btnBackground}
                            hapticFeedback={true}
                            onPress={props.onPress}
                        />
                        <RoundButton
                            iconName='close'
                            iconSize={28}
                            color={COLORS.lightWhite}
                            backgroundColor={COLORS.btnBackground}
                            hapticFeedback={true}
                            onPress={props.closePress}
                        /></View>
                    </View></View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        justifyContent: 'space-between'
    },
    input: {
        width: '75%',
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.background,
        borderRadius: 10,
        color: COLORS.background
    },
    textContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    messageContainer: {
        width: '100%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 10
    }
});

export default MessagingModal;