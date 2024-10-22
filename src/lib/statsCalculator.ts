import dayjs from "dayjs";

interface Visit {
    visit_timestamp: string | number | Date;
    session_duration: number;
    actions_taken: string;
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
    console.log(`Calculating stat for: ${statKey}`);
    console.log(`Month data length: ${monthData.length}`);

    switch (statKey) {
        case "visitors":
            return monthData.length;
        case "session_duration":
            return monthData.reduce((acc, visit) => acc + visit.session_duration, 0) / monthData.length || 0;
        case "bounce_rate":
            if (monthData.length === 0) {
                console.log("No data for the month");
                return 0;
            }
            console.log("Visits in this month:", monthData);
            // monthData.forEach((visit, index) => {
            //     console.log(`Visit ${index + 1}: actions_taken = "${visit.actions_taken}"`);
            // });
            const bounces = monthData.filter((visit) => visit.actions_taken === "").length;
            return (bounces / monthData.length) * 100;
        default:
            return 0;
    }
}

function calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
}
