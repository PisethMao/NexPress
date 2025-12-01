'use client';

import React, { useState } from 'react';
import { AnimatedBackground, Header, InputSection, CategoriesGrid } from "@/components/categories/CategoriesSection";
import { analyzeWithAI } from "@/Data/categoryData";
import { Category } from "@/types/categoryType";

export default function Page() {
  const [input, setInput] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    if (!input.trim()) {
      setError('Please enter some items to categorize');
      return;
    }

    setLoading(true);
    setError('');
    setCategories([]);

    try {
      const result = await analyzeWithAI(input);
      setCategories(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze categories. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <Header />
        <InputSection 
          input={input}
          setInput={setInput}
          onAnalyze={handleAnalyze}
          loading={loading}
          error={error}
        />
        <CategoriesGrid categories={categories} />
      </div>
    </div>
  );
}

