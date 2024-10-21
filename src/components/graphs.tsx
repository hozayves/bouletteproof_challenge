import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

export const WebsiteVisit = () => {
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

    // Filter data for the last 30 days
    const now = dayjs();
    const filteredData = data.filter(visit => {
        const visitDate = dayjs(visit.visit_timestamp);
        return now.diff(visitDate, 'day') <= 30;  // Keep only visits from the last 30 days
    });

    // Group data by day (e.g., "Oct 20")
    const aggregatedData = filteredData.reduce((acc, visit) => {
        const day = dayjs(visit.visit_timestamp).format("MMM D");
        if (!acc[day]) {
            acc[day] = { name: day, view: 0, amt: 0 };
        }
        acc[day].view += 1; // Increment view count for each visit
        acc[day].amt += 1;  // Increment visitor count (could be unique in your case)
        return acc;
    }, {});

    // Convert aggregated object into an array for recharts
    const chartData = Object.values(aggregatedData);

    return (
        <div className="w-full border h-[300px] lg:h-[400px] xl:h-[420px] bg-white rounded-md p-3 py-4 flex flex-col gap-2">
            <h4 className="text-lg leading-none font-semibold">Customer Visits (Last 30 Days)</h4>
            <div className="border h-full">
                <ResponsiveContainer>
                    <LineChart width={500} height={400} data={chartData}
                        margin={{ top: 5, right: -10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="view" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export const CustomerGrowth = () => {
    return (
        <div className="w-full border h-[300px] lg:h-[400px] xl:h-[420px] bg-white rounded-md p-3 py-4 flex flex-col gap-2">
            <h4 className="text-lg leading-none font-semibold">Customer Visits</h4>
            <div className="">Graph here</div>
        </div>
    )
}