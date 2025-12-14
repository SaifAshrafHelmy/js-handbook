export interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string; // Markdown content
  category: string;
  order: number;
  keyConcepts?: string[];
}

export interface HOF {
  id: string;
  name: string;
  description: string;
  example: string;
  usage: string; // Real-world usage explanation
  richExample?: string; // Detailed code block
  category?: string;
  isHOF?: boolean;
  practice?: {
    question: string;
    answer: string;
  };
}
