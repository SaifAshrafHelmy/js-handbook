"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { SearchCommand } from "@/components/layout/SearchCommand";

const routes = [
    {
        href: "/",
        label: "Core Concepts",
        icon: BookOpen,
    },
    {
        href: "/hof",
        label: "Array Methods",
        icon: Code,
    },
    {
        href: "/topics/interview-prep",
        label: "Interview Prep",
        icon: BookOpen,
    },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block ml-6">
                            JS Handbook
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === route.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <Link
                            href="/"
                            className="flex items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="font-bold">JS Handbook</span>
                        </Link>
                        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                            <div className="flex flex-col space-y-3">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-foreground/70 transition-colors hover:text-foreground",
                                            pathname === route.href && "text-foreground"
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <SearchCommand />
                    </div>
                </div>
            </div>
        </header>
    );
}
