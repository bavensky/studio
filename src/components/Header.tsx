import Link from "next/link";
import { ThaiLearnerIcon } from "@/components/icons/ThaiLearnerIcon";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ThaiLearnerIcon className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            Thai Learner's Path
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Levels
          </Link>
          <Link
            href="/progress"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Progress
          </Link>
        </nav>
      </div>
    </header>
  );
}
