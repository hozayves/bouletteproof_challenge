import React from "react";

interface WrapperProps {
    children: React.ReactNode;
    visible: boolean;
}

export default function Wrapper({ children, visible }: WrapperProps) {
    return (
        <div
            className={`md:translate-x-0 md:min-w-[100px] md:bg-transparent min-w-full h-full bg-[#000000c0] absolute top-0 left-0
        transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            {children}
        </div>
    );
}