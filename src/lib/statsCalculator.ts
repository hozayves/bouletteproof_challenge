import dayjs from "dayjs";

interface Visit {
    visit_timestamp: string | number | Date;
    session_duration: number;
    actions_taken: boolean;
}

interface StatResult {
    statValue: number;
    percentageChange: number;
}

export function calculateStats(data: Visit[], statKey: string): StatResult {
    const { currentMonthData, previousMonthData } = filterDataByMonth(data);

    const currentMonthStat = calculateStatForMonth(currentMonthData, statKey);
    const previousMonthStat = calculateStatForMonth(previousMonthData, statKey);

    const percentageChange = calculatePercentageChange(currentMonthStat, previousMonthStat);

    return { statValue: currentMonthStat, percentageChange };
}

function filterDataByMonth(data: Visit[]): { currentMonthData: Visit[]; previousMonthData: Visit[] } {
    const currentMonth = dayjs().month();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const currentMonthData = data.filter((visit) => dayjs(visit.visit_timestamp).month() === currentMonth);
    const previousMonthData = data.filter((visit) => dayjs(visit.visit_timestamp).month() === previousMonth);

    return { currentMonthData, previousMonthData };
}

function calculateStatForMonth(monthData: Visit[], statKey: string): number {
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

function calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
}
