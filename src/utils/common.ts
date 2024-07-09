import { differenceInDays, differenceInHours, differenceInMinutes, eachDayOfInterval, endOfDay, format, isAfter, isBefore, isWithinInterval, parseISO, startOfDay } from 'date-fns';

export function CiTruncate(str: string, num_chars: number) {
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

export const calculateTimeDifferenceForTwoDates = (firstDate: string, secondDate: string) => {
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

export const isDateNotPassed = (date: string) => {
    const now = new Date();
    return !isBefore(new Date(date), now);
};

interface DateWithId {
    id: string;
    date: string;
}
export function getDatesInRange(startDate: string, endDate: string): DateWithId[] {
    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    return dates.map((date, index) => ({
        id: `${date}`,
        date: format(date, 'EEE dd MMM'),
    }));
}

export function getTimeDifference(startDate: string, endDate: string) {
    const start = parseISO(startDate);
  const end = parseISO(endDate);
  
  const diffInMinutes = differenceInMinutes(end, start);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  if (minutes > 0) {
    if (result) result += ' ';
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return result || '0 minutes';
}

export const getCurrentDateSchedules = (schedules:any) => {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);
  
    const filteredData = schedules.filter((item:any) => {
      const startDate = parseISO(item.schStartDateTime);
      const endDate = parseISO(item.schEndDateTime);
      return isWithinInterval(startDate, { start, end }) || isWithinInterval(endDate, { start, end });
    });
  
    const groupedByHall = filteredData.reduce((acc:any, schedule:any) => {
      if (!acc[schedule.hallName]) {
        acc[schedule.hallName] = [];
      }
      acc[schedule.hallName].push(schedule);
      return acc;
    }, {});
  
    return Object.entries(groupedByHall).map(([hallName, schedules]) => ({ hallName, schedules }));
  };

  export function isDateInFuture(startDate: string) {
    // Get the current date
    const currentDate = new Date();
  
    // Parse the startDate string to a Date object using date-fns
    const dateToCheck = parseISO(startDate);
  
    // Compare the dates using date-fns
    return isAfter(dateToCheck, currentDate);
  }