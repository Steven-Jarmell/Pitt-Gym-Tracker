import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Header from "@/components/Header/Header"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pitt Gym Tracker",
  description:
    "View data from various University of Pittsburgh Facilities in a graphical format with trend lines and predictions",
  robots: "any",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex flex-col bg-[#F0F4F8] dark:bg-[#040D12] h-full">
        <Providers>
          <Header />
          <main
            className={`${inter.className} flex flex-col items-center gap-2`}
          >
            {children}
          </main>
          <span className="text-sm font-semibold leading-7 text-gray-400 text-center dark:text-gray-70 mt-auto">
            Made by Steven Jarmell | 2024
          </span>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
