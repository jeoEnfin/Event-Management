type Schedule = {
    hallid: string; // New property for hallId
    hallName: string;
    schStartDateTime: string; // Assuming the date is stored as a string
    // Add other properties if needed
  };
  
  type GroupedSchedule = {
    hallid: string;
    hallName: string;
    schedules: Schedule[];
  };
  
  export function groupWithHallName(schedules: Schedule[]): GroupedSchedule[] {
    const groupedSchedules = schedules.reduce((acc: { [hallid: string]: GroupedSchedule }, schedule: Schedule) => {
      const { hallid, hallName } = schedule;
  
      if (!acc[hallid]) {
        acc[hallid] = { hallid, hallName, schedules: [] };
      }
  
      acc[hallid].schedules.push(schedule);
      return acc;
    }, {});
  
    const sortedSchedules = Object.values(groupedSchedules).map(group => {
      group.schedules.sort((a: Schedule, b: Schedule) =>
        new Date(a.schStartDateTime).getTime() - new Date(b.schStartDateTime).getTime()
      );
      return group;
    });
  
    return sortedSchedules;
  }
  