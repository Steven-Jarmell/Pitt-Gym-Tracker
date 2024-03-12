"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

function SunIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ToggleThemeButton = () => {
  let { resolvedTheme, setTheme } = useTheme()
  let otherTheme = resolvedTheme === "dark" ? "light" : "dark"
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-[var(--dark-secondary-bg-color)] dark:ring-[var(--dark-outline-color)] dark:hover:ring-[var(--dark-hover-outline-color)]"
        onClick={() => {
          console.log(`switching to ${otherTheme}`)
          setTheme(otherTheme)
        }}
        data-testid="toggle-theme-button"
      >
        <SunIcon className="h-6 w-6 fill-zinc-100 stroke-[var(--primary-text-color)] transition group-hover:fill-[var(--primary-text-color)] group-hover:stroke-[var(--primary-text-color)] dark:hidden [@media(prefers-color-scheme:dark)]:fill-[var(--primary-text-color)] [@media(prefers-color-scheme:dark)]:stroke-[var(--primary-text-color)] [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-[var(--primary-text-color)]" />
        <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-[var(--primary-text-color)] transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:[var(--primary-text-color)] [@media_not_(prefers-color-scheme:dark)]:fill-[var(--primary-text-color)] [@media_not_(prefers-color-scheme:dark)]:stroke-[var(--primary-text-color)]" />
      </button>
    </>
  )
}

export default ToggleThemeButton
