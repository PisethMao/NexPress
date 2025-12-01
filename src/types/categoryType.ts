export type CategoryItem = {
  name: string;
  color: string;
  description: string;
};
export interface Category {
  category: string;
  items: string[];
  description: string;
}

export interface CategoryCardProps {
  category: Category;
  index: number;
}

export interface InputSectionProps {
  input: string;
  setInput: (value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string;
}