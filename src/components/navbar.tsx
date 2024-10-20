'use client'

import { NavMenu } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Navbar({ visible, setVisible }: { visible: boolean, setVisible: any }) {
    // handle visibility state based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [setVisible]);

    return (
        <>
            <div
                className={`border rounded-lg h-[97%] w-[75px] sticky top-2 left-2 bg-white p-2 flex flex-col justify-start items-center gap-10
                transition-transform duration-500 ease-in-out transform ${visible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                style={{ zIndex: 10 }}
            >
                <div>
                    <Image
                        src="/assets/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                    />
                    <button
                        onClick={() => setVisible(false)}
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
                </div>
                <ul className="flex flex-col items-center gap-3">
                    {NavMenu.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link} className="border rounded-md p-1 bg-violet-200 hover:bg-violet-300 transition-all delay-50 ease-in-out w-[40px] h-[40px] flex justify-center items-center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={25}
                                    height={25}
                                />
                            </Link>
                        </li>
                    ))}
                    <li>

                    </li>
                </ul>
            </div>
        </>
    );
}

export const Wrapper = ({ children, visible }: { children: any, visible: boolean }) => {
    return (
        <>
            <div
                className={` min-w-full md:bg-transparent  h-full bg-[#000000c0] absolute top-0 left-0
                transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                {children}
            </div>
        </>
    );
}
