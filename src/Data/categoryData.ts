import { CategoryItem } from "@/types/categoryType";

interface Category {
  category: string;
  items: string[];
  description: string;
}

export const categories: CategoryItem[] = [
  {
    name: "Guides",
    color: "from-blue-400 to-blue-600",
    description: "Browse posts related to guides",
  },
  {
    name: "Design",
    color: "from-purple-400 to-purple-600",
    description: "Browse posts related to design",
  },
  {
    name: "Tips",
    color: "from-pink-400 to-pink-600",
    description: "Browse posts related to tips",
  },
  {
    name: "Development",
    color: "from-green-400 to-green-600",
    description: "Browse posts related to developments",
  },
  {
    name: "News",
    color: "from-yellow-400 to-orange-600",
    description: "Browse posts related to news",
  },
  {
    name: "Inspiration",
    color: "from-teal-400 to-cyan-600",
    description: "Browse posts related to inspiration",
  },
];

export const analyzeWithAI = async (input: string): Promise<Category[]> => {
  const response = await fetch('/api/categorize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze categories');
  }

  const data = await response.json();
  
  if (data.content && data.content[0]) {
    const text = data.content[0].text;
    const cleanText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanText);
  }
  
  throw new Error('No response from AI');
};