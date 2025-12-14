"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, File, Code2, BookOpen } from "lucide-react";
import { topics } from "@/data/topics";
import { hofs } from "@/data/hofs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchCommand() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);


    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                )}
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search handbook...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-hidden p-0 shadow-2xl">
                    <DialogTitle className="sr-only">Search Handbook</DialogTitle>
                    <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <Command.Input
                                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Type a command or search..."
                            />
                        </div>
                        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                            <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
                            <Command.Group heading="Topics">
                                {topics.map((topic) => (
                                    <Command.Item
                                        key={topic.id}
                                        value={`${topic.title} ${topic.description} ${topic.keyConcepts?.join(" ")}`}
                                        onSelect={() => {
                                            setOpen(false);
                                            router.push(`/topics/${topic.slug}`);
                                        }}
                                        className="relative flex cursor-default select-none items-start rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                                    >
                                        <BookOpen className="mr-2 h-4 w-4 shrink-0 mt-0.5" />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{topic.title}</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {topic.description}
                                            </span>
                                        </div>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                            <Command.Group heading="Array Methods">
                                {hofs.map((hof) => (
                                    <Command.Item
                                        key={hof.id}
                                        value={`${hof.name} ${hof.description} ${hof.usage}`}
                                        onSelect={() => {
                                            setOpen(false);
                                            router.push(`/hof/${hof.id}`);
                                        }}
                                        className="relative flex cursor-default select-none items-start rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                                    >
                                        <Code2 className="mr-2 h-4 w-4 shrink-0 mt-0.5" />
                                        <div className="flex flex-col">
                                            <span className="font-mono font-medium">.{hof.name}()</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {hof.description}
                                            </span>
                                        </div>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        </Command.List>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}
