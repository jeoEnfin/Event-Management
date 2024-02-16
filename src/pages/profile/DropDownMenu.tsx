import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DropDownModal from '../../components/DropDownModal'
import Button from '../../components/Button';
import { COLORS } from '../../constants';

type Props = {
    isVisible: boolean;
    onRequestClose?: () => void;
    logoutPress?: () => void;
}

const DropDownMenu = (props: Props) => {
    return (
        <DropDownModal
            animationType={'none'}
            modalVisible={props.isVisible}
            onRequestClose={props.onRequestClose}
            Style={styles.mainContainer}
            children={
                <View style={styles.container}>
                    <Button
                        title='Edit'
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                    />
                    <Button
                        title='About'
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                    />
                    <Button
                        title='Change password'
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                    />
                    <Button
                        title='Logout'
                        backgroundColor={COLORS.btnBackground}
                        hapticFeedback={true}
                        onPress={props.logoutPress}
                    />
                </View>
            }
        />
    )
}

export default DropDownMenu

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    mainContainer: {
        backgroundColor: COLORS.background
    }
})