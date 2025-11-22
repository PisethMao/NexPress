"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { heroData } from "@/Data/heroData";
export default function HeroSection() {
  return (
    <section className="font-inter relative w-full flex items-center justify-center py-80 px-4 md:px-8">
      <div className="absolute inset-0 -z-10 blur-[100px] opacity-40 bg-linear-to-r from-blue-500 to-purple-500"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-2xl bg-white/15 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-lg shadow-black/10 dark:shadow-white/5 p-8 md:p-12 w-full max-w-4xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white drop-shadow-sm">
          {heroData.title}
          <span className="text-blue-600 dark:text-blue-400">
            {heroData.highlight}
          </span>
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          {heroData.description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={heroData.primaryAction.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer px-6 py-4 rounded-full bg-blue-600 text-white text-sm md:text-base shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all duration-300"
            >
              {heroData.primaryAction.label}
            </motion.button>
          </Link>
          <Link href={heroData.secondaryAction.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-4 rounded-full bg-white/80 cursor-pointer dark:bg-white/10 text-gray-900 dark:text-white text-sm md:text-base border border-gray-300 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/20 shadow-md transition-all duration-300"
            >
              {heroData.secondaryAction.label}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
