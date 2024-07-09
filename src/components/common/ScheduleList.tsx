import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format, parseISO, compareAsc } from 'date-fns';
import { getTimeDifference } from '../../utils/common';
import { COLORS } from '../../constants';

interface Schedule {
    hallName: string;
    id: string;
    schStartDateTime: string;
    schEndDateTime: string;
    schName: string;
    speakers: string;
}

const ScheduleList: React.FC<{ schedules: Schedule[] }> = ({ schedules }) => {
    // Function to format time from ISO string
    const formatTime = (dateTime: string): string => {
        const date = parseISO(dateTime);
        return format(date, 'hh:mm aa');
    };

    // Group schedules by hall name
    const groupedSchedules: { [hallName: string]: Schedule[] } = {};
    schedules.forEach((schedule) => {
        if (!groupedSchedules[schedule.hallName]) {
            groupedSchedules[schedule.hallName] = [];
        }
        groupedSchedules[schedule.hallName].push(schedule);
    });

    // Sort schedules within each hall by start date/time
    Object.keys(groupedSchedules).forEach((hallName) => {
        groupedSchedules[hallName].sort((a, b) =>
            compareAsc(parseISO(a.schStartDateTime), parseISO(b.schStartDateTime))
        );
    });

    // FlatList renderItem function to render each schedule row
    const renderScheduleItem = ({ item }: { item: Schedule }) => (
        <View style={styles.row}>
            <View>
                <Text style={styles.timeCell}>{formatTime(item.schStartDateTime)} - {formatTime(item.schEndDateTime)}</Text>
                <Text>{getTimeDifference(item.schStartDateTime, item.schEndDateTime)}</Text>
            </View>
            <Text style={styles.eventCell}>{item.schName}</Text>
            <Text style={styles.speakerCell}>{item.speakers}</Text>
        </View>
    );

    // FlatList keyExtractor function
    const keyExtractor = (item: Schedule) => item.id;

    if (!schedules || schedules === null || schedules.length === 0) {
        return (<View style={styles.container}>
            <View style={styles.noData}>
            <Text style={styles.noDataText}>There Are No Schedules Listed</Text>
            </View>
        </View>)
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.headerRow}>
                <Text style={[styles.headerCell, { flex: 2 }]}>Hall</Text>
                <Text style={[styles.headerCell, { flex: 2 }]}>Time</Text>
                <Text style={[styles.headerCell, { flex: 5 }]}>Event Name</Text>
                <Text style={[styles.headerCell, { flex: 3 }]}>Speaker</Text>
            </View> */}
            {Object.keys(groupedSchedules).map((hallName) => (
                <View key={hallName} style={styles.hallContainer}>
                    <Text style={styles.hallName}>{hallName} ({groupedSchedules[hallName].length} Sessions)</Text>
                    <FlatList
                        data={groupedSchedules[hallName]}
                        renderItem={renderScheduleItem}
                        keyExtractor={keyExtractor}
                      
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        minHeight: 300,
        height: '100%',
        marginBottom: 55
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerCell: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#777',
    },
    hallContainer: {
        marginBottom: 16,
        color: COLORS.text.main
    },
    hallName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: COLORS.text.main
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        gap: 10
    },
    timeCell: {
        flex: 2,
        fontSize: 16,
        color: COLORS.text.main,
        fontWeight: '500',
    },
    eventCell: {
        flex: 5,
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text.main
    },
    speakerCell: {
        flex: 3,
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text.main
    },
    noData: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noDataText: {
        color: COLORS.text.main,
        fontSize: 16,
        fontWeight: '500',
    }
});

export default ScheduleList;
