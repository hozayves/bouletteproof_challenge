import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { Skeleton } from '../components'
import { useGetOverview } from "@/hooks/useOverview";

interface ChartDataPoint {
    name: string;
    view: number;
    amt: number;
}

export default function WebsiteVisit() {
    const { data, isError, isPending, error } = useGetOverview();

    if (isPending) {
        return <LoadingSkeleton />;
    }

    if (isError) {
        return <ErrorMessage message={error.message} />;
    }

    const chartData = prepareChartData(data);

    return (
        <div className="w-full border h-[300px] lg:h-[400px] xl:h-[420px] bg-white rounded-md p-3 py-4 flex flex-col gap-2">
            <h4 className="text-lg leading-none font-semibold">Customer Visits (Last 30 Days)</h4>
            <div className="h-full">
                <VisitChart data={chartData} />
            </div>
        </div>
    );
}

export function LoadingSkeleton() {
    return (
        <div className="w-full">
            <Skeleton height={410} />
        </div>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return <p>Error: {message}</p>;
}

function VisitChart({ data }: { data: ChartDataPoint[] }) {
    return (
        <ResponsiveContainer>
            <LineChart
                width={500}
                height={400}
                data={data}
                margin={{ top: 5, right: -10, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="view" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}
type visitData = {
    visit_timestamp: string;
}
function prepareChartData(data: visitData[]): ChartDataPoint[] {
    const now = dayjs();
    const filteredData = data.filter(visit => {
        const visitDate = dayjs(visit.visit_timestamp);
        return now.diff(visitDate, 'day') <= 30;
    });

    const aggregatedData = filteredData.reduce<Record<string, ChartDataPoint>>((acc, visit) => {
        const day = dayjs(visit.visit_timestamp).format("MMM D");
        if (!acc[day]) {
            acc[day] = { name: day, view: 0, amt: 0 };
        }
        acc[day].view += 1;
        acc[day].amt += 1;
        return acc;
    }, {});

    const chartData = Object.values(aggregatedData);
    return chartData.sort((a, b) => dayjs(a.name, "MMM D").diff(dayjs(b.name, "MMM D")));
}
