import { notFound } from "next/navigation";
import { topics } from "@/data/topics";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TopicContent } from "@/components/topic/TopicContent";
import { TopicNavigation } from "@/components/topic/TopicNavigation";

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
        <div className="container py-12 lg:py-16 max-w-screen-xl px-4 md:px-8">
            <div className="mb-10 lg:mb-14 text-center max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Back to Overview
                </Link>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {topic.title}
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">{topic.description}</p>
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
    );
}
