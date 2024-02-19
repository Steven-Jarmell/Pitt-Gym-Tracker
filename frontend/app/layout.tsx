import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavTabs from "@/components/Navigation/NavTabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
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
                <main className="flex flex-col items-center gap-2 p-12">
                    {children}
                </main>
            </body>
        </html>
    );
}
