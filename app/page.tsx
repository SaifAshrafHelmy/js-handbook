import { TopicWheel } from "@/components/home/TopicWheel";
import { topics } from "@/data/topics";

export default function Home() {
  return (
    <div className="container py-8 md:py-20 max-w-screen-2xl min-h-[calc(100vh-3.5rem)] flex flex-col justify-center px-4">
      <section className="mb-8 md:mb-16 space-y-4 md:space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight lg:text-7xl bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
          JavaScript Handbook
        </h1>
        <p className="mx-auto max-w-[800px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 px-4">
          Master the core concepts. From closures to promises, explore the interactive guide designed for modern developers.
        </p>
      </section>

      <TopicWheel topics={topics} />
    </div>
  );
}
