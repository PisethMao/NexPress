"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { footerData } from "@/Data/footerData";
import { JSX } from "react";
export default function FooterSection() {
  const iconMap: Record<string, JSX.Element> = {
    facebook: <FaFacebook className="w-5 h-5" />,
    x: <FaX className="w-5 h-5" />,
    github: <FaGithub className="w-5 h-5" />,
  };
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
            <h2 className="text-xl font-bold tracking-tight">
              {footerData.brand.title}
            </h2>
            <p className="text-sm opacity-80 leading-relaxed">
              {footerData.brand.description}
            </p>
            <div className="flex gap-4 mt-4 md:mt-2 justify-center md:justify-start">
              {footerData.brand.socials.map((s, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  href={s.href}
                  className="p-2 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg cursor-pointer hover:bg-white/20 transition-all"
                >
                  {iconMap[s.icon]}
                </motion.a>
              ))}
            </div>
          </section>
          <nav className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold tracking-tight">
              {footerData.navigation.title}
            </h3>
            <ul className="flex flex-col gap-2 text-sm opacity-80">
              {footerData.navigation.items.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6 }}
                  className="transition-all cursor-pointer hover:opacity-100"
                >
                  <Link href={item.href}>{item.label}</Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <nav className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold tracking-tight">
              {footerData.categories.title}
            </h3>
            <ul className="flex flex-col gap-2 text-sm opacity-80">
              {footerData.categories.items.map((c, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6 }}
                  className="transition-all cursor-pointer hover:opacity-100"
                >
                  <Link href={c.href}>{c.label}</Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <section className="flex flex-col gap-3 col-span-2 md:col-span-1 items-center md:items-start text-center md:text-left">
            <h3 className="font-semibold text-lg tracking-tight">
              {footerData.newsletter.title}
            </h3>
            <p className="text-sm opacity-80">
              {footerData.newsletter.subtitle}
            </p>
          </section>
        </div>
        <div className="w-full h-px bg-white/10 dark:bg-white/5 my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-4 opacity-70">
          <p>
            © {new Date().getFullYear()} {footerData.copyright.text}
          </p>
          <p className="hover:opacity-100 transition-opacity cursor-pointer">
            Built with ❤️ by Piseth Mao
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
