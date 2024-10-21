import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import dayjs from "dayjs";

// Helper function to calculate percentage change
function calculatePercentageChange(current, previous) {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
}

export default function StatisticsCard() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-start md:gap-3 gap-2 p-2 rounded-md ">
            <OverviewCard title="Total Visitor" statKey="visitors" showPercentage={true} />
            <OverviewCard title="Bounce Rate" statKey="bounce_rate" />
            <OverviewCard title="Av. Session Duration" statKey="session_duration" />
        </div>
    );
}

function OverviewCard({ title, statKey, showPercentage = true }) {
    const fetchData = async () => {
        const res = await axios.get("https://my.api.mockaroo.com/customer_visit_data", {
            headers: { 'X-API-Key': 'a7f28380' },
        });
        return res.data;
    };

    const { data, isError, isPending, error } = useQuery({
        queryKey: ['customer'],
        queryFn: fetchData,
    });

    if (isPending) {
        return <p>Loading...</p>;
    }
    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    // Filter data for current month and previous month
    const currentMonth = dayjs().month(); // Current month (0-indexed)
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Previous month

    const currentMonthData = data.filter((visit) =>
        dayjs(visit.visit_timestamp).month() === currentMonth
    );
    const previousMonthData = data.filter((visit) =>
        dayjs(visit.visit_timestamp).month() === previousMonth
    );

    // Calculate total visitors for both months
    const totalVisitorsCurrentMonth = currentMonthData.length;
    const totalVisitorsPreviousMonth = previousMonthData.length;

    // Calculate average session duration for both months
    const avgSessionDurationCurrentMonth =
        currentMonthData.reduce((acc, visit) => acc + visit.session_duration, 0) /
        totalVisitorsCurrentMonth || 0;

    const avgSessionDurationPreviousMonth =
        previousMonthData.reduce((acc, visit) => acc + visit.session_duration, 0) /
        totalVisitorsPreviousMonth || 0;

    // Calculate bounce rate (as visitors with no actions)
    const bounceRateCurrentMonth =
        (currentMonthData.filter((visit) => !visit.actions_taken).length /
            totalVisitorsCurrentMonth) *
        100;

    const bounceRatePreviousMonth =
        (previousMonthData.filter((visit) => !visit.actions_taken).length /
            totalVisitorsPreviousMonth) *
        100;

    // Calculate percentage change for bounce rate
    const percentageChangeBounceRate = calculatePercentageChange(
        bounceRateCurrentMonth,
        bounceRatePreviousMonth
    );

    // Calculate percentage change for visitors and session duration
    const percentageChangeVisitors = calculatePercentageChange(
        totalVisitorsCurrentMonth,
        totalVisitorsPreviousMonth
    );

    const percentageChangeSessionDuration = calculatePercentageChange(
        avgSessionDurationCurrentMonth,
        avgSessionDurationPreviousMonth
    );

    // Determine which stat to display based on the statKey
    let statValue, percentageChange;

    switch (statKey) {
        case "visitors":
            statValue = totalVisitorsCurrentMonth;
            percentageChange = percentageChangeVisitors;
            break;
        case "session_duration":
            statValue = avgSessionDurationCurrentMonth;
            percentageChange = percentageChangeSessionDuration;
            break;
        case "bounce_rate":
            statValue = bounceRateCurrentMonth;
            percentageChange = percentageChangeBounceRate;
            break;
        default:
            statValue = 0;
            percentageChange = 0;
    }

    return (
        <div className="w-full">
            <div className="border w-full min-w-full flex flex-col p-3 rounded-lg bg-white">
                <p className="text-lg">{title}</p>
                <div className="flex align-center gap-14 md:gap-5 mt-4">
                    <p className="font-medium text-3xl">
                        {statKey === "session_duration"
                            ? `${(statValue / 1000).toFixed(2)}s` // For session duration
                            : statKey === "bounce_rate"
                                ? `${statValue.toFixed(2)}%` // For bounce rate
                                : statValue} {/* For total visitors, just show the number */}
                    </p>
                    {showPercentage && (
                        <div
                            className={`flex justify-center items-center rounded-full px-3 h-[28px] self-center gap-1 ${percentageChange > 0 ? "bg-green-100" : "bg-red-100"
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={14}
                                height={14}
                                className={`${percentageChange > 0 ? "rotate-45" : "-rotate-45"
                                    }`}
                                viewBox="0 0 384 512"
                            >
                                <path
                                    d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"
                                />
                            </svg>
                            <p
                                className={`text-xs leading-none ${percentageChange > 0 ? "text-green-700" : "text-red-700"
                                    }`}
                            >
                                {percentageChange.toFixed(2)}%
                            </p>
                        </div>
                    )}
                </div>
                <p className="mt-1 text-gray-400 text-xs">vs Last Month</p>
            </div>
        </div>
    );
}