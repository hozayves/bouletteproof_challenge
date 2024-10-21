'use client'

import React, { useEffect } from "react";
import Image from "next/image";
import { NavMenu } from "@/constant/navbar";
import NavbarItem from "./NavbarItem";
import CloseButton from "./CloseButton";

interface NavbarProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ visible, setVisible }: NavbarProps) {
    useEffect(() => {
        const handleResize = () => {
            setVisible(window.matchMedia("(min-width: 768px)").matches);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setVisible]);

    return (
        <nav
            className={`border rounded-lg h-[97%] w-[75px] sticky top-2 left-2 bg-white p-2 flex flex-col justify-start items-center gap-10
        transition-transform duration-500 ease-in-out transform ${visible ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            style={{ zIndex: 10 }}
        >
            <div>
                <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                />
                <CloseButton onClick={() => setVisible(false)} />
            </div>
            <ul className="flex flex-col items-center gap-3">
                {NavMenu.map((item, index) => (
                    <NavbarItem key={index} item={item} />
                ))}
            </ul>
        </nav>
    );
}