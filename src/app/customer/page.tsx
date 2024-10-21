'use client'
import HeaderBar from "@/components/headerBar";
import Navbar, { Wrapper } from "@/components/navbar";
import React, { useState } from "react";

export default function Customer() {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <div className="flex h-auto min-h-screen max-h-auto  p-2 flex-col bg-gray-100">
                {/* Top Header */}
                <HeaderBar visible={visible} setVisible={setVisible} />
            </div>
            <Wrapper visible={visible} >
                {/* Sidebar Navigation */}
                <Navbar visible={visible} setVisible={setVisible} />
            </Wrapper>
        </>
    )
}