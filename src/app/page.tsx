"use client";

import Link from "next/link";
import { lessonsData } from "@/lib/data";
import { useProgress } from "@/hooks/use-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isCompleted, isInitialized } = useProgress();

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          Welcome to Your Thai Learning Path
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Start your journey from basic greetings to complex sentences. Each level builds on the last. Let's begin!
        </p>
      </div>

      {!isInitialized ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-2/4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter>
                 <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsData.map((level, index) => {
            const unlocked = index === 0 || isCompleted(level.level - 1);
            const completed = isCompleted(level.level);

            return (
              <Card
                key={level.level}
                className={`flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${!unlocked ? "bg-muted/50" : "bg-card"}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-2xl">
                      Level {level.level}
                    </CardTitle>
                    {completed && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base !mt-2">{level.title}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{level.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild disabled={!unlocked} className="w-full">
                    <Link href={`/level/${level.level}`}>
                      {unlocked ? (
                        <>
                          <PlayCircle className="mr-2 h-5 w-5" />
                          {completed ? 'Review' : 'Start Level'}
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-5 w-5" />
                          Locked
                        </>
                      )}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
