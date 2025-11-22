"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
export default function FooterSection() {
  return (
    <footer className="font-inter relative w-full mt-20">
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5 dark:bg-black/20 rounded-none pointer-events-none"></div>
      <div className="absolute -top-0.5 w-full h-0.5 left-0 bg-linear-to-r from-primary/40 via-secondary/40 to-secondary/40 opacity-80"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-4 md:px-8 py-14"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full text-foreground">
          <section className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h2 className="text-xl font-bold tracking-tight">NexPress</h2>
            <p className="text-sm opacity-80 leading-relaxed">
              A modern blog platform built for creators who want fast,
              beautiful, and powerful experiences.
            </p>
            <div className="flex gap-4 mt-4 md:mt-2 justify-center md:justify-start">
              <motion.a
                whileHover={{ scale: 1.15, rotate: 4 }}
                href="https://www.facebook.com/piseth.mao.2025"
                className="p-2 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg cursor-pointer hover:bg-white/20 transition-all"
              >
                <FaFacebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: 4 }}
                href="https://x.com/PisethMao528763"
                className="p-2 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg cursor-pointer hover:bg-white/20 transition-all"
              >
                <FaX className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: 4 }}
                href="https://github.com/PisethMao"
                className="p-2 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg cursor-pointer hover:bg-white/20 transition-all"
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>
            </div>
          </section>
          <nav className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold tracking-tight">Navigation</h3>
            <ul className="flex flex-col gap-2 text-sm opacity-80">
              {["Home", "Categories", "Authors", "Blog Feed"].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6 }}
                  className="transition-all cursor-pointer hover:opacity-100"
                >
                  <Link href="/">{item}</Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <nav className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold tracking-tight">Categories</h3>
            <ul className="flex flex-col gap-2 text-sm opacity-80">
              {["Design", "Development", "Tips", "Guides"].map((c, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6 }}
                  className="transition-all cursor-pointer hover:opacity-100"
                >
                  <Link href="/">{c}</Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <section className="flex flex-col gap-3 col-span-2 md:col-span-1 items-center md:items-start text-center md:text-left">
            <h3 className="font-semibold text-lg tracking-tight">
              Stay Updated
            </h3>
            <p className="text-sm opacity-80">
              Subscribe to get the latest articles very week.
            </p>
            <div className="flex gap-2 mt-2 w-full max-w-xs justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                className="px-6 py-2 rounded-xl bg-primary text-white shadow-lg hover:bg-primary/80 cursor-pointer"
              >
                Go
              </motion.button>
            </div>
          </section>
        </div>
        <div className="w-full h-px bg-white/10 dark:bg-white/5 my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-4 opacity-70">
          <p>© {new Date().getFullYear()} NexPress - All rights reserved.</p>
          <p className="hover:opacity-100 transition-opacity cursor-pointer">
            Built with ❤️ by Piseth Mao
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
