import React from "react";
import { Skeleton } from '../components';
import { useOverviewData } from "@/hooks/useOverviewData";
import { formatStatValue } from "@/lib/formatters";
import PercentageChange from "./PercentageChange";

interface OverviewCardProps {
    title: string;
    statKey: string;
    showPercentage?: boolean;
}

export default function OverviewCard({ title, statKey, showPercentage = true }: OverviewCardProps) {
    const { statValue, percentageChange, isLoading, error } = useOverviewData(statKey);

    if (isLoading) {
        return (
            <div className="w-full">
                <Skeleton height={123} />
            </div>
        );
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="w-full">
            <div className="border w-full min-w-full flex flex-col p-3 rounded-lg bg-white">
                <p className="text-lg">{title}</p>
                <div className="flex align-center gap-14 md:gap-5 mt-4">
                    <p className="font-medium text-3xl">
                        {formatStatValue(statValue, statKey)}
                    </p>
                    {showPercentage && (
                        <PercentageChange value={percentageChange ?? 0} />
                    )}
                </div>
                <p className="mt-1 text-gray-400 text-xs">vs Last Month</p>
            </div>
        </div>
    );
}