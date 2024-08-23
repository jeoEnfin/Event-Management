import React, { useEffect } from 'react';
import { Animated, Text, StyleSheet, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { hideToast } from '../../store/toast/ToastActions';

const Toast: React.FC = () => {
    const dispatch: any = useDispatch();
    const { visible, message, variant } = useSelector((state: any) => state.toast);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const platform = Platform.OS;

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        dispatch(hideToast());
                    });
                }, 3000);
            });
        }
    }, [visible, fadeAnim, dispatch]);

    if (!visible) return null;

    const getBackgroundColor = (): string => {
        switch (variant) {
            case 'success':
                return '#4CAF50'; // Green
            case 'error':
                return '#F44336'; // Red
            case 'alert':
                return '#FB9E13';  
            default:
                return '#333'; // Default dark color
        }
    };

    return (
        <View style={[styles.container, platform === 'ios'&& {top: 60}]}>
            <Animated.View style={[styles.toast, { opacity: fadeAnim, backgroundColor: getBackgroundColor() }]}>
                <Text style={styles.message}>{message}</Text>
            </Animated.View>
        </View>
    );
};

export default Toast;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        alignItems: 'center',
        zIndex: 1000,
    },
    toast: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: '60%',
        alignItems: 'center',
    },
    message: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});