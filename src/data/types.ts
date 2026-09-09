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
  title: string;
  description: string;
  category: string;
  tags: string[];
  readMinutes: number;
  introduction: string;
  sections: TopicSection[];
  recap: string[];
  exercises: FiveExercises;
  sources?: { title: string; url: string }[];
};

// Every published topic includes a complete five-question practice set.
export type FiveExercises = [Exercise, Exercise, Exercise, Exercise, Exercise];
