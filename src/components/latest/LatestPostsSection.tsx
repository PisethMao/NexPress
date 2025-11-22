"use client";
import { motion } from "framer-motion";
const mockLatest = [
  {
    id: 1,
    title: "Why UI Consistency Matters",
    description:
      "Understanding how consistent interfaces improve readability and trust.",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How to Structure Better Blog Posts",
    description: "A quick guide on building readable and engaging articles.",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Performance Tips for Moddern Web Apps",
    description: "Simpl optimizations that make huge differences in your UX.",
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
];
export default function LatestPostsSection() {
  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-8 font-inter relative bg-linear-to-b from-[#f9fafb] via-[#ffffff] to-[#eef1f3] dark:from-[#0d0d13] dark:via-[#121424] dark:to-[#1a1d33]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Latest Posts
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Fresh articles from our writers, updated frequiently.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {mockLatest.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full cursor-pointer rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0, 0, 0, 0.08)] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0, 0, 0, 0.15)] transition-all duration-300"
            >
              <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                ></motion.img>
              </div>
              <div className="p-5">
                <span className="text-sm px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-300 dark:bg-blue-300/10">
                  {post.category}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {post.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
