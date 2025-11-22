"use client";
import { motion } from "framer-motion";
import { categories } from "@/Data/categoryData";
export default function CategoriesSection() {
  return (
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
  );
}
