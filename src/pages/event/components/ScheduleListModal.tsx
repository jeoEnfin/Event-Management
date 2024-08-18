import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideUpModal from '../../../components/common/SlideUpModal'

type Props = {
    isModalVisible: boolean;
    toggleModal: () => void;
}

const ScheduleListModal = ({
    isModalVisible,
    toggleModal,
}: Props) => {
    return (
        <SlideUpModal isVisible={isModalVisible} onClose={toggleModal}>
            <View>
                <Text>ScheduleListModal</Text>
            </View>
        </SlideUpModal>
    )
}

export default ScheduleListModal

const styles = StyleSheet.create({})