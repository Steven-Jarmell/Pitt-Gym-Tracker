"use client";

import { Fragment, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/Container";

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
            <path
                d="M1.75 1.75 4 4.25l2.25-2.5"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function MobileNavItem({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Popover.Button as={Link} href={href} className="block py-2">
                {children}
            </Popover.Button>
        </li>
    );
}

function MobileNavigation(
    props: React.ComponentPropsWithoutRef<typeof Popover>
) {
    return (
        <Popover {...props}>
            <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
                Menu
                <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
                    >
                        <div className="flex flex-row-reverse items-center justify-between">
                            <Popover.Button
                                aria-label="Close menu"
                                className="-m-1 p-1"
                            >
                                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                            </Popover.Button>
                            <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                Navigation
                            </h2>
                        </div>
                        <nav className="mt-6">
                            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                                <MobileNavItem href="/">Baierl</MobileNavItem>
                                <MobileNavItem href="/Trees_Hall">
                                    Trees Hall
                                </MobileNavItem>
                                <MobileNavItem href="/Bellefield_Hall">
                                    Bellefield Hall
                                </MobileNavItem>
                                <MobileNavItem href="/Pitt_Sports_Dome">
                                    Pitt Sports Dome
                                </MobileNavItem>
                                <MobileNavItem href="/William_Pitt_Union">
                                    William Pitt Union
                                </MobileNavItem>
                            </ul>
                        </nav>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
}

function NavItem({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    let isActive = usePathname() === href;

    return (
        <li>
            <Link
                href={href}
                className={clsx(
                    "relative block px-3 py-2 transition",
                    isActive
                        ? "text-teal-500 dark:text-teal-400"
                        : "hover:text-teal-500 dark:hover:text-teal-400"
                )}
            >
                {children}
                {isActive && (
                    <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 " />
                )}
            </Link>
        </li>
    );
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
    return (
        <nav {...props}>
            <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
                <NavItem href="/">Baierl</NavItem>
                <NavItem href="/Trees_Hall">Trees Hall</NavItem>
                <NavItem href="/Bellefield_Hall">Bellefield Hall</NavItem>
                <NavItem href="/Pitt_Sports_Dome">Pitt Sports Dome</NavItem>
                <NavItem href="/William_Pitt_Union">William Pitt Union</NavItem>
            </ul>
        </nav>
    );
}

export default function NavTabs() {
    let isHomePage = usePathname() === "/";

    let headerRef = useRef<React.ElementRef<"div">>(null);

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-none flex-col"
                
            >
                {isHomePage && (
                    <>
                        <Container
                            className="top-0 order-last -mb-3 pt-3"
                            style={{
                                position:
                                    "var(--header-position)" as React.CSSProperties["position"],
                            }}
                        ></Container>
                    </>
                )}
                <div
                    ref={headerRef}
                    className="top-0 z-10 h-16 pt-6"
                    style={{
                        position:
                            "var(--header-position)" as React.CSSProperties["position"],
                    }}
                >
                    <Container
                        className="top-[var(--header-top,theme(spacing.6))] w-full"
                        style={{
                            position:
                                "var(--header-inner-position)" as React.CSSProperties["position"],
                        }}
                    >
                        <div className="relative flex gap-4">
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation className="pointer-events-auto md:hidden" />
                                <DesktopNavigation className="pointer-events-auto hidden md:block" />
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            {isHomePage && (
                <div
                    className="flex-none"
                    style={{ height: "var(--content-offset)" }}
                />
            )}
        </>
    );
}
