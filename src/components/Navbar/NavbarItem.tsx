import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavMenuItem } from "@/constant/navbar";

interface NavbarItemProps {
    item: NavMenuItem;
}

export default function NavbarItem({ item }: NavbarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === item.link;

    return (
        <li>
            <Link
                href={item.link}
                className={`border rounded-md p-1 transition-all delay-50 ease-in-out w-[40px] h-[40px] flex justify-center items-center ${isActive ? 'bg-violet-400' : 'bg-violet-200 hover:bg-violet-300'
                    }`}
            >
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
