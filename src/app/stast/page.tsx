'use client'
import HeaderBar from "@/components/headerBar";
import Navbar, { Wrapper } from "@/components/navbar";
import OverviewCard from "@/components/overview";
import Image from "next/image";
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
                    <div className="flex flex-col md:flex-row justify-center items-start md:gap-3 gap-2 p-2 rounded-md ">
                        <OverviewCard />
                        <OverviewCard />
                        <OverviewCard />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:gap-3 justify-center items-start gap-2 md:w-[89%] lg:w-[92%] md:self-end p-2 rounded-md">
                    <div className="w-full border h-[300px] lg:h-[400px] xl:h-[420px] bg-white rounded-md p-3 py-4 flex flex-col gap-2">
                        <h4 className="text-lg leading-none font-semibold">Customer Visits</h4>
                        <div>Graph here</div>
                    </div>
                    <div className="w-full border h-[300px] lg:h-[400px] xl:h-[420px] bg-white rounded-md p-3 py-4 flex flex-col gap-2">
                        <h4 className="text-lg leading-none font-semibold">Customer Visits</h4>
                        <div>Graph here</div>
                    </div>
                </div>
            </div>
            <Wrapper visible={visible} >
                {/* Sidebar Navigation */}
                <Navbar visible={visible} setVisible={setVisible} />
            </Wrapper>
        </>
    )
}