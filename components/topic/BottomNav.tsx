"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Topic } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BottomNavProps {
    prevTopic?: Topic;
    nextTopic?: Topic;
    allTopics: Topic[];
    currentSlug: string;
}

export function BottomNav({ prevTopic, nextTopic, allTopics, currentSlug }: BottomNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const currentTopic = allTopics.find(t => t.slug === currentSlug);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
            <div className="bg-gradient-to-t from-background via-background to-transparent pt-8 pb-safe">
                <div className="container max-w-screen-xl px-4">
                    <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20 p-2 flex items-center justify-between gap-2">
                        {/* Previous Button */}
                        {prevTopic ? (
                            <Link href={`/topics/${prevTopic.slug}`} className="flex-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-12 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                                    <span className="hidden sm:inline truncate">Prev</span>
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex-1" />
                        )}

                        {/* Menu Button */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="h-12 px-4 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/30 transition-all"
                                >
                                    <Menu className="w-4 h-4 mr-2" />
                                    <span className="font-semibold truncate max-w-[120px]">
                                        {currentTopic?.title || "Topics"}
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
                                <SheetHeader className="mb-6">
                                    <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                        All Topics
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="space-y-2 overflow-y-auto max-h-[calc(80vh-120px)] pb-4">
                                    {allTopics.map((topic, index) => (
                                        <Link
                                            key={topic.id}
                                            href={`/topics/${topic.slug}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                className={cn(
                                                    "flex items-center gap-3 p-4 rounded-xl transition-all",
                                                    topic.slug === currentSlug
                                                        ? "bg-primary/10 border-2 border-primary/30"
                                                        : "bg-muted/30 border-2 border-transparent hover:border-primary/20 hover:bg-primary/5"
                                                )}
                                            >
                                                <div className={cn(
                                                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0",
                                                    topic.slug === currentSlug
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted text-muted-foreground"
                                                )}>
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        "font-semibold truncate",
                                                        topic.slug === currentSlug ? "text-primary" : "text-foreground"
                                                    )}>
                                                        {topic.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {topic.category}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Next Button */}
                        {nextTopic ? (
                            <Link href={`/topics/${nextTopic.slug}`} className="flex-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-12 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
                                >
                                    <span className="hidden sm:inline truncate">Next</span>
                                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex-1" />
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
