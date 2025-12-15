"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Sparkles, ChevronLeft, ChevronRight, Clock, BookOpen, Zap } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";
import { Topic } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface TopicWheelProps {
    topics: Topic[];
}

// Get time-based greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

// Get estimated reading time
function getReadingTime(topic: Topic): string {
    const wordCount = topic.content?.split(' ').length || 500;
    const minutes = Math.ceil(wordCount / 200); // Average reading speed
    return `${minutes} min read`;
}

export function TopicWheel({ topics }: TopicWheelProps) {
    const filteredTopics = topics.filter(t => t.slug !== 'interview-prep');
    const [activeIndex, setActiveIndex] = useState(0);
    const [greeting, setGreeting] = useState("");

    const activeTopic = filteredTopics[activeIndex];

    // Set greeting on mount
    useEffect(() => {
        setGreeting(getGreeting());
    }, []);

    // Auto-cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % filteredTopics.length);
        }, 6000); // Increased to 6 seconds for better UX

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
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start justify-center min-h-[400px] md:min-h-[600px] w-full">
            {/* Topic List - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block w-full lg:w-1/2 space-y-1.5 md:space-y-2">
                {filteredTopics.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        className={cn(
                            "group relative rounded-xl transition-all duration-300",
                            activeIndex === index
                                ? "bg-primary/10 border-primary/20"
                                : "border-transparent"
                        )}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: activeIndex === index ? 1.05 : 1,
                            paddingLeft: activeIndex === index ? "1.5rem" : "1rem"
                        }}
                        transition={{
                            delay: index * 0.05,
                            scale: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                    >
                        <Link
                            href={`/topics/${topic.slug}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => setActiveIndex(index)}
                            className="flex items-center p-3 md:p-4 w-full md:w-fit"
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-bold mr-3 md:mr-4 transition-colors flex-shrink-0",
                                    activeIndex === index
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                                )}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={cn(
                                    "text-base md:text-lg font-medium transition-colors",
                                    activeIndex === index ? "text-primary font-bold text-lg md:text-xl" : "text-foreground/80"
                                )}
                            >
                                {topic.title}
                            </span>
                        </Link>
                        {activeIndex === index && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Preview Card with Mobile Navigation */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                {/* Mobile: Greeting and Stats */}
                <motion.div
                    className="lg:hidden mb-6 space-y-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {greeting}, Developer! ✨
                    </h2>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 mb-1">
                                <BookOpen className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs text-muted-foreground">Topics</span>
                            </div>
                            <p className="text-xl font-bold text-primary">{filteredTopics.length}</p>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 mb-1">
                                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-xs text-muted-foreground">Methods</span>
                            </div>
                            <p className="text-xl font-bold text-emerald-500">33</p>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 mb-1">
                                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                                <span className="text-xs text-muted-foreground">Active</span>
                            </div>
                            <p className="text-xl font-bold text-cyan-500">{activeIndex + 1}/{filteredTopics.length}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Cycling Indicator */}
                <div className="flex lg:hidden justify-center items-center gap-3 mb-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPrevious}
                        className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex gap-1.5">
                        {filteredTopics.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    activeIndex === index
                                        ? "w-8 bg-primary shadow-lg shadow-primary/50"
                                        : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                )}
                                aria-label={`Go to topic ${index + 1}`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNext}
                        className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                {/* Swipeable Card Container */}
                <div {...swipeHandlers} className="touch-pan-y">
                    <AnimatePresence mode="wait">
                        {activeTopic && (
                            <motion.div
                                key={activeTopic.id}
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-muted/20 p-6 md:p-8 shadow-2xl group hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300"
                                style={{
                                    backgroundImage: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.05), transparent 50%)"
                                }}
                            >
                                {/* Decorative Background */}
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                                    <Code className="w-48 h-48 text-primary" />
                                </div>

                                {/* Glassmorphism overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                                <div className="relative z-10">
                                    {/* Category Badge */}
                                    <motion.div
                                        className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-primary mb-4 md:mb-6 shadow-lg shadow-primary/10"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                                        {activeTopic.category}
                                    </motion.div>

                                    {/* Mobile: Show topic number and title */}
                                    <div className="flex lg:hidden items-center gap-3 mb-4">
                                        <motion.div
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-bold flex-shrink-0 shadow-lg shadow-primary/30"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            {activeIndex + 1}
                                        </motion.div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                            {activeTopic.title}
                                        </h2>
                                    </div>

                                    {/* Desktop: Just show title */}
                                    <h2 className="hidden lg:block text-2xl md:text-3xl font-bold mb-4 md:mb-5 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                        {activeTopic.title}
                                    </h2>

                                    {/* Reading Time Badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            {getReadingTime(activeTopic)}
                                        </div>
                                    </div>

                                    <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                                        {activeTopic.description}
                                    </p>

                                    {activeTopic.keyConcepts && (
                                        <div className="mb-6 md:mb-8">
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                                <Sparkles className="w-3 h-3" />
                                                Key Concepts
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeTopic.keyConcepts.map((concept, idx) => (
                                                    <motion.span
                                                        key={concept}
                                                        className="inline-flex items-center rounded-lg bg-gradient-to-br from-muted to-muted/50 px-3 py-1.5 text-xs font-medium border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                    >
                                                        {concept}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Link href={`/topics/${activeTopic.slug}`} className="inline-block">
                                        <motion.div
                                            className="inline-flex items-center justify-center rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/30 h-11 px-6 py-2 transition-all"
                                            whileHover={{ scale: 1.05, x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            Start Learning
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </motion.div>
                                    </Link>

                                    {/* Swipe Hint (only on mobile) */}
                                    <motion.p
                                        className="lg:hidden text-xs text-muted-foreground/60 text-center mt-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                    >
                                        👆 Swipe to explore more topics
                                    </motion.p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
