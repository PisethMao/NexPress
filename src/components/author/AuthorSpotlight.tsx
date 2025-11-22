/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { authorData } from "@/Data/authorData";
import Link from "next/link";
export default function AuthorSpotlight() {
  return (
    <section
      id="author"
      className="relative w-full py-14 md:py-20 px-4 md:px-8 flex justify-center font-inter"
    >
      <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent before:to-black/5 dark:before:to-white/5" />
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-4xl w-full rounded-2xl backdrop-blur-lg bg-white/40 dark:bg-black/20 shadow-md border border-white/20 dark:border-white/10  p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-xl"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg"
        >
          <img
            src={authorData.avatar}
            alt={authorData.name}
            className="object-cover w-full h-full"
          />
        </motion.div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 tracking-tight">
            {authorData.title}
          </h2>
          <p className="text-base md:text-lg text-black/70 dark:text-white/70 leading-relaxed">
            {authorData.description}
          </p>
          <Link href={authorData.buttonHref}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {authorData.buttonLabel}
            </motion.button>
          </Link>
        </div>
      </motion.article>
    </section>
  );
}
