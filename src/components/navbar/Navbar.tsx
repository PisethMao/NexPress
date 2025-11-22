"use client";
import Link from "next/link";
import styles from "./style.module.css";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Home, Info, Layers, Menu, X } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
import { navItem } from "@/Data/navItemData";
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={18} />,
  Blogs: <BookOpen size={18} />,
  Categories: <Layers size={18} />,
  About: <Info size={18} />,
};
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] px-6 py-4 rounded-2xl shadow-xl font-inter bg-white/30 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-2xl border border-white/20 z-50 transition-all duration-300 p-4 ${styles.header}`}
    >
      <div
        className={`container mx-auto flex items-center justify-between ${styles.container}`}
      >
        <Link
          href="/"
          className={`text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer ${styles.logo}`}
        >
          NexPress
        </Link>
        <nav
          aria-label="Main Navigation"
          className={`hidden md:flex gap-8 text-sm font-medium ${styles.navClassname}`}
        >
          {navItem.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-all"
            >
              {iconMap[item.name]} {item.name}
            </Link>
          ))}
        </nav>
        <Link
          href="/login"
          className={`hidden md:inline-block px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30 cursor-pointer select-none ${styles.action}`}
        >
          Login
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex items-center justify-center p-2 rounded-xl md:hidden bg-white/40 dark:bg-gray-700/25 backdrop-blur-xl dark:hover:bg-gray-700/60 transition-all duration-300 cursor-pointer shadow-lg"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            type="button"
          >
            {open ? (
              <X size={22} strokeWidth={2.5} />
            ) : (
              <Menu size={22} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-4 flex flex-col gap-3 md:hidden bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg"
          >
            {navItem.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-center py-2 rounded-lg w-full text-gray-900 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
