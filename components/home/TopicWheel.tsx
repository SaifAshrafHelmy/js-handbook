"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";
import { Topic } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface TopicWheelProps {
    topics: Topic[];
}

export function TopicWheel({ topics }: TopicWheelProps) {
    const filteredTopics = topics.filter(t => t.slug !== 'interview-prep');
    const [activeIndex, setActiveIndex] = useState(0);

    const activeTopic = filteredTopics[activeIndex];

    // Auto-cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % filteredTopics.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [filteredTopics.length]);

    const goToPrevious = () => {
        setActiveIndex((prev) => (prev - 1 + filteredTopics.length) % filteredTopics.length);
    };

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % filteredTopics.length);
    };

    // Swipe handlers
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious(),
        trackMouse: false,
        trackTouch: true,
    });

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full">
            {/* Topic List - Always visible */}
            <div className="w-full lg:w-1/2 space-y-2">
                {filteredTopics.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        className={cn(
                            "group relative rounded-xl transition-all duration-300 cursor-pointer",
                            activeIndex === index
                                ? "bg-primary/10 border-2 border-primary/30"
                                : "border-2 border-transparent hover:border-border"
                        )}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: activeIndex === index ? 1.02 : 1,
                        }}
                        transition={{
                            delay: index * 0.05,
                            scale: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                        onClick={() => setActiveIndex(index)}
                    >
                        <div
                            onMouseEnter={() => setActiveIndex(index)}
                            className="flex items-center p-4"
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold mr-4 transition-colors flex-shrink-0",
                                    activeIndex === index
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                                )}
                            >
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span
                                    className={cn(
                                        "text-base font-semibold transition-colors block truncate",
                                        activeIndex === index ? "text-primary" : "text-foreground"
                                    )}
                                >
                                    {topic.title}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {topic.category}
                                </span>
                            </div>
                        </div>
                        {activeIndex === index && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Preview Card */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                {/* Mobile Navigation Dots */}
                <div className="flex lg:hidden justify-center items-center gap-3 mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPrevious}
                        className="h-9 w-9 rounded-full"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex gap-1.5">
                        {filteredTopics.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all",
                                    activeIndex === index
                                        ? "w-8 bg-primary"
                                        : "w-1.5 bg-muted-foreground/30"
                                )}
                                aria-label={`Go to topic ${index + 1}`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNext}
                        className="h-9 w-9 rounded-full"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                {/* Swipeable Card */}
                <div {...swipeHandlers} className="touch-pan-y">
                    <AnimatePresence mode="wait">
                        {activeTopic && (
                            <motion.div
                                key={activeTopic.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 shadow-xl"
                            >
                                <div className="space-y-6">
                                    {/* Topic Number and Title */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary text-lg font-bold flex-shrink-0">
                                            {activeIndex + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-foreground mb-2">
                                                {activeTopic.title}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                {activeTopic.category}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {activeTopic.description}
                                    </p>

                                    {/* Key Concepts */}
                                    {activeTopic.keyConcepts && (
                                        <div>
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                                Key Concepts
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeTopic.keyConcepts.map((concept) => (
                                                    <span
                                                        key={concept}
                                                        className="px-3 py-1.5 text-sm rounded-lg bg-muted border border-border"
                                                    >
                                                        {concept}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <Link href={`/topics/${activeTopic.slug}`}>
                                        <Button
                                            className="w-full sm:w-auto h-11 px-6 rounded-xl group"
                                            size="lg"
                                        >
                                            Start Learning
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
