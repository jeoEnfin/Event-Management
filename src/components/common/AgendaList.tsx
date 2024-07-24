import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, TXT_SIZE } from '../../constants'
import { getDatesInRange } from '../../utils/common';
import DynamicTabList from './DynamicTabList';
import ScheduleList from './ScheduleList';
import { isSameDay, isWithinInterval, parseISO } from 'date-fns';

type Props = {
    startDate?: string;
    endDate?: string;
    schedules?: any;
    isJoin?: boolean;
}

interface Schedule {
    hallName: string;
    id: string;
    schStartDateTime: string;
    schEndDateTime: string;
    schName: string;
    speakers: string;
}

const filterSchedulesByDate = (schedules: Schedule[], date: Date): Schedule[] => {
    return schedules.filter(schedule => {
        const scheduleStartDate = parseISO(schedule.schStartDateTime);
        const scheduleEndDate = parseISO(schedule.schEndDateTime);
        
        // Check if the given date falls within the start and end date of the schedule
        return isWithinInterval(date, { start: scheduleStartDate, end: scheduleEndDate }) || isSameDay(scheduleStartDate, date);
    });
};
const AgendaList = ({
    startDate,
    endDate,
    schedules,
    isJoin
}: Props) => {

    const [_days, set_Days] = useState<any>([]);
    const [_schedules,set_Schedule] = useState<any>([]);

    useEffect(() => {
        if (startDate && endDate) {
            const days = getDatesInRange(startDate, endDate);
            set_Days(days);
        }
    }, [startDate, endDate]);

    const handleShedule = (item: any) =>{
        const FSchedules =  filterSchedulesByDate(schedules , item)
        if(FSchedules){
            set_Schedule(FSchedules)
        }
    }

    return (
        <View style={{ width: '100%' ,marginTop: 10}}>
            <Text style={{
                fontWeight: '600',
                fontSize: 16,
                color: COLORS.text.main,
                marginBottom: 5
            }}>Agenda</Text>
            <View style={{marginTop: 14}}>
            {_days && <DynamicTabList
                tabs={_days}
                onDateClick={(val) => handleShedule(val)}
            />}
            </View>
            {schedules && 
            <ScheduleList schedules={_schedules ? _schedules : schedules} isJoin={isJoin} />}
        </View>
    )
}

export default AgendaList

const styles = StyleSheet.create({})