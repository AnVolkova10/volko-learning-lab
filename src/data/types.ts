import type { ReflectionData, StudyBlock } from "./study-blocks.ts";

export type Category = {
  id: string;
  label: string;
  color: string;
};

export type TopicSection = {
  id: string;
  letter?: string;
  title: string;
  definition: string;
  explanation: string;
  analogy?: string;
  mistake?: string;
  beforeCode?: string;
  better?: string;
  afterCode?: string;
  takeaway?: string;
  blocks?: StudyBlock[];
};

export type Exercise = {
  id: string;
  title: string;
  prompt: string;
  code?: string;
  options: { id: string; label: string; explanation: string }[];
  correctOptionId: string;
};

export type Topic = {
  id: string;
  illustration: "solid-foundations" | "delegation-map";
  title: string;
  description: string;
  category: string;
  tags: string[];
  readMinutes: number;
  difficulty?: string;
  introduction: string;
  sections: TopicSection[];
  recap: string[];
  exerciseBank: ExerciseBank;
  practiceIntroduction?: string;
  project?: ReflectionData;
  recapFormula?: string[];
  closingThought?: string;
  sources?: { title: string; url: string }[];
};

// Five concepts, with two exercise kinds and three alternatives per kind.
export type ExerciseVariants = [Exercise, Exercise, Exercise];
export type ExerciseConcept = {
  id: string;
  apply: ExerciseVariants;
  identify: ExerciseVariants;
};
export type ExerciseBank = [
  ExerciseConcept,
  ExerciseConcept,
  ExerciseConcept,
  ExerciseConcept,
  ExerciseConcept,
];
