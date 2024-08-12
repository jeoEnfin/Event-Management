type Schedule = {
    hallName: string;
    schStartDateTime: string; // Assuming the date is stored as a string
    // Add other properties if needed
  };
  
  type GroupedSchedule = {
    [hallName: string]: Schedule[];
  };
  
  export function groupWithHallName(schedules: Schedule[]): GroupedSchedule[] {
    const groupedSchedules = schedules.reduce((acc: GroupedSchedule, schedule: Schedule) => {
      const { hallName } = schedule;
      if (!acc[hallName]) {
        acc[hallName] = [];
      }
      acc[hallName].push(schedule);
      return acc;
    }, {} as GroupedSchedule);
    
    // Transform groupedSchedules into desired structure
    const transformedSchedules = Object.keys(groupedSchedules).map(hallName => ({
      [hallName]: groupedSchedules[hallName]
    }));
  
    const sortedSchedules = transformedSchedules.map(group => {
      const hallName = Object.keys(group)[0]; // Extract hallName
      const schedulesArray = group[hallName]; // Get the array of schedules for this hallName
      schedulesArray.sort((a: Schedule, b: Schedule) => new Date(a.schStartDateTime).getTime() - new Date(b.schStartDateTime).getTime()); // Sort by schStartDateTime
      return { [hallName]: schedulesArray }; // Return in the desired format
    });
    
    return sortedSchedules;
  }