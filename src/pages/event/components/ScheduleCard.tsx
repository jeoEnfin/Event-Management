import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { format, parseISO, isSameDay } from 'date-fns';
import { COLORS } from '../../../constants';
import { getDatesInRange, getTimeDifference } from '../../../utils/common';
import ScheduleCard from '../../../components/common/ScheduleCard';
import DynamicTabList from '../../../components/common/DynamicTabList';

interface ScheduleItem {
    hallName: string;
    hallid: string;
    id: string;
    schEndDateTime: string;
    schName: string;
    schStartDateTime: string;
    speakers: string;
}

interface ScheduleCardProps {
    schedules: ScheduleItem[];
    hallName?: string;
    eventStartDate?: string
    eventEndDate?: string
}

const ScheduleCards: React.FC<ScheduleCardProps> = ({ schedules, hallName, eventStartDate, eventEndDate }) => {
    const [_days, set_Days] = useState<any>([]);

    useEffect(() => {
        if (eventStartDate && eventEndDate) {
            const days = getDatesInRange(eventStartDate, eventEndDate);
            set_Days(days);
            //console.log(days, 'days')
        }
    }, [eventStartDate, eventEndDate]);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Extract unique dates from schedules
    const uniqueDates = Array.from(
        new Set(schedules.map(schedule => format(parseISO(schedule.schStartDateTime), 'yyyy-MM-dd')))
    );

    const handleDate = (date: string) => {
        let cDate: any = date;
        const _date: any = format(cDate, 'yyyy-MM-dd')
        //console.log(_date)
        if (_date) {
            setSelectedDate(_date)
        }
    }

    // Filter schedules based on the selected date
    const filteredSchedules = schedules.filter(schedule =>
        selectedDate && isSameDay(parseISO(schedule.schStartDateTime), parseISO(selectedDate))
    );

    const Header = () => {
        return (
            <View style={styles.hallDetails}>
                {hallName && <Text style={styles.hallNameText}>{hallName === 'defaultLobby' ? 'Lobby' : hallName}</Text>}
                {filteredSchedules && <Text style={styles.sessionText}>{filteredSchedules.length} Sessions</Text>}
            </View>
        )
    }

    const ScheduleList = () => {
        return (
            <View style={styles.scheduleContainer}>
                {filteredSchedules.length > 0 ? (
                    <FlatList
                        data={filteredSchedules}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ paddingHorizontal: 5 }}>
                                <ScheduleCard
                                    key={item.id}
                                    startTime={item.schStartDateTime}
                                    timeDuration={getTimeDifference(item.schStartDateTime, item.schEndDateTime)}
                                    title={item.schName}
                                    speaker={item.speakers}
                                    isJoin={true}
                                /></View>
                        )}
                    />
                ) : (
                    <Text style={styles.noScheduleText}>No schedules available for this date.</Text>
                )}
            </View>
        )
    }

    const ItemData = []

    if (schedules) {
        ItemData.push(<Header />);
        ItemData.push(<ScheduleList />);
    }

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                {_days && <DynamicTabList
                    tabs={_days}
                    onDateClick={(val) => handleDate(val)}
                    showBottom={true}
                />}
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={ItemData}
                renderItem={({ item }) => item}
                keyExtractor={(_, index) => index.toString()}
                // style={{
                //     marginHorizontal: 18,
                //     marginBottom: 70
                // }}
            />
        </View>
    );
};

export default ScheduleCards;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: COLORS._background.primary,
        flex: 1
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    dateContainer: {
        // flexDirection: 'row',
        //flexWrap: 'wrap',
        // justifyContent: 'space-between',
        height: 80,
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        marginBottom: 10,
    },
    selectedDateButton: {
        backgroundColor: '#007BFF',
    },
    dateText: {
        color: '#333',
    },
    scheduleContainer: {
        marginTop: 20,
        width: '100%',
    },
    scheduleItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    scheduleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    scheduleTime: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    speakers: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    noScheduleText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    hallNameText: {
        fontSize: 16,
        color: COLORS.text.main,
        fontWeight: '600'
    },
    sessionText: {
        fontSize: 12,
        color: COLORS.text.default,
        fontWeight: '600'
    },
    hallDetails: {
        gap: 5,
        marginTop: 5
    }
});