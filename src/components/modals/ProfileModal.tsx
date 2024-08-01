import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TopDownModal } from '../common/TopDownModal'
import { COLORS } from '../../constants';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    onProfilePress?: () => void;
    onLogoutPress?: () => void;
}

const ProfileModal = ({
    isVisible,
    onClose,
    onProfilePress,
    onLogoutPress,
}: Props) => {

    return (
        <TopDownModal
            visible={isVisible}
            onClose={onClose}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={onProfilePress}
                    style={styles.buttonContainer}>
                    <Icon name='person-outline' color={COLORS.secondary.main} size={28} />
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
                <View style={styles.divider}></View>
                <TouchableOpacity
                    onPress={onLogoutPress}
                    style={styles.buttonContainer}>
                    <Icon name='logout' color={COLORS.secondary.main} size={28} />
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </TopDownModal>
    )
}

export default ProfileModal

const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.default.primary,
        opacity: 0.1
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 10
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.text.main,
        fontWeight: '500'
    }
})