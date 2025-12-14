import Link from "next/link";
import { Github, Globe, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8">
            <div className="container flex flex-col items-center justify-center gap-6 max-w-4xl px-4 md:px-8">
                <p className="text-sm text-muted-foreground text-center">
                    Made by Software Dev{" "}
                    <a
                        href="https://saifashraf.dev/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        Saif Ashraf
                    </a>
                </p>
                <div className="flex items-center gap-6">
                    <Link
                        href="https://github.com/saifAshrafHelmy/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/saifashrafhelmy/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                        href="https://saifashraf.dev/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Globe className="h-5 w-5" />
                        <span className="sr-only">Website</span>
                    </Link>
                    <Link
                        href="mailto:saifashrafhelmy@gmail.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
