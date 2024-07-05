import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { COLORS } from '../../constants';


interface NotificationCardProps {
    title: string;
    message: string;
    timestamp: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, message, timestamp }) => {
    return (
        <Card containerStyle={styles.card}>
            <TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Icon name="bell" type="font-awesome" color={COLORS.secondary.main} />
                </View>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
            </TouchableOpacity>
        </Card>

    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.main
    },
    message: {
        fontSize: 16,
        marginBottom: 10,
        color: COLORS.text.main
    },
    timestamp: {
        fontSize: 14,
        color: COLORS.secondary.main,
    },
});

export default NotificationCard;
