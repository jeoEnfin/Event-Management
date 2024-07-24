import { differenceInDays, differenceInHours, differenceInMinutes, eachDayOfInterval, endOfDay, format, isAfter, isBefore, isEqual, isWithinInterval, parseISO, startOfDay } from 'date-fns';

export function CiTruncate(str: string, num_chars: number) {
    if (str.length > num_chars) {
        return str.slice(0, num_chars - 1) + '...';
    }
    return str;
}



export const calculateTimeDifference = (startDate:any, endDate:any) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isBefore(now, start)) {
        // Expo is upcoming
        const daysDiff = differenceInDays(start, now);
        const hoursDiff = differenceInHours(start, now) % 24;
        const minutesDiff = differenceInMinutes(start, now) % 60;

        if (daysDiff > 0) {
            return `starts in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
        } else if (hoursDiff > 0) {
            return `starts in ${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`;
        } else if (minutesDiff > 0) {
            return `starts in ${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        }
    } else if (isAfter(now, end)) {
        // Expo has already ended
        return 'already ended';
    } else {
        // Expo is ongoing
        const daysDiff = differenceInDays(end, now);
        const hoursDiff = differenceInHours(end, now) % 24;
        const minutesDiff = differenceInMinutes(end, now) % 60;

        if (daysDiff > 0) {
            return `ends in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
        } else if (hoursDiff > 0) {
            return `ends in ${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`;
        } else if (minutesDiff > 0) {
            return `ends in ${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        }
    }

    return 'happening now';
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
        return 'ended';
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

 export const splitName = (fullName:string) => {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    return { firstName, lastName };
}; 

export const generateRandomId = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
  
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  };

  export const isDurationLessThan24Hours = (date:any) => {
    const now = new Date();
    const parsedDate = parseISO(date);
  
    // Check if the date is in the past
    if (isBefore(parsedDate, now)) {
      return false;
    }
  
    // Check if the date is within the next 24 hours
    const hoursDifference = differenceInHours(parsedDate, now);
    return hoursDifference <= 24;
  };

  export const fitNamesInArea = (namesString: any, maxWidth:any, measureWidth:any) => {
    const names = namesString.split(',');
    let currentWidth = 0;
    let displayNames = [];
    let overflowCount = 0;
  
    for (let i = 0; i < names.length; i++) {
      const name = names[i].trim();
      const nameWidth = measureWidth(name);
  
      if (currentWidth + nameWidth > maxWidth) {
        overflowCount = names.length - i;
        break;
      }
  
      displayNames.push(name);
      currentWidth += nameWidth;
  
      // Add width for comma separator
      if (i < names.length - 1) {
        currentWidth += measureWidth(',');
      }
    }
  
    if (overflowCount > 0) {
      displayNames.push(`+${overflowCount}`);
    }
  
    return displayNames.join(',');
  };
  