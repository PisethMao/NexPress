"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { newsletterData } from "@/Data/newsletterData";
type Status = "idle" | "loading" | "success" | "error";
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const isValidEmail = (value: string) => {
    const trimmed = value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(trimmed);
  };
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const savedEmail = window.localStorage.getItem("nexpress_subscriber_email");
    if (savedEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasSubscribed(true);
      setStatus("success");
      setMessage("You're already subscribed to NesPress 🎉");
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setMessage("This doesn't look like a valid email. Try again?");
      return;
    }
    if (typeof window !== "undefined") {
      const savedEmail = window.localStorage.getItem(
        "nexpress_subscriber_email"
      );
      if (savedEmail && savedEmail === trimmed) {
        setStatus("error");
        setMessage("This email is already subscribed to NexPress.");
        return;
      }
    }
    setStatus("loading");
    setMessage("Subscribing you to NexPress...");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("nexpress_subscriber_email", trimmed);
    }
    setStatus("success");
    setHasSubscribed(true);
    setMessage(
      "Subscribed successfully! You'll now get the latest NexPress updates."
    );
    setEmail("");
  };
  const isLoading = status == "loading";
  return (
    <section
      aria-label="Newsletter Subscription"
      className="relative w-full py-16 md:py-20 px-4 md:px-8 flex items-center justify-center font-inter"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-44 h-44 bg-blue-400/25 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/3 w-44 h-44 bg-purple-400/25 blur-3xl rounded-full" />
      </div>
      <motion.article
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl rounded-3xl w-full backdrop-blur-2xl bg-white/40 dark:bg-white/5 shadow-xl border border-white/25 dark:border-white/10 p-8 md:p-10 shadow-blue-500/10 dark:shadow-black/40 px-6 py-8 md:px-10 md:py-10 before:content-[''] before:absolute before:-inset-px before:rounded-3xl before:bg-linear-to-r before:from-blue-500/15 before:via-purple-500/10 before:to-cyan-500/15 before:-z-10"
      >
        <header className="mb-6 text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
            {newsletterData.title}
          </h2>
          <p className="text-sm md:text-base mt-2 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {newsletterData.subtitle}
          </p>
        </header>
        <form
          action=""
          className="flex flex-col md:flex-row items-center gap-4 mt-6"
          onSubmit={handleSubmit}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="text"
            required
            placeholder={newsletterData.placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setMessage(null);
              }
            }}
            className="w-full md:flex-1 px-5 py-3 rounded-xl bg-white/70 dark:bg-black/25 backdrop-blur-md border border-gray-300/50 dark:border-gray-700/60 shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:shadow-md hover:-translate-y-px transition-all duration-300"
          />
          <motion.button
            disabled={isLoading || hasSubscribed}
            whileHover={
              !isLoading || !hasSubscribed
                ? {
                    scale: 1.05,
                    y: -1,
                    boxShadow: "0 14px 30px rgba(37, 99, 235, 0.35)",
                  }
                : {}
            }
            whileTap={!isLoading || !hasSubscribed ? { scale: 0.97, y: 0 } : {}}
            type="submit"
            className={`w-full md:w-auto px-7 py-3 rounded-xl text-sm md:text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-500/70 disabled:cursor-not-allowed shadow-md shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300`}
          >
            {isLoading
              ? "Subscribing..."
              : hasSubscribed
              ? "Subscribed"
              : newsletterData.buttonLabel}
          </motion.button>
        </form>
        <p className="mt-3 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
          We&apos;ll only send high-quality NexPress content. No spam, no noice.
        </p>
      </motion.article>
      <AnimatePresence>
        {status !== "idle" && message && (
          <motion.aside
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-6 right-4 md:right-8 z-50 max-w-xs md:max-w-sm rounded-2xl border backdrop-blur-xl px-4 py-3 text-sm shadow-xl pointer-events-auto ${
              status === "success"
                ? "bg-emerald-500/10 border-emerald-400/60 text-emerald-700 dark:text-emerald-300 shadow-emerald-500/30"
                : status === "error"
                ? "bg-rose-500/10 border-rose-400/60 text-rose-700 dark:text-red-300 shadow-rose-500/30"
                : "bg-blue-500/10 border-blue-400/60 text-blue-700 dark:text-blue-300 shadow-blue-500/30"
            }`}
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  status === "success"
                    ? "bg-emerald-500/80"
                    : status === "error"
                    ? "bg-rose-500/80"
                    : "bg-blue-500/80"
                }`}
              >
                {status === "success" ? "✓" : status === "error" ? "!" : "..."}
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-0.5">
                  {status === "success"
                    ? "Subscription successful"
                    : status === "error"
                    ? "Something went wrong"
                    : "Working on it"}
                </p>
                <p className="text-xs opacity-90">{message}</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}
