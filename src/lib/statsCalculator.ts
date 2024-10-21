import dayjs from "dayjs";

export function calculateStats(data, statKey) {
    const { currentMonthData, previousMonthData } = filterDataByMonth(data);

    const currentMonthStat = calculateStatForMonth(currentMonthData, statKey);
    const previousMonthStat = calculateStatForMonth(previousMonthData, statKey);

    const percentageChange = calculatePercentageChange(currentMonthStat, previousMonthStat);

    return { statValue: currentMonthStat, percentageChange };
}

function filterDataByMonth(data) {
    const currentMonth = dayjs().month();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const currentMonthData = data.filter((visit) => dayjs(visit.visit_timestamp).month() === currentMonth);
    const previousMonthData = data.filter((visit) => dayjs(visit.visit_timestamp).month() === previousMonth);

    return { currentMonthData, previousMonthData };
}

function calculateStatForMonth(monthData, statKey) {
    switch (statKey) {
        case "visitors":
            return monthData.length;
        case "session_duration":
            return monthData.reduce((acc, visit) => acc + visit.session_duration, 0) / monthData.length || 0;
        case "bounce_rate":
            return (monthData.filter((visit) => !visit.actions_taken).length / monthData.length) * 100;
        default:
            return 0;
    }
}

function calculatePercentageChange(current, previous) {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
}