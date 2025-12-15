import { notFound } from "next/navigation";
import { topics } from "@/data/topics";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TopicContent } from "@/components/topic/TopicContent";
import { TopicNavigation } from "@/components/topic/TopicNavigation";
import { BottomNav } from "@/components/topic/BottomNav";

interface TopicPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return topics.map((topic) => ({
        slug: topic.slug,
    }));
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { slug } = await params;
    const topic = topics.find((t) => t.slug === slug);

    if (!topic) {
        notFound();
    }

    const navTopics = topics.filter(t => t.slug !== 'interview-prep');
    const currentIndex = navTopics.findIndex((t) => t.id === topic.id);
    const prevTopic = navTopics[currentIndex - 1];
    const nextTopic = navTopics[currentIndex + 1];

    return (
        <>
            <div className="container py-12 lg:py-16 max-w-screen-xl px-4 md:px-8 pb-32 lg:pb-16">
                <div className="mb-8 md:mb-10 lg:mb-14 text-center max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary mb-4 md:mb-6 transition-colors"
                    >
                        <ChevronLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Back to Overview
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl mb-4 md:mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent px-4">
                        {topic.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed px-4">{topic.description}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        <div className="min-h-[500px]">
                            <TopicContent content={topic.content || "Content coming soon..."} />
                        </div>

                    </div>
                </div>

                <TopicNavigation currentSlug={slug} topics={navTopics} />
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNav
                prevTopic={prevTopic}
                nextTopic={nextTopic}
                allTopics={navTopics}
                currentSlug={slug}
            />
        </>
    );
}
