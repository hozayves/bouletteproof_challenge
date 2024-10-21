import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavMenuItem } from "@/constant/navbar";

interface NavbarItemProps {
    item: NavMenuItem;
}

export default function NavbarItem({ item }: NavbarItemProps) {

    return (
        <li>
            <Link href={item.link} className="border rounded-md p-1 bg-violet-200 hover:bg-violet-300 transition-all delay-50 ease-in-out w-[40px] h-[40px] flex justify-center items-center">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={25}
                    height={25}
                />
            </Link>
        </li>
    );
}