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
    schedules?: any
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
    schedules
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
                fontSize: TXT_SIZE.L,
                color: COLORS.text.main,
                marginLeft: 10,
                marginBottom: 5
            }}>Agenda</Text>
            {_days && <DynamicTabList
                tabs={_days}
                onDateClick={(val) => handleShedule(val)}
            />}
            {schedules && 
            <ScheduleList schedules={_schedules ? _schedules : schedules} />}
        </View>
    )
}

export default AgendaList

const styles = StyleSheet.create({})