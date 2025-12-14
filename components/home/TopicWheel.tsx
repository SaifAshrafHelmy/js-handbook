"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Topic } from "@/lib/types";

interface TopicWheelProps {
    topics: Topic[];
}

export function TopicWheel({ topics }: TopicWheelProps) {
    const filteredTopics = topics.filter(t => t.slug !== 'interview-prep');
    const [activeId, setActiveId] = useState<string | null>(filteredTopics[0]?.id || null);

    const activeTopic = filteredTopics.find((t) => t.id === activeId);

    return (
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start justify-center min-h-[400px] md:min-h-[600px] w-full">
            {/* Topic List */}
            <div className="w-full lg:w-1/2 space-y-1.5 md:space-y-2">
                {filteredTopics.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        className={cn(
                            "group relative rounded-xl transition-all duration-300",
                            activeId === topic.id
                                ? "bg-primary/10 border-primary/20"
                                : "border-transparent"
                        )}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: activeId === topic.id ? 1.05 : 1,
                            paddingLeft: activeId === topic.id ? "1.5rem" : "1rem"
                        }}
                        transition={{
                            delay: index * 0.05,
                            scale: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                    >
                        <Link
                            href={`/topics/${topic.slug}`}
                            onMouseEnter={() => setActiveId(topic.id)}
                            onClick={() => setActiveId(topic.id)}
                            className="flex items-center p-3 md:p-4 w-full md:w-fit"
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-bold mr-3 md:mr-4 transition-colors flex-shrink-0",
                                    activeId === topic.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                                )}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={cn(
                                    "text-base md:text-lg font-medium transition-colors",
                                    activeId === topic.id ? "text-primary font-bold text-lg md:text-xl" : "text-foreground/80"
                                )}
                            >
                                {topic.title}
                            </span>
                        </Link>
                        {activeId === topic.id && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Preview Card */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                <AnimatePresence mode="wait">
                    {activeTopic && (
                        <motion.div
                            key={activeTopic.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 bg-gradient-to-br from-card to-muted/20 p-5 md:p-8 shadow-2xl h-full group hover:border-primary/50 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <Code className="w-48 h-48" />
                            </div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    {activeTopic.category}
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors">{activeTopic.title}</h2>
                                <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                                    {activeTopic.description}
                                </p>

                                {activeTopic.keyConcepts && (
                                    <div className="mb-8">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Concepts</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {activeTopic.keyConcepts.map((concept) => (
                                                <span key={concept} className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                                                    {concept}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Link href={`/topics/${activeTopic.slug}`} className="inline-block">
                                    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 group-hover:translate-x-2 transition-transform">
                                        Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
