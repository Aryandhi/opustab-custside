export const ScheduleLocator = {
    // Menu navigation
    scheduleMenu: "#navbarNav > div.col-9.text-start.d-none.d-lg-flex > ul > li:nth-child(2)",
    
    // Tab group
    groupClassTab: "#nav-group-class-tab",
    
    // Date section
    dateWeekContainer: ".list-dates-week",
    dateButtons: ".list-dates-week .item-dates-week",
    firstDateButton: ".list-dates-week .item-dates-week:first-child", // atau ".list-dates-week .item-dates-week:nth-child(2)"
    activeDateButton: ".list-dates-week .item-dates-week.active",
    prevWeekButton: "#prev-week",
    nextWeekButton: "#next-week",
    
    // Date elements
    dayName: ".dayname",
    dateNumber: ".date",
    monthName: ".monthname"
} as const;