"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HOF } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HOFNavigationProps {
    currentId: string;
    hofs: HOF[];
}

export function HOFNavigation({ currentId, hofs }: HOFNavigationProps) {
    const currentIndex = hofs.findIndex((h) => h.id === currentId);
    const prevHOF = hofs[currentIndex - 1];
    const nextHOF = hofs[currentIndex + 1];

    return (
        <>
            {/* Unified Bottom Dock */}
            {/* Unified Bottom Dock */}
            <motion.div
                initial={{ opacity: 0, y: 20, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 20, x: "-50%" }}
                style={{ backgroundColor: "black" }}
                className="fixed bottom-8 left-1/2 z-[60] flex items-center gap-1 p-1.5 rounded-full shadow-2xl border border-zinc-800"
            >
                {/* Previous Button */}
                <div className="w-10 h-10">
                    {prevHOF ? (
                        <Link href={`/hof/${prevHOF.id}`}>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="w-10 h-10 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
                                title={`Previous: .${prevHOF.name}()`}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                    ) : (
                        <div className="w-10 h-10" /> // Spacer
                    )}
                </div>

                {/* Center Menu Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-10 px-4 rounded-full text-zinc-100 font-mono text-sm hover:bg-zinc-800 hover:text-white border-x border-zinc-800/50 mx-1"
                        >
                            <Code2 className="w-4 h-4 mr-2 text-primary" />
                            .{hofs[currentIndex].name}()
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh] sm:h-[60vh] rounded-t-xl z-[70] bg-black border-t-zinc-800">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="flex items-center gap-2 justify-center">
                                <Code2 className="h-5 w-5 text-primary" />
                                Higher Order Functions
                            </SheetTitle>
                        </SheetHeader>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-y-auto max-h-[calc(80vh-100px)] p-1">
                            {hofs.map((hof) => (
                                <Link
                                    key={hof.id}
                                    href={`/hof/${hof.id}`}
                                    className={cn(
                                        "flex items-center justify-center p-3 rounded-lg transition-colors text-sm font-mono border",
                                        hof.id === currentId
                                            ? "bg-primary/10 text-primary border-primary/20 font-bold"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground border-transparent bg-muted/30"
                                    )}
                                >
                                    .{hof.name}()
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Next Button */}
                <div className="w-10 h-10">
                    {nextHOF ? (
                        <Link href={`/hof/${nextHOF.id}`}>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="w-10 h-10 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
                                title={`Next: .${nextHOF.name}()`}
                            >
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    ) : (
                        <div className="w-10 h-10" /> // Spacer
                    )}
                </div>
            </motion.div>
        </>
    );
}
