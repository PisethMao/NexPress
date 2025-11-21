"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  const isDark = theme === "dark";
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 cursor-pointer shadow-lg"
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-300" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
    </motion.button>
  );
}
