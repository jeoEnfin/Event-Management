import { differenceInDays, differenceInHours, differenceInMinutes, isAfter, isBefore } from 'date-fns';

export function CiTruncate(str:string, num_chars:number) { 
    if (str.length > num_chars) {
        return str.slice(0, num_chars - 1) + '...';
    }
    return str;
}



export const calculateTimeDifference = (futureDate: any) => {
    const now = new Date();
    const date = new Date(futureDate);

    const daysDiff = differenceInDays(date, now);
    const hoursDiff = differenceInHours(date, now) % 24;
    const minutesDiff = differenceInMinutes(date, now) % 60;

    if (daysDiff > 0) {
        return `ends in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
    } else if (hoursDiff > 0) {
        return `ends in ${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`;
    } else if (minutesDiff > 0) {
        return `ends in ${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
    } else {
        return 'already ended';
    }
};

export const calculateTimeDifferenceForTwoDates = (firstDate:string, secondDate:string) => {
    const now = new Date();
    const startDate = new Date(firstDate);
    const endDate = new Date(secondDate);

    if (isBefore(now, startDate)) {
        const daysDiff = differenceInDays(startDate, now);
        const hoursDiff = differenceInHours(startDate, now) % 24;
        const minutesDiff = differenceInMinutes(startDate, now) % 60;

        if (daysDiff > 0) {
            return `starts in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
        } else if (hoursDiff > 0) {
            return `starts in ${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`;
        } else if (minutesDiff > 0) {
            return `starts in ${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        } else {
            return 'starts soon';
        }
    } else if (isAfter(now, startDate) && isBefore(now, endDate)) {
        const daysDiff = differenceInDays(endDate, now);
        const hoursDiff = differenceInHours(endDate, now) % 24;
        const minutesDiff = differenceInMinutes(endDate, now) % 60;

        if (daysDiff > 0) {
            return `ends in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
        } else if (hoursDiff > 0) {
            return `ends in ${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`;
        } else if (minutesDiff > 0) {
            return `ends in ${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        } else {
            return 'ends soon';
        }
    } else {
        return 'event ended';
    }
};

export const isDateNotPassed = (date:string) => {
    const now = new Date();
    return !isBefore(new Date(date), now);
};