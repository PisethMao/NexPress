"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type errorType = {
  error: Error & { digest?: string };
  resetErrorBoundary?: () => void;
};
export default function Error({ error, resetErrorBoundary }: errorType) {
  const [message, setMessageError] = useState<string>();
  useEffect(() => {
    console.error(error);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessageError(error.message || "An unexspeted error occured.");
  }, [error]);
  return (
    <main className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-500 to-purple-600 p-4">
      <section className="max-w-4xl w-full bg-white/30 backdrop-blur-md rounded-lg p-8 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl font-semibold mb-4">Something Went Wrong</h1>
          <p className="text-xl mb-4">{message}</p>
          <p className="text-sm mb-4">
            Please try refreshing the page or contact support if the issue
            persists.
          </p>
          <button
            type="button"
            onClick={() => resetErrorBoundary && resetErrorBoundary()}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Try Again
          </button>
        </motion.div>
      </section>
    </main>
  );
}
