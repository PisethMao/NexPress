"use client";
import { motion } from "framer-motion";
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with NexPress",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    description:
      "Learn How NexPress empowers creators with a powerful and modern blogging system.",
  },
  {
    id: 2,
    title: "Designing Bautiful Blog Layouts",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    description:
      "Explore the UI techniques behind clean and engaging reading experiences.",
  },
  {
    id: 3,
    title: "Mastering Categories & Tags",
    category: "Tips",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    description:
      "Organize your content like a pro using NexPress' flexible categorization system.",
  },
];
export default function FeaturedPosts() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="w-full py-20 px-4 md:px-8 relative font-inter"
    >
      <header className="text-center mb-12">
        <h2
          id="featured-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"
        >
          Featured Posts
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Discover articles loved by our readers.
        </p>
      </header>
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-200/20 to-purple-300/20 blur-3xl opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {mockPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="w-full group relative rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl bg-white/20 dark:bg-white/10 shadow-[0_8px_20px_rgba(0, 0, 0, 0.1)] border border-white/30 dark:border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0, 0, 0, 0.15)]"
            >
              <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                ></motion.img>
              </div>
              <div className="p-6">
                <span className="text-sm px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-300 hover:bg-blue-300/10">
                  {post.category}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {post.title}
                </h3>
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
