"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Code2, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hofs } from "@/data/hofs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HOFNavigation } from "@/components/hof/HOFNavigation";

export default function HOFDetailPage() {
    const params = useParams();
    const slug = params.id as string;
    const hof = hofs.find((h) => h.id === slug);
    const [isFocused, setIsFocused] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    if (!hof) {
        notFound();
    }

    return (
        <div className="container py-12 lg:py-16 max-w-screen-xl px-4 md:px-8">
            {/* Focus Mode Overlay */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/100 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setIsFocused(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-xl shadow-2xl"
                        >
                            <div className="p-6 md:p-10 space-y-8">
                                <div className="flex items-center justify-between border-b border-border/40 pb-6">
                                    <div className="flex items-center gap-3">
                                        <Play className="w-6 h-6 text-primary fill-current" />
                                        <h2 className="text-2xl font-bold">Practice Challenge: .{hof.name}()</h2>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setIsFocused(false)}>
                                        Close
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 text-foreground">Question:</h4>
                                        <p className="text-xl text-muted-foreground leading-relaxed">
                                            {hof.practice?.question}
                                        </p>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <Button
                                            onClick={() => setShowAnswer(!showAnswer)}
                                            size="lg"
                                            className="w-full text-lg h-12"
                                            variant={showAnswer ? "secondary" : "default"}
                                        >
                                            {showAnswer ? "Hide Answer" : "Show Answer"}
                                        </Button>

                                        <AnimatePresence>
                                            {showAnswer && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="rounded-xl bg-black/40 p-6 md:p-8 font-mono text-base md:text-lg border border-border/30 overflow-x-auto mt-4 shadow-inner">
                                                        <div className="flex items-center gap-2 text-emerald-400 mb-4 text-sm font-bold uppercase tracking-wider">
                                                            <CheckCircle2 className="w-5 h-5" /> Solution
                                                        </div>
                                                        <pre className="whitespace-pre text-muted-foreground leading-relaxed">
                                                            {hof.practice?.answer.trim()}
                                                        </pre>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-8">
                <Link
                    href="/hof"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Methods
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-primary bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                        .{hof.name}()
                    </h1>
                    <Badge variant="outline" className="text-lg py-1 px-3 border-primary/20 bg-primary/5 text-primary">
                        Array Method
                    </Badge>
                </div>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                    {hof.description}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                <div className="space-y-8">
                    {/* Main Content */}
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-primary" />
                                Syntax & Usage
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                    Basic Example
                                </h3>
                                <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm border border-border/30 overflow-x-auto">
                                    {hof.example}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                    Real-World Usage
                                </h3>
                                <p className="text-lg text-muted-foreground mb-4">{hof.usage}</p>
                                {hof.richExample && (
                                    <div className="rounded-lg bg-black/40 p-4 font-mono text-sm border border-border/30 overflow-x-auto shadow-inner">
                                        <pre className="whitespace-pre">{hof.richExample.trim()}</pre>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Practice Section */}
                <div className="space-y-6">
                    <div className="sticky top-24">
                        <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
                            <CardHeader className="bg-primary/10 border-b border-primary/10">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Play className="w-5 h-5 fill-current" />
                                    Practice Challenge
                                </CardTitle>
                                <CardDescription>
                                    Test your understanding of .{hof.name}()
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {hof.practice ? (
                                    <>
                                        <div>
                                            <h4 className="font-semibold mb-2 text-foreground">Question:</h4>
                                            <p className="text-muted-foreground leading-relaxed line-clamp-3">
                                                {hof.practice.question}
                                            </p>
                                        </div>

                                        <Button
                                            onClick={() => setIsFocused(true)}
                                            className="w-full group"
                                            size="lg"
                                        >
                                            Start Challenge <ArrowLeft className="ml-2 w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </>
                                ) : (
                                    <p className="text-muted-foreground italic">No practice exercises available yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <HOFNavigation currentId={slug} hofs={hofs} />
        </div>
    );
}
