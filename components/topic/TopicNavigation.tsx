"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Topic } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TopicNavigationProps {
    currentSlug: string;
    topics: Topic[];
}

export function TopicNavigation({ currentSlug, topics }: TopicNavigationProps) {
    const currentIndex = topics.findIndex((t) => t.slug === currentSlug);
    const prevTopic = topics[currentIndex - 1];
    const nextTopic = topics[currentIndex + 1];
    const [showFloatingNext, setShowFloatingNext] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show floating next button after scrolling down a bit
            if (window.scrollY > 300) {
                setShowFloatingNext(true);
            } else {
                setShowFloatingNext(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Quick Jump Menu (Bottom Left) */}
            <div className="fixed bottom-8 left-8 z-40">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            className="h-12 w-12 rounded-full shadow-xl bg-zinc-900 text-white border border-zinc-800 hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Topics
                            </SheetTitle>
                        </SheetHeader>
                        <div className="space-y-2">
                            {topics.map((topic, index) => (
                                <Link
                                    key={topic.id}
                                    href={`/topics/${topic.slug}`}
                                    className={cn(
                                        "flex items-center p-3 rounded-lg transition-colors text-sm font-medium",
                                        topic.slug === currentSlug
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <span className="w-6 text-xs text-muted-foreground/50 mr-2">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    {topic.title}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Floating Previous Topic Preview (Bottom Left - Next to Menu) */}
            <AnimatePresence>
                {showFloatingNext && prevTopic && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 20, x: -20 }}
                        className="fixed bottom-8 left-24 z-40 hidden lg:block"
                    >
                        <Link href={`/topics/${prevTopic.slug}`}>
                            <div className="group flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-2 pl-6 rounded-full shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium">
                                        Previous Topic
                                    </span>
                                    <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                        {prevTopic.title}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <ArrowRight className="h-5 w-5 rotate-180" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Next Topic Preview (Bottom Right) */}
            <AnimatePresence>
                {showFloatingNext && nextTopic && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 20, x: 20 }}
                        className="fixed bottom-8 right-8 z-40 hidden lg:block"
                    >
                        <Link href={`/topics/${nextTopic.slug}`}>
                            <div className="group flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-2 pr-6 rounded-full shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium">
                                        Next Topic
                                    </span>
                                    <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                        {nextTopic.title}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
