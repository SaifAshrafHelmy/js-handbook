"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { hofs } from "@/data/hofs";
import Link from "next/link";

export default function HOFPage() {
    return (
        <div className="container py-12 lg:py-16 max-w-screen-2xl px-4 md:px-8">
            <div className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    33 JS Higher Order Functions
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Master these functions to write cleaner, more functional, and efficient JavaScript code.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {hofs.map((hof) => (
                    <Card key={hof.id} className="flex flex-col overflow-hidden border-border/50 hover:border-primary/30 transition-colors bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <CardTitle className="font-mono text-xl text-primary">
                                    .{hof.name}()
                                </CardTitle>
                                <Badge variant="secondary" className="bg-secondary/50">Array</Badge>
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
