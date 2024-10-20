import Image from "next/image";
import React from "react";

export default function HeaderBar({ visible, setVisible }: { visible: boolean, setVisible: any }) {
    return (
        <div className="bg-white rounded-lg border w-full md:w-[89%] md:self-end h-[50px] flex justify-between items-center px-2">
            <div className="flex justify-between items-center">
                {!visible && (
                    <button onClick={() => setVisible(true)}>
                        <Image
                            src="/assets/menu.png"
                            alt="humberg icon"
                            width={35}
                            height={35}
                        />
                    </button>
                )}
                <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="md:hidden"
                />
            </div>
            <div className="rounded-full border w-[35px] h-[35px]">
                <Image
                    src="/assets/favicon.ico"
                    alt="Loggedin user"
                    width={35}
                    height={35}
                />
            </div>
        </div>
    )
}