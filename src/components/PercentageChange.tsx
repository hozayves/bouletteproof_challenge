import React from "react";

interface PercentageChangeProps {
    value: number | undefined;
}

export default function PercentageChange({ value }: PercentageChangeProps) {
    const isPositive = value && value > 0;
    return (
        <div
            className={`flex justify-center items-center rounded-full px-3 h-[28px] self-center gap-1 ${isPositive ? "bg-green-100" : "bg-red-100"
                }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                className={isPositive ? "rotate-45" : "-rotate-45"}
                viewBox="0 0 384 512"
            >
                <path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z" />
            </svg>
            <p className={`text-xs leading-none ${isPositive ? "text-green-700" : "text-red-700"}`}>
                {value ? value.toFixed(2) : "0.00"}%
            </p>
        </div>
    );
}