"use client";

import { useProgress } from "@/hooks/use-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trophy, RotateCcw } from "lucide-react";
import { lessonsData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function ProgressPage() {
  const { completedLevels, progressPercentage, resetProgress, isInitialized } = useProgress();

  const progressMessages = {
    0: "Just starting out! The first step is the most important. You can do it!",
    25: "Great start! You're building a solid foundation.",
    50: "Halfway there! You're making fantastic progress. Keep it up!",
    75: "You're so close to the finish line! Amazing work!",
    100: "Congratulations! You've completed all the levels! You're a Thai learning champion!",
  };

  const getProgressMessage = () => {
    if (progressPercentage === 100) return progressMessages[100];
    if (progressPercentage >= 75) return progressMessages[75];
    if (progressPercentage >= 50) return progressMessages[50];
    if (progressPercentage > 0) return progressMessages[25];
    return progressMessages[0];
  };

  return (
    <div className="container py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Your Progress</h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Track your journey to mastering basic Thai.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Completed Levels</CardTitle>
          </CardHeader>
          <CardContent>
            {!isInitialized ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            ) : completedLevels.length > 0 ? (
              <ul className="space-y-3">
                {lessonsData.map((level) =>
                  completedLevels.includes(level.level) ? (
                    <li key={level.level} className="flex items-center text-lg">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                      <span className="font-medium">Level {level.level}:</span>
                      <span className="text-muted-foreground ml-2">{level.title}</span>
                    </li>
                  ) : null
                )}
              </ul>
            ) : (
              <p className="text-muted-foreground">You haven't completed any levels yet. Let's get started!</p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="text-center bg-card">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {!isInitialized ? (
                <div className="flex flex-col items-center space-y-4">
                   <Skeleton className="h-8 w-24 rounded-full" />
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-5 w-3/4" />
                </div>
              ) : (
                <>
                  <div className="relative flex justify-center items-center mb-4">
                    {progressPercentage === 100 && (
                      <Trophy className="absolute h-10 w-10 text-yellow-400 animate-pulse" />
                    )}
                    <p className="text-5xl font-bold font-headline text-accent">
                      {Math.round(progressPercentage)}%
                    </p>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-muted-foreground mt-4 italic">{getProgressMessage()}</p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
                <CardTitle className="font-headline text-xl">Settings</CardTitle>
             </CardHeader>
             <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <RotateCcw className="mr-2 h-4 w-4" /> Reset Progress
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your progress
                        and reset all completed levels.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={resetProgress}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
