"use client";

import NavTabs from "@/components/Navigation/NavTabs";
import Graphs from "@/components/graphs";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <NavTabs />
            <Graphs />
        </main>
    );
}
