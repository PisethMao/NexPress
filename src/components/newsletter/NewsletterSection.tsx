"use client";
import { motion } from "framer-motion";
import { useState } from "react";
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  return (
    <section
      aria-label="Newsletter Subscription"
      className="relative w-full py-16 md:py-20 px-4 md:px-8 flex items-center justify-center font-inter"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-purple-400/20 blur-3xl rounded-full" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl rounded-3xl w-full backdrop-blur-xl bg-white/40 dark:bg-white/10 shadow-xl border border-white/20 dark:border-white/10 p-8 md:p-10"
      >
        <header className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Subscribe to NexPress
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Get the latest articles on UI/UX, DevOps, JavaScript, and modern
            blogging.
          </p>
        </header>
        <form
          action=""
          className="flex flex-col md:flex-row items-center gap-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            required
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:flex-1 px-5 py-3 rounded-xl bg-white/60 dark:bg-black/20 backdrop-blur-md border border-gray-300/30 dark:border-gray-700/40 shadow-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(59,130,246,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer transition-all duration-300"
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
