"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <main className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 bg-background text-foreground">
      <div className="absolute inset-0 -z-10 opacity-60 blur-[120px] pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-linear-to-br before:from-primary/30 before:to-secondary/30"></div>
      <section className="relative max-w-xl w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-xl p-10 text-center transition-all duration-300">
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold tracking-tight mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl opacity-80 leading-relaxed"
        >
          The page you&apos;re looking for doesn&apos;t exist, moved, or got
          unpublished.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-block group relative px-7 py-3 rounded-xl font-semibold bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-foreground cursor-pointer"
          >
            <span className="relative z-10">Go back home</span>
            <span className="absolute inset-0 bg-linear-to-r from-primary/30 to-secondary/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
