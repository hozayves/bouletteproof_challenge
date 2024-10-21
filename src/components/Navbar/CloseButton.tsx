import React from "react";
import Image from "next/image";

interface CloseButtonProps {
    onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className="md:hidden rounded-full bg-white border p-1 z-10 absolute top-0 right-[-30px]"
        >
            <Image
                src="/assets/close.svg"
                alt="close navbar"
                width={40}
                height={40}
                className="w-[18px] h-[18px]"
            />
        </button>
    );
}