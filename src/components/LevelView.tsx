"use client";

import type { Level, QuizQuestion } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Volume2,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

function LessonTab({ levelData }: { levelData: Level }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [thaiVoice, setThaiVoice] = useState<SpeechSynthesisVoice | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setIsSupported(true);

      const getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const voice = voices.find((v) => v.lang === "th-TH") || null;
          setThaiVoice(voice);
        }
      };

      getVoices();
      // Voices can load asynchronously.
      window.speechSynthesis.onvoiceschanged = getVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
      };
    }
  }, []);
  
  const playAudio = (text: string) => {
    if (!isSupported) {
      toast({
        variant: "destructive",
        title: "Audio Not Supported",
        description: "Your browser does not support speech synthesis.",
      });
      return;
    }

    if (!thaiVoice) {
      toast({
        variant: "destructive",
        title: "Thai Voice Not Available",
        description:
          "A Thai voice is not installed on your system or browser.",
      });
      return;
    }
    
    // If speaking the current phrase, stop it.
    if (window.speechSynthesis.speaking && playing === text) {
      window.speechSynthesis.cancel();
      setPlaying(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = thaiVoice;
    utterance.lang = "th-TH";
    utterance.rate = 0.8; // Speak a bit slower for clarity
    utterance.onstart = () => setPlaying(text);
    utterance.onend = () => setPlaying(null);
    utterance.onerror = (event) => {
      toast({
        variant: "destructive",
        title: "Audio Error",
        description: `An error occurred: ${event.error}`,
      });
      setPlaying(null);
    };
    
    window.speechSynthesis.cancel(); // Stop any previous utterance
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
        <Lightbulb className="w-6 h-6 text-primary mt-1" />
        <div>
          <h3 className="font-semibold font-headline">Lesson Tip</h3>
          <p className="text-sm text-foreground/80">
            Listen to the pronunciation for each phrase. Repetition is key to mastering the tones in Thai.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {levelData.lessons.map((lesson) => (
          <Card key={lesson.thai} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">{lesson.thai}</CardTitle>
              <CardDescription>{lesson.pronunciation}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-lg text-foreground/90">{lesson.english}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="icon" onClick={() => playAudio(lesson.thai)}>
                {playing === lesson.thai ? (
                  <Volume2 className="h-5 w-5 text-primary animate-pulse" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
                <span className="sr-only">Play pronunciation</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QuizTab({ levelData }: { levelData: Level }) {
  const router = useRouter();
  const { markAsCompleted } = useProgress();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const [shuffledQuiz, setShuffledQuiz] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    // Shuffle on the client side only after hydration to prevent mismatch
    const newShuffledQuiz = [...levelData.quiz].sort(() => Math.random() - 0.5);
    setShuffledQuiz(newShuffledQuiz);
  }, [levelData.quiz]);

  if (shuffledQuiz.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading quiz...</p>
      </div>
    );
  }
  
  const currentQuestion: QuizQuestion = shuffledQuiz[currentQuestionIndex];
  
  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    if (option === currentQuestion.answer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleFinish = () => {
    markAsCompleted(levelData.level);
    toast({
      title: "Level Complete!",
      description: `Great job! You've completed Level ${levelData.level}.`,
      action: (
        <CheckCircle className="text-green-500" />
      ),
    });
    router.push("/");
  };
  
  if (quizFinished) {
    const percentage = Math.round((score / shuffledQuiz.length) * 100);
    const passed = percentage >= 80;

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold font-headline text-primary mb-2">Quiz Complete!</h2>
        <p className="text-xl text-foreground/80 mb-4">You scored</p>
        <p className="text-6xl font-bold text-accent mb-6">{percentage}%</p>
        {passed ? (
           <p className="text-lg text-green-600 dark:text-green-400 mb-6">ยอดเยี่ยม! (Excellent!) You passed!</p>
        ) : (
          <p className="text-lg text-destructive mb-6">พยายามต่อไป! (Keep trying!) You'll get it next time.</p>
        )}
        <Button onClick={handleFinish} size="lg">
          Finish & Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex justify-between items-center">
            <span>Question {currentQuestionIndex + 1} of {shuffledQuiz.length}</span>
            <span className="text-base font-normal text-muted-foreground">Score: {score}</span>
          </CardTitle>
          <CardDescription>
            {currentQuestion.question}
            {currentQuestion.questionInThai && <span className="block text-lg text-foreground/90 mt-1 font-medium">{currentQuestion.questionInThai}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option) => {
             const isSelected = selectedAnswer === option;
             const isAnswer = currentQuestion.answer === option;
             
             return (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={cn("w-full justify-start text-base h-auto py-3 px-4",
                  selectedAnswer && isSelected && !isCorrect && "bg-destructive hover:bg-destructive/90",
                  selectedAnswer && isAnswer && "bg-green-500 hover:bg-green-500/90 text-white",
                )}
                variant={selectedAnswer && (isSelected || isAnswer) ? "default" : "outline"}
              >
                {selectedAnswer && isAnswer && <CheckCircle className="mr-2 h-5 w-5" />}
                {selectedAnswer && isSelected && !isCorrect && <XCircle className="mr-2 h-5 w-5" />}
                {option}
              </Button>
             )
          })}
        </CardContent>
        {selectedAnswer && (
          <CardFooter className="flex flex-col items-end">
            <Button onClick={handleNext} className="mt-4">
              {currentQuestionIndex < shuffledQuiz.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export function LevelView({ levelData }: { levelData: Level }) {
  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Level {levelData.level}: {levelData.title}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {levelData.description}
        </p>
      </header>
      <Tabs defaultValue="lesson" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="lesson" className="text-base gap-2"><BookOpen className="w-5 h-5" /> Lesson</TabsTrigger>
          <TabsTrigger value="quiz" className="text-base gap-2"><HelpCircle className="w-5 h-5"/>Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="lesson" className="mt-6">
          <LessonTab levelData={levelData} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-6">
          <QuizTab levelData={levelData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
