import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SlideUpModal from '../../../components/common/SlideUpModal';

type Props = {
    isModalVisible: boolean;
    toggleModal: () => void;
}

const QRCodeModal = ({
    isModalVisible = false,
    toggleModal }: Props) => {

    return (
        <SlideUpModal isVisible={isModalVisible} onClose={toggleModal}>
            <Text>This is a modal that slides up from the bottom!</Text>
        </SlideUpModal>
    )
}

export default QRCodeModal

const styles = StyleSheet.create({})