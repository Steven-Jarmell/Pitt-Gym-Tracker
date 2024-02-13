"use client"

import Graphs from "@/components/graphs";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Pitt Gyms
                </h1>
                <Graphs />
            </div>
        </main>
    );
}
