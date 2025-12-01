"use client";
import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/Data/categoryData";
import { Loader2, Sparkles, FolderTree, Zap } from 'lucide-react';
import { Category, CategoryCardProps, InputSectionProps } from "@/types/categoryType";

export default function CategoriesSection() {
    <section className="w-full py-16 px-4 md:px-8 relative font-inter">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-purple-100/40 dark:to-purple-900/10"></div>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Categories</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explore topics and discover content that fits your interests.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <motion.article
            key={cat.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-xl cursor-pointer bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-md border border-white/30 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            <div
              className={`absolute inset-0 rounded-xl opacity-30 bg-linear-to-br ${cat.color} blur-xl -z-10`}
            />
            <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {cat.description}
            </p>
          </motion.article>
        ))}
      </div>
      
    </section>
}

// Animated Background Component - Light Mode
export const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    <div className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
  </div>
);

// Header Component - Light Mode
export const Header = () => (
  <div className="backdrop-blur-xl mt-32 bg-white/80 rounded-3xl border border-gray-200 shadow-2xl p-8 mb-8 text-center">
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="relative">
        <Zap className="w-12 h-12 text-yellow-500 animate-pulse" />
        <div className="absolute inset-0 blur-xl bg-yellow-400/40"></div>
      </div>
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
        AI Category Explorer
      </h1>
    </div>
    <p className="text-gray-700 text-lg">Harness the power of AI to organize anything</p>
  </div>
);

// Input Section Component - Light Mode
export const InputSection = ({ input, setInput, onAnalyze, loading, error }: InputSectionProps) => (
  <div className="backdrop-blur-xl bg-white/80 rounded-3xl border border-gray-200 shadow-2xl p-8 mb-8">
    <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <Sparkles className="w-5 h-5 text-purple-600" />
      Enter your items
    </label>
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="e.g., apple, car, banana, bicycle, orange, motorcycle, grape, truck"
      className="w-full h-40 p-6 bg-white/90 border-2 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none resize-none text-gray-800 placeholder-gray-400 text-lg transition-all shadow-inner"
    />
    
    <button
      onClick={onAnalyze}
      disabled={loading}
      className="mt-6 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 text-lg"
    >
      {loading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          Analyzing with AI...
        </>
      ) : (
        <>
          <Sparkles className="w-6 h-6" />
          Categorize with AI
        </>
      )}
    </button>

    {error && (
      <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-red-700">
        {error}
      </div>
    )}
  </div>
);

// Category Card Component - Light Mode
export const CategoryCard = ({ category }: CategoryCardProps) => (
  <div className="bg-white/90 rounded-3xl border-2 border-gray-200 shadow-xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-purple-400 hover:shadow-2xl">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
        <FolderTree className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800">
        {category.category}
      </h3>
    </div>
    
    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
      {category.description}
    </p>
    
    <div className="flex flex-wrap gap-2">
      {category.items.map((item, i) => (
        <span
          key={i}
          className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 text-purple-800 px-4 py-2 rounded-full text-sm font-medium hover:from-purple-200 hover:to-pink-200 transition-all shadow-sm"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

// Categories Grid Component - Light Mode
export const CategoriesGrid = ({ categories }: { categories: Category[] }) => {
  if (categories.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6 flex items-center gap-3">
        <FolderTree className="w-8 h-8 text-purple-600" />
        Your Categories
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} category={cat} index={idx} />
        ))}
      </div>
    </div>
  );
};