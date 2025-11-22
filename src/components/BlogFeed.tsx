/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { blogFeedPosts } from "@/Data/blogFeedData";
export default function BlogFeed() {
  return (
    <section
      aria-labelledby="blog-feed"
      className="w-full py-16 md:py-20 px-4 md:px-8 font-inter relative"
    >
      <header className="mb-10 text-center">
        <h2
          id="blog-feed"
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Blog Feed
        </h2>
        <p className="text-base md:text-lg text-foreground/60 mt-2">
          Your home tiimeline - everything new, inspriring, and useful.
        </p>
      </header>
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center justify-items-center ${
          blogFeedPosts.length >= 3 ? "lg:grid-cols-3" : ""
        }`}
      >
        {blogFeedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative w-full max-w-md group cursor-pointer rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-40 transition duration-500 bg-linear-to-r from-blue-500/40 to-purple-500/40 blur-2xl" />
            <figure className="relative w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </figure>
            <div className="p-6 flex flex-col gap-4">
              <span className="text-xs inline-block px-3 py-1 rounded-full bg-primary/20 text-primary font-medium w-max">
                {post.category}
              </span>
              <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-sm text-foreground/70 line-clamp-3">
                {post.description}
              </p>
              <footer className="mt-3 flex items-center justify-between text-xs text-foreground/50">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </footer>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
