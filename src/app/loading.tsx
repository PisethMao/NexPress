"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const circleVariants: Variants = {
    animate: (custom: number) => ({
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: custom * 0.2,
      },
    }),
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.3, 0, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const spinnerVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const floatVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-linear-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-linear-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Loading Container */}
      <motion.section
        className="relative z-10 w-full max-w-md mx-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glass Card */}
        <motion.article
          className="relative bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
        >
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-purple-500/20 to-transparent rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-pink-500/20 to-transparent rounded-br-3xl" />

          {/* Logo/Spinner Container */}
          <motion.div
            className="relative flex items-center justify-center mb-8"
            variants={floatVariants}
            animate="animate"
          >
            {/* Pulsing Background */}
            <motion.div
              className="absolute w-32 h-32 bg-linear-to-br from-indigo-500/30 to-purple-500/30 rounded-full"
              variants={pulseVariants}
              animate="animate"
            />

            {/* Rotating Spinner */}
            <motion.div
              className="relative w-24 h-24 border-4 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full"
              variants={spinnerVariants}
              animate="animate"
            />

            {/* Center Circle */}
            <motion.div
              className="absolute w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Loading
            </h1>
            <motion.p
              className="text-gray-600 text-sm md:text-base"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Please wait while we prepare everything...
            </motion.p>
          </motion.div>

          {/* Progress Bar Container */}
          <motion.div variants={itemVariants} className="space-y-3">
            {/* Progress Bar Background */}
            <div className="relative h-3 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
              {/* Animated Progress Fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="flex justify-between items-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-medium">{loadingProgress}%</span>
              <span className="text-xs">Initializing...</span>
            </motion.div>
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-3 mt-8"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={circleVariants}
                animate="animate"
                className="w-2 h-2 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg"
              />
            ))}
          </motion.div>

          {/* Loading Tips */}
          <motion.aside
            variants={itemVariants}
            className="mt-8 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <motion.p
              className="text-xs md:text-sm text-gray-700 text-center leading-relaxed"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <span className="font-semibold text-purple-600">💡 Tip:</span> Did
              you know? Our content is carefully curated for the best
              experience.
            </motion.p>
          </motion.aside>
        </motion.article>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-linear-to-br from-purple-400 to-pink-400 rounded-full opacity-40"
              style={{
                // eslint-disable-next-line react-hooks/purity
                left: `${Math.random() * 100}%`,
                // eslint-disable-next-line react-hooks/purity
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                // eslint-disable-next-line react-hooks/purity
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                // eslint-disable-next-line react-hooks/purity
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                // eslint-disable-next-line react-hooks/purity
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.section>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </main>
  );
};

export default LoadingPage;
