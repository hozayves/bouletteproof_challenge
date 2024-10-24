"use client";

import React, { useEffect } from "react";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <button onClick={() => reset()} className="bg-violet-500 text-white px-4 py-2 rounded-md">Try again</button>
    </div>;
}
