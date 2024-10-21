'use client'
import StatisticsCard from "@/components/statisticsCard";
import ViewsByCountry from "@/components/viewsCountry";
import WebsiteVisit from "@/components/websiteViews";

export default function Statistic() {

  return (
    <>
      {/* <h1 className="text-xl px-1 mt-4">Hey, Yves Muhoza</h1> */}
      <StatisticsCard />
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 justify-center items-start p-2 rounded-md">
        <WebsiteVisit />
        <ViewsByCountry />
      </div>
    </>
  );
}
