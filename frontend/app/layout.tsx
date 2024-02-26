import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Header from "@/components/Header/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pitt Gym Tracker",
  description:
    "Website to display Pitt Gym data in a graphical format with predictions about how busy it will be in the future",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex flex-col bg-[#F0F4F8] dark:bg-[#040D12]">
        <Providers>
          <Header />
          <main
            className={`${inter.className} flex flex-col items-center gap-2 md:p-12 sm:p-0`}
          >
            {children}
          </main>
          <span className="text-sm font-semibold leading-7 text-gray-400 sm:truncate sm:tracking-tight text-center dark:text-gray-700">
            Made by Steven Jarmell | 2024
          </span>
        </Providers>
      </body>
    </html>
  )
}
