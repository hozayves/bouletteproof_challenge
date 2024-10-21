
import HeaderBar from "@/components/headerBar";
import { Navbar, Wrapper } from "@/components/Navbar";
import { useState } from "react";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <main className="flex h-auto min-h-screen max-h-auto p-2 flex-col gap-4 bg-gray-100">
                {/* Top Header */}
                <HeaderBar visible={visible} setVisible={setVisible} />
                <div className="flex flex-col md:w-[89%] lg:w-[92%] md:self-end gap-4 py-2">
                    {children}
                </div>
            </main>
            <Wrapper visible={visible}>
                {/* Sidebar Navigation */}
                <Navbar visible={visible} setVisible={setVisible} />
            </Wrapper>
            {/* <ReactQueryDevtools /> */}
        </>
    );
}