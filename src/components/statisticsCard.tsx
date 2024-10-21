import React from "react";
import OverviewCard from "./OverviewCard";

export default function StatisticsCard() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-start md:gap-3 gap-2 p-2 rounded-md ">
            <OverviewCard title="Total Visitor" statKey="visitors" showPercentage={true} />
            <OverviewCard title="Bounce Rate" statKey="bounce_rate" />
            <OverviewCard title="Av. Session Duration" statKey="session_duration" />
        </div>
    );
}