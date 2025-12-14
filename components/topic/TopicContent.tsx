"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { cn } from "@/lib/utils";

interface TopicContentProps {
    content: string;
}

export function TopicContent({ content }: TopicContentProps) {
    return (
        <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50">
            <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h2: ({ node, children, ...props }) => {
                        const id = children
                            ?.toString()
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-");
                        return (
                            <h2
                                id={id}
                                className="text-3xl font-bold tracking-tight mt-16 mb-8 border-b border-border/40 pb-4 text-primary/90"
                                {...props}
                            >
                                {children}
                            </h2>
                        );
                    },
                    h3: ({ node, children, ...props }) => {
                        const id = children
                            ?.toString()
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-");
                        return (
                            <h3 id={id} className="text-xl font-semibold mt-10 mb-4 text-foreground/90 flex items-center" {...props}>
                                <span className="bg-primary/10 w-2 h-6 rounded-full mr-3 inline-block" />
                                {children}
                            </h3>
                        );
                    },
                    h4: ({ node, children, ...props }) => (
                        <h4 className="text-lg font-medium mt-6 mb-3 text-foreground/80" {...props}>
                            {children}
                        </h4>
                    ),
                    p: ({ node, children, ...props }) => (
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-lg" {...props}>
                            {children}
                        </p>
                    ),
                    ul: ({ node, children, ...props }) => (
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground" {...props}>
                            {children}
                        </ul>
                    ),
                    strong: ({ node, children, ...props }) => (
                        <strong className="font-semibold text-foreground" {...props}>
                            {children}
                        </strong>
                    ),
                    blockquote: ({ node, children, ...props }) => (
                        <blockquote
                            className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl not-italic my-8 shadow-sm"
                            {...props}
                        >
                            {children}
                        </blockquote>
                    ),
                    code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !match;
                        return isInline ? (
                            <code
                                className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-semibold"
                                {...props}
                            >
                                {children}
                            </code>
                        ) : (
                            <div className="relative my-8 rounded-xl overflow-hidden border border-border/50 shadow-md">
                                <div className="absolute top-0 right-0 p-2 text-xs text-muted-foreground bg-muted/50 rounded-bl-lg border-b border-l border-border/50">
                                    {match?.[1] || 'text'}
                                </div>
                                <code className={cn(className, "block p-6 text-sm leading-relaxed overflow-x-auto")} {...props}>
                                    {children}
                                </code>
                            </div>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
