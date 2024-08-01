import React, { useRef, useEffect, ReactNode } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    SafeAreaView,
} from 'react-native';

// Define the prop types for the modal component
interface TopDownModalProps {
    visible: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export const TopDownModal: React.FC<TopDownModalProps> = ({ visible, onClose, children }) => {
    const slideAnim = useRef(new Animated.Value(-500)).current; // Initial position above the screen

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0, // Final position
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -500, // Move it back up when closing
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    return (
        <Modal
            transparent
            animationType="none"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <SafeAreaView>
                            <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
                                {children}
                            </Animated.View>
                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'flex-start',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        elevation: 5,
        width: '60%',
        position: 'absolute',
        right: 0,
        top: 35
    }
});
