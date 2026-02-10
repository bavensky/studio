import { lessonsData } from "@/lib/data";
import { LevelView } from "@/components/LevelView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { level: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const levelNumber = parseInt(params.level, 10);
  const levelData = lessonsData.find((l) => l.level === levelNumber);

  if (!levelData) {
    return {
      title: "Level Not Found",
    };
  }

  return {
    title: `Level ${levelData.level}: ${levelData.title} | Thai Learner's Path`,
    description: levelData.description,
  };
}

export default function LevelPage({ params }: { params: { level: string } }) {
  const levelNumber = parseInt(params.level, 10);
  const levelData = lessonsData.find((l) => l.level === levelNumber);

  if (isNaN(levelNumber) || !levelData) {
    notFound();
  }

  return <LevelView levelData={levelData} />;
}

export async function generateStaticParams() {
  return lessonsData.map((level) => ({
    level: level.level.toString(),
  }));
}
