"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { hofs } from "@/data/hofs";
import Link from "next/link";
import { useState } from "react";

export default function HOFPage() {
    const [showHOFOnly, setShowHOFOnly] = useState(false);

    const filteredHofs = showHOFOnly ? hofs.filter(h => h.isHOF) : hofs;

    return (
        <div className="container py-12 lg:py-16 max-w-screen-2xl px-4 md:px-8">
            <div className="mb-8 md:mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl mb-4 md:mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    JavaScript Array Methods
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8 px-4">
                    Master these methods to write cleaner, more functional, and efficient JavaScript code.
                </p>

                <div className="flex justify-center px-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:space-x-2 bg-secondary/50 p-2 rounded-2xl sm:rounded-full border border-border/50 w-full sm:w-auto max-w-sm sm:max-w-none">
                        <Button
                            variant={!showHOFOnly ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setShowHOFOnly(false)}
                            className="rounded-full px-4 sm:px-6 w-full sm:w-auto text-sm"
                        >
                            All Methods
                        </Button>
                        <Button
                            variant={showHOFOnly ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setShowHOFOnly(true)}
                            className="rounded-full px-4 sm:px-6 w-full sm:w-auto text-sm"
                        >
                            HOF Only
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {filteredHofs.map((hof) => (
                    <Card key={hof.id} className="flex flex-col overflow-hidden border-border/50 hover:border-primary/30 transition-colors bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <CardTitle className="font-mono text-xl text-primary">
                                    .{hof.name}()
                                </CardTitle>
                                {hof.isHOF && (
                                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">HOF</Badge>
                                )}
                            </div>
                            <CardDescription className="text-base leading-snug">
                                {hof.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4 pt-0">
                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Basic Example
                                </h4>
                                <div className="rounded-lg bg-muted/50 p-3 font-mono text-sm overflow-x-auto border border-border/30">
                                    {hof.example}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Real-World Usage
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {hof.usage}
                                </p>
                            </div>

                            <div className="pt-2 mt-auto">
                                <Link href={`/hof/${hof.id}`} className="w-full">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-between hover:bg-primary/10 hover:text-primary group"
                                    >
                                        <span className="flex items-center">
                                            <Play className="w-4 h-4 mr-2 group-hover:fill-current transition-colors" />
                                            Start Practice
                                        </span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
