import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useGetOverview } from "../hooks/useOverview";
import { LoadingSkeleton } from "./websiteViews";

interface CountryVisit {
    name: string;
    visits: number;
}

export default function ViewsByCountry() {
    const { data, isError, isPending, error } = useGetOverview();

    if (isPending) {
        return <LoadingSkeleton />;
    }

    if (isError) {
        return <ErrorMessage message={error.message} />;
    }

    const chartData = aggregateVisitsByCountry(data);

    return (
        <div className="w-full border h-[300px] lg:h-[400px] xl:h-[420px] bg-white rounded-md p-3 py-4 flex flex-col gap-2">
            <h4 className="text-lg leading-none font-semibold">Customer Visits by Country</h4>
            <div className="w-full h-[300px] lg:h-[400px] xl:h-[420px]">
                <VisitsBarChart data={chartData} />
            </div>
        </div>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return <p>Error: {message}</p>;
}

type Visit = {
    geo_location: string;
}
function aggregateVisitsByCountry(data: Visit[]): CountryVisit[] {
    const visitsByCountry = data.reduce((acc: Record<string, CountryVisit>, visit) => {
        const country = visit.geo_location;
        if (!acc[country]) {
            acc[country] = { name: country, visits: 0 };
        }
        acc[country].visits += 1;
        return acc;
    }, {});

    return Object.values(visitsByCountry);
}

function VisitsBarChart({ data }: { data: CountryVisit[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                width={500}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
