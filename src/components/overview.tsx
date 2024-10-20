import React from "react";

export default function OverviewCard() {
    return (
        <div className="w-full">
            <div className="border w-full min-w-full flex flex-col p-3 rounded-lg bg-white">
                <p className="text-lg">Total Visitors</p>
                <div className="flex align-center gap-14 md:gap-5 mt-4">
                    <p className="font-medium text-3xl">632</p>
                    <div className="flex justify-center items-center bg-green-100 rounded-full px-3 h-[28px] self-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} className="rotate-45" viewBox="0 0 384 512">
                            <path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z" />
                        </svg>
                        <p className="text-xs leading-none text-green-700">15%</p>
                    </div>
                </div>
                <p className="mt-1 text-gray-400 text-xs">vs Last Month</p>
            </div>
        </div>
    )
}