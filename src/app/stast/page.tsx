'use client'
import { CustomerGrowth, WebsiteVisit } from "@/components/graphs";
import HeaderBar from "@/components/headerBar";
import Navbar, { Wrapper } from "@/components/navbar";
import StatisticsCard from "@/components/overview";
import React, { useState } from "react";

export default function Statistic() {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <div className="flex h-auto min-h-screen max-h-auto  p-2 flex-col bg-gray-100">
                {/* Top Header */}
                <HeaderBar visible={visible} setVisible={setVisible} />
                <div className="flex flex-col md:w-[89%] lg:w-[92%] md:self-end gap-4">
                    <p className="leading-none text-xl px-1 mt-4">Hey, Yves Muhoza</p>
                    {/*  */}
                    <StatisticsCard />
                </div>
                <div className="flex flex-col md:flex-row md:gap-3 justify-center items-start gap-2 md:w-[89%] lg:w-[92%] md:self-end p-2 rounded-md">
                    {/* Graph showing */}
                    <WebsiteVisit />
                    <CustomerGrowth />
                </div>
            </div>
            <Wrapper visible={visible} >
                {/* Sidebar Navigation */}
                <Navbar visible={visible} setVisible={setVisible} />
            </Wrapper>
        </>
    )
}