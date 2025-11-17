export const ScheduleData = {
    // Expected texts
    GROUP_CLASS_TAB_TEXT: "Group Class",

    // Validation patterns
    DAY_NAME_PATTERN: /^[A-Za-z]{3}$/,
    DATE_PATTERN: /^\d{1,2}$/,
    MONTH_NAME_PATTERN: /^[A-Za-z]{3}$/,
    DATE_ATTRIBUTE_PATTERN: /^\d{4}-\d{2}-\d{2}$/,
    
    // Expected counts
    EXPECTED_DAYS_COUNT: 7
} as const;