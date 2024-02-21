import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavTabs from "@/components/Navigation/NavTabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pitt Gym Tracker",
    description:
        "Website to display Pitt Gym data in a graphical format with predictions about how busy it will be in the future",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full antialiased" suppressHydrationWarning>
            <body className="flex flex-col bg-zinc-50">
                <NavTabs />
                <main
                    className={`${inter.className} flex flex-col items-center gap-2 md:p-12 sm:p-0`}
                >
                    {children}
                </main>
            </body>
        </html>
    );
}
